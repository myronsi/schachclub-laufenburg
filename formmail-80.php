<?php

declare(strict_types=1);

require_once __DIR__ . '/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/phpmailer/src/SMTP.php';
require_once __DIR__ . '/phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

date_default_timezone_set('Europe/Berlin');

const MEMBERSHIP_TEST_RECIPIENT = 'info@sc-laufenburg.de';
const MEMBERSHIP_PGP_FINGERPRINT = 'EE922E0C7824B68184E3E787C1911FE9F6E109E9';
const MAX_MEMBERSHIP_BYTES = 8 * 1024 * 1024;

function fail(string $message, int $status = 400): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['success' => false, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function cleanHeader(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail('Ungültige Request Methode', 405);
}

/* DEV lives in /dev/. Never commit SMTP credentials. */
$configCandidates = [
    __DIR__ . '/config.ini',
    dirname(__DIR__) . '/config.ini',
];
$configPath = null;
foreach ($configCandidates as $candidate) {
    if (is_readable($candidate)) {
        $configPath = $candidate;
        break;
    }
}
if ($configPath === null) {
    error_log('FormMail: config.ini fehlt in DEV und im übergeordneten Webroot.');
    fail('Fehler: Mail-Konfiguration nicht gefunden.', 500);
}

$config = parse_ini_file($configPath, true);
if ($config === false || !isset($config['mail']) || !is_array($config['mail'])) {
    error_log('FormMail: config.ini konnte nicht geladen werden.');
    fail('Fehler: Mail-Konfiguration ist fehlerhaft.', 500);
}

$mailConfig = $config['mail'];
$fromEmail = (string)($mailConfig['from_email'] ?? 'info@sc-laufenburg.de');
$fromName = (string)($mailConfig['from_name'] ?? 'SC Laufenburg');
$smtpHost = (string)($mailConfig['host'] ?? 'smtp.strato.de');
$smtpUsername = (string)($mailConfig['username'] ?? '');
$smtpPassword = (string)($mailConfig['password'] ?? '');
$smtpEncryption = (string)($mailConfig['encryption'] ?? 'tls');
$smtpPort = (int)($mailConfig['port'] ?? 587);

if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL) || $smtpUsername === '' || $smtpPassword === '') {
    error_log('FormMail: SMTP/mail configuration is incomplete or invalid.');
    fail('Fehler: Mail-Konfiguration ist unvollständig.', 500);
}

$encryption = match (strtolower($smtpEncryption)) {
    'ssl', 'smtps' => PHPMailer::ENCRYPTION_SMTPS,
    'tls', 'starttls' => PHPMailer::ENCRYPTION_STARTTLS,
    'none', '' => '',
    default => $smtpEncryption,
};

function createMailer(string $fromEmail, string $fromName, string $smtpHost, string $smtpUsername, string $smtpPassword, string $encryption, int $smtpPort): PHPMailer
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUsername;
    $mail->Password = $smtpPassword;
    $mail->Port = $smtpPort;
    if ($encryption !== '') {
        $mail->SMTPSecure = $encryption;
    }
    $mail->CharSet = 'UTF-8';
    $mail->Timeout = 20;
    $mail->SMTPKeepAlive = false;
    $mail->setFrom($fromEmail, $fromName);
    $mail->isHTML(false);
    return $mail;
}

