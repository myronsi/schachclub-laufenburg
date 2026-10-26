<?php

declare(strict_types=1);

header('X-Content-Type-Options: nosniff');
header('Cache-Control: private, no-store, max-age=0');

function failResponse(string $message, int $status): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function getBearerToken(): ?string
{
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/^Bearer\s+(.+)$/i', $header, $matches)) return trim($matches[1]);
    $cookie = $_COOKIE['auth_token'] ?? '';
    return $cookie !== '' ? $cookie : null;
}

function getAuthEndpoint(): string
{
    $host = $_SERVER['HTTP_HOST'] ?? '';
    if (!preg_match('/^[a-z0-9.-]+(?::\d+)?$/i', $host)) failResponse('Ungültiger Host.', 400);

    $scriptPath = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/private-gallery.php'));
    $scriptPath = $scriptPath === '/' ? '' : rtrim($scriptPath, '/');
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    return $scheme . '://' . $host . $scriptPath . '/api/auth.php';
}

function validateSession(string $token): array
{
    // auth.php consumes JSON just like the browser-side auth service.
    $payload = json_encode(['action' => 'validate', 'token' => $token], JSON_THROW_ON_ERROR);
    $endpoint = getAuthEndpoint();
    $response = false;

    if (function_exists('curl_init')) {
        $ch = curl_init($endpoint);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Authorization: Bearer ' . $token],
            CURLOPT_TIMEOUT => 10,
            CURLOPT_CONNECTTIMEOUT => 5,
        ]);
        $response = curl_exec($ch);
        curl_close($ch);
    } else {
        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\nAuthorization: Bearer {$token}\r\n",
                'content' => $payload,
                'timeout' => 10,
            ],
        ]);
        $response = @file_get_contents($endpoint, false, $context);
    }

    if ($response === false || $response === '') failResponse('Anmeldung konnte nicht überprüft werden.', 503);

    $decoded = json_decode($response, true);
    if (!is_array($decoded) || ($decoded['success'] ?? false) !== true) failResponse('Nicht autorisiert.', 401);
    return $decoded;
}

function galleryRoot(): string
{
    $candidates = [
        __DIR__ . '/photos/chronik',
        dirname(__DIR__) . '/photos/chronik',
        ($_SERVER['DOCUMENT_ROOT'] ?? '') . '/photos/chronik',
    ];

    foreach ($candidates as $candidate) {
        $real = realpath($candidate);
        if ($real !== false && is_dir($real)) return $real;
    }
    failResponse('Galerie ist nicht konfiguriert.', 500);
}

function relativePath(string $root, string $absolute): string
{
    $prefix = rtrim(str_replace('\\', '/', $root), '/') . '/';
    return ltrim(substr(str_replace('\\', '/', $absolute), strlen($prefix)), '/');
}

function imageTitle(string $path): string
{
    $name = pathinfo($path, PATHINFO_FILENAME);
    $name = preg_replace('/[_-]+/', ' ', $name) ?? $name;
    return trim($name) !== '' ? trim($name) : 'Bild';
}

$token = getBearerToken();
if ($token === null) failResponse('Nicht angemeldet.', 401);
validateSession($token);

$root = galleryRoot();
$requestedFile = trim((string)($_GET['file'] ?? ''));

if ($requestedFile !== '') {
    $requestedFile = str_replace('\\', '/', $requestedFile);
    if (str_contains($requestedFile, "\0") || str_starts_with($requestedFile, '/') || str_contains($requestedFile, '../') || str_contains($requestedFile, '/..')) {
        failResponse('Ungültiger Dateipfad.', 400);
    }

    $file = realpath($root . '/' . $requestedFile);
    $rootPrefix = rtrim(str_replace('\\', '/', $root), '/') . '/';
    $normalizedFile = $file !== false ? str_replace('\\', '/', $file) : '';

    if ($file === false || !is_file($file) || !str_starts_with($normalizedFile, $rootPrefix)) {
        failResponse('Bild nicht gefunden.', 404);
    }

    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file);
    $allowed = ['image/jpeg' => 'image/jpeg', 'image/png' => 'image/png', 'image/gif' => 'image/gif', 'image/webp' => 'image/webp'];
    if (!isset($allowed[$mime])) failResponse('Dateityp nicht erlaubt.', 403);

    header('Content-Type: ' . $allowed[$mime]);
    header('Content-Length: ' . (string)filesize($file));
    header('Content-Disposition: inline; filename="' . rawurlencode(basename($file)) . '"');
    readfile($file);
    exit;
}

if (($_GET['action'] ?? 'list') !== 'list') failResponse('Ungültige Aktion.', 400);

$images = [];
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS | FilesystemIterator::CURRENT_AS_FILEINFO)
);

foreach ($iterator as $fileInfo) {
    if (!$fileInfo->isFile()) continue;
    if (!in_array(strtolower($fileInfo->getExtension()), $allowedExtensions, true)) continue;
    $absolute = realpath($fileInfo->getPathname());
    if ($absolute === false) continue;

    $path = relativePath($root, $absolute);
    $images[] = ['path' => $path, 'title' => imageTitle($path)];
}

usort($images, static fn(array $a, array $b): int => strnatcasecmp($a['path'], $b['path']));

header('Content-Type: application/json; charset=utf-8');
echo json_encode(['success' => true, 'images' => $images], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