function runCommand(string $command): array
{
    if (!function_exists('proc_open')) {
        throw new RuntimeException('proc_open ist auf dem Server nicht verfügbar.');
    }
    $descriptors = [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']];
    $process = proc_open($command, $descriptors, $pipes);
    if (!is_resource($process)) {
        throw new RuntimeException('GPG-Prozess konnte nicht gestartet werden.');
    }
    fclose($pipes[0]);
    $stdout = stream_get_contents($pipes[1]);
    fclose($pipes[1]);
    $stderr = stream_get_contents($pipes[2]);
    fclose($pipes[2]);
    $exitCode = proc_close($process);
    return [$exitCode, (string)$stdout, (string)$stderr];
}

function findGpgBinary(): string
{
    foreach (['/usr/bin/gpg', '/usr/local/bin/gpg', 'gpg'] as $candidate) {
        if ($candidate === 'gpg' || is_executable($candidate)) {
            return $candidate;
        }
    }
    throw new RuntimeException('GPG ist auf dem Server nicht verfügbar.');
}

function encryptMembershipPdf(string $inputPath, string $outputPath): void
{
    $keyPath = __DIR__ . '/membership-public-key.asc';
    if (!is_readable($keyPath)) {
        throw new RuntimeException('Der öffentliche Empfängerschlüssel fehlt auf dem Server.');
    }

    $gpgBinary = findGpgBinary();
    $home = sys_get_temp_dir() . '/sc-laufenburg-gpg-' . bin2hex(random_bytes(12));
    if (!mkdir($home, 0700, true) && !is_dir($home)) {
        throw new RuntimeException('Temporäres GPG-Verzeichnis konnte nicht erstellt werden.');
    }

    try {
        $importCommand = implode(' ', [
            escapeshellarg($gpgBinary), '--batch', '--yes', '--no-tty',
            '--homedir', escapeshellarg($home), '--import', escapeshellarg($keyPath),
        ]);
        [$importExit, $importOut, $importErr] = runCommand($importCommand);
        if ($importExit !== 0) {
            error_log('FormMail: GPG import failed: ' . trim($importErr));
            throw new RuntimeException('Der Empfängerschlüssel konnte nicht geladen werden.');
        }

        $encryptCommand = implode(' ', [
            escapeshellarg($gpgBinary), '--batch', '--yes', '--no-tty', '--trust-model', 'always',
            '--homedir', escapeshellarg($home), '--output', escapeshellarg($outputPath),
            '--encrypt', '--recipient', escapeshellarg(MEMBERSHIP_PGP_FINGERPRINT),
            escapeshellarg($inputPath),
        ]);
        [$encryptExit, $encryptOut, $encryptErr] = runCommand($encryptCommand);
        if ($encryptExit !== 0 || !is_file($outputPath) || filesize($outputPath) === 0) {
            error_log('FormMail: GPG encryption failed: ' . trim($encryptErr));
            throw new RuntimeException('Der Mitgliedsantrag konnte nicht verschlüsselt werden.');
        }
    } finally {
        $files = glob($home . '/*');
        if (is_array($files)) {
            foreach ($files as $file) {
                if (is_file($file)) {
                    @unlink($file);
                }
            }
        }
        @rmdir($home);
    }
}

/* Membership application: browser creates PDF; server encrypts and mails it. */
if (($_POST['type'] ?? '') === 'membership_application') {
    if (!isset($_FILES['membership_application']) || !is_array($_FILES['membership_application'])) {
        fail('Kein Mitgliedsantrag übermittelt.');
    }
    $upload = $_FILES['membership_application'];
    if (($upload['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        fail('Der Mitgliedsantrag konnte nicht hochgeladen werden.');
    }
    $size = (int)($upload['size'] ?? 0);
    $name = cleanHeader((string)($upload['name'] ?? ''));
    $tmp = (string)($upload['tmp_name'] ?? '');
    if ($size <= 0 || $size > MAX_MEMBERSHIP_BYTES) {
        fail('Die PDF ist zu groß oder leer.');
    }
    if (!preg_match('/^SC-Aufnahmeantrag-[A-Za-z0-9-]+\.pdf$/', $name)) {
        fail('Ungültiger Dateiname für den Mitgliedsantrag.');
    }
    if (!is_uploaded_file($tmp)) {
        fail('Ungültiger Upload.');
    }

    $encryptedPath = tempnam(sys_get_temp_dir(), 'sc-membership-');
    if ($encryptedPath === false) {
        fail('Temporäre Datei konnte nicht erstellt werden.', 500);
    }

    try {
        encryptMembershipPdf($tmp, $encryptedPath);
        $mail = createMailer($fromEmail, $fromName, $smtpHost, $smtpUsername, $smtpPassword, $encryption, $smtpPort);
        $mail->addAddress(MEMBERSHIP_TEST_RECIPIENT);
        $mail->Subject = 'Schachclub Laufenburg – verschlüsselter Mitgliedsantrag';
        $mail->Body =
            "Ein neuer Mitgliedsantrag wurde über die Website übermittelt.\n\n"
            . "Der PDF-Antrag wurde serverseitig mit dem öffentlichen OpenPGP-Schlüssel des Vorstands verschlüsselt und ist als .pgp-Datei angehängt.\n\n"
            . "TESTVERSAND: Dieser Antrag wird derzeit an info@sc-laufenburg.de gesendet.\n\n"
            . "Die Antragsdaten werden nicht dauerhaft auf dem Webserver gespeichert.";
        $mail->addAttachment($encryptedPath, $name . '.pgp', PHPMailer::ENCODING_BASE64, 'application/octet-stream');
        $mail->send();
        error_log('FormMail: encrypted membership application sent successfully.');
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
        exit;
    } catch (Throwable $e) {
        error_log('FormMail: membership application failed: ' . $e->getMessage());
        fail('Fehler beim Verschlüsseln oder Senden des Mitgliedsantrags. Bitte versuchen Sie es später erneut.', 502);
    } finally {
        @unlink($encryptedPath);
    }
}

/* Existing public contact form. */
$email = filter_var(trim((string)($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$name = trim((string)($_POST['name'] ?? ''));
$subject = trim((string)($_POST['subject'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
$phone = trim((string)($_POST['phone'] ?? ''));
$age = trim((string)($_POST['age'] ?? ''));

if ($email === false || $name === '' || $subject === '' || $message === '') {
    fail('Fehler: Ungültige Eingabe. Bitte füllen Sie alle Felder korrekt aus.');
}
if (mb_strlen($name) > 200 || mb_strlen($subject) > 200 || mb_strlen($message) > 10000 || mb_strlen($phone) > 100 || mb_strlen($age) > 20) {
    fail('Fehler: Eingabe zu lang.');
}
if (str_contains($name, "\r") || str_contains($name, "\n") || str_contains($subject, "\r") || str_contains($subject, "\n") || str_contains($email, "\r") || str_contains($email, "\n")) {
    fail('Fehler: Ungültige Eingabe.');
}

/* reCAPTCHA for the existing contact form. */
$recaptchaResponse = trim((string)($_POST['g-recaptcha-response'] ?? ''));
$recaptchaSecret = (string)($config['recaptcha']['secret'] ?? '');
if ($recaptchaSecret === '') {
    error_log('FormMail: reCAPTCHA secret fehlt in config.ini.');
    fail('Fehler: reCAPTCHA ist nicht konfiguriert.', 500);
}
if ($recaptchaResponse === '') {
    fail('Fehler: reCAPTCHA erforderlich.');
}

$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
$postData = http_build_query([
    'secret' => $recaptchaSecret,
    'response' => $recaptchaResponse,
    'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
], '', '&');
$verifyResponse = false;
if (function_exists('curl_init')) {
    $ch = curl_init($verifyUrl);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $postData,
        CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
        CURLOPT_TIMEOUT => 10,
        CURLOPT_CONNECTTIMEOUT => 5,
    ]);
    $verifyResponse = curl_exec($ch);
    $curlError = curl_error($ch);
    curl_close($ch);
    if ($verifyResponse === false) {
        error_log('FormMail: reCAPTCHA cURL error: ' . $curlError);
    }
} else {
    $context = stream_context_create(['http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => $postData,
        'timeout' => 10,
    ]]);
    $verifyResponse = @file_get_contents($verifyUrl, false, $context);
}
if ($verifyResponse === false || $verifyResponse === '') {
    fail('Fehler: reCAPTCHA-Überprüfung fehlgeschlagen. Bitte versuchen Sie es erneut.', 502);
}
$decoded = json_decode($verifyResponse, true);
if (!is_array($decoded) || ($decoded['success'] ?? false) !== true) {
    error_log('FormMail: reCAPTCHA nicht bestanden: ' . ($decoded['error-codes'][0] ?? 'unknown'));
    fail('Fehler: reCAPTCHA-Überprüfung nicht bestanden.');
}

$to = (string)($mailConfig['recipient'] ?? 'info@sc-laufenburg.de');
if (!filter_var($to, FILTER_VALIDATE_EMAIL) || !filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
    error_log('FormMail: SMTP/mail configuration is incomplete or invalid.');
    fail('Fehler: Mail-Konfiguration ist unvollständig.', 500);
}

try {
    $mail = createMailer($fromEmail, $fromName, $smtpHost, $smtpUsername, $smtpPassword, $encryption, $smtpPort);
    $mail->addReplyTo($email, $name);
    $mail->addAddress($to);
    $mail->Subject = $subject;
    $body = "Von: {$name} <{$email}>\n";
    if ($phone !== '') {
        $body .= "Telefon: {$phone}\n";
    }
    if ($age !== '') {
        $body .= "Alter: {$age}\n";
    }
    $body .= "\n{$message}";
    $mail->Body = $body;

    if (!empty($_FILES['files']) && is_array($_FILES['files']['name'] ?? null)) {
        $files = $_FILES['files'];
        $fileCount = 0;
        $totalSize = 0;
        $maxFiles = 2;
        $maxTotal = 5 * 1024 * 1024;
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        $count = count($files['name']);
        for ($i = 0; $i < $count; $i++) {
            if (($files['error'][$i] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
                continue;
            }
            $fileCount++;
            $fileSize = (int)($files['size'][$i] ?? 0);
            $totalSize += $fileSize;
            if ($fileCount > $maxFiles) {
                throw new Exception('Maximale Anzahl an Dateien überschritten.');
            }
            if ($totalSize > $maxTotal) {
                throw new Exception('Die Gesamtgröße der Dateien darf 5 MB nicht überschreiten.');
            }
            $tmpName = (string)($files['tmp_name'][$i] ?? '');
            $origName = basename((string)($files['name'][$i] ?? ''));
            if ($tmpName === '' || !is_uploaded_file($tmpName)) {
                continue;
            }
            $mime = $finfo->file($tmpName);
            if (!in_array($mime, $allowed, true)) {
                throw new Exception('Dateityp nicht erlaubt: ' . $origName);
            }
            $mail->addAttachment($tmpName, $origName);
        }
    }

    $mail->send();
    error_log(sprintf('FormMail: SMTP send successful; recipient=%s subject=%s', $to, $subject));
    header('Location: kontakt-ok.html', true, 303);
    exit;
} catch (Exception $e) {
    error_log('FormMail: PHPMailer send failed: ' . $mail->ErrorInfo);
    fail('Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut.', 502);
}
