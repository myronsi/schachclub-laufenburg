<?php

declare(strict_types=1);

const TEST_TOKEN = 'SC-LAUENBURG-DEV-BACKEND-2026';
const TEST_FINGERPRINT = 'EE922E0C7824B68184E3E787C1911FE9F6E109E9';

header('Content-Type: application/json; charset=UTF-8');
if (($_GET['token'] ?? '') !== TEST_TOKEN) {
    http_response_code(404);
    echo json_encode(['success' => false]);
    exit;
}

$result = ['success' => false, 'checks' => []];
function checkResult(string $name, bool $ok, string $message = ''): void {
    global $result;
    $result['checks'][$name] = ['ok' => $ok];
    if ($message !== '') $result['checks'][$name]['message'] = $message;
}

$configCandidates = [__DIR__ . '/config.ini', dirname(__DIR__) . '/config.ini'];
$configPath = null;
foreach ($configCandidates as $candidate) {
    if (is_readable($candidate)) { $configPath = $candidate; break; }
}
checkResult('config', $configPath !== null, $configPath !== null ? 'found' : 'missing');
if ($configPath !== null) {
    $config = parse_ini_file($configPath, true);
    checkResult('config_parse', is_array($config), is_array($config) ? 'ok' : 'failed');
    if (is_array($config) && isset($config['mail']) && is_array($config['mail'])) {
        $mail = $config['mail'];
        checkResult('smtp_config', filter_var((string)($mail['from_email'] ?? ''), FILTER_VALIDATE_EMAIL) && (string)($mail['host'] ?? '') !== '' && (string)($mail['username'] ?? '') !== '' && (string)($mail['password'] ?? '') !== '', 'credentials present');
    } else checkResult('smtp_config', false, 'mail section missing');
}

checkResult('phpmailer', is_readable(__DIR__ . '/PHPMailer.php') && is_readable(__DIR__ . '/SMTP.php') && is_readable(__DIR__ . '/Exception.php'), 'PHPMailer files');
$keyPath = __DIR__ . '/membership-public-key.asc';
checkResult('public_key', is_readable($keyPath), is_readable($keyPath) ? 'found' : 'missing');
checkResult('proc_open', function_exists('proc_open'), function_exists('proc_open') ? 'available' : 'disabled');

$gpg = null;
foreach (['/usr/bin/gpg', '/usr/local/bin/gpg', 'gpg'] as $candidate) {
    if ($candidate === 'gpg' || is_executable($candidate)) { $gpg = $candidate; break; }
}
checkResult('gpg', $gpg !== null, $gpg !== null ? $gpg : 'not found');

if ($gpg !== null && function_exists('proc_open') && is_readable($keyPath)) {
    $home = sys_get_temp_dir() . '/sc-laufenburg-check-' . bin2hex(random_bytes(8));
    $input = tempnam(sys_get_temp_dir(), 'sc-check-in-');
    $output = tempnam(sys_get_temp_dir(), 'sc-check-out-');
    $ok = false; $detail = '';
    if ($input !== false && $output !== false && mkdir($home, 0700, true)) {
        file_put_contents($input, "%PDF-1.4\n% backend test\n");
        $spec = [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']];
        $cmd = escapeshellarg($gpg) . ' --batch --yes --no-tty --homedir ' . escapeshellarg($home) . ' --import ' . escapeshellarg($keyPath);
        $p = proc_open($cmd, $spec, $pipes);
        if (is_resource($p)) {
            fclose($pipes[0]); stream_get_contents($pipes[1]); fclose($pipes[1]); $err = stream_get_contents($pipes[2]); fclose($pipes[2]); $exit = proc_close($p);
            if ($exit !== 0) $detail = 'import failed: ' . trim((string)$err);
            else {
                $cmd = escapeshellarg($gpg) . ' --batch --yes --no-tty --trust-model always --homedir ' . escapeshellarg($home) . ' --output ' . escapeshellarg($output) . ' --encrypt --recipient ' . escapeshellarg(TEST_FINGERPRINT) . ' ' . escapeshellarg($input);
                $p = proc_open($cmd, $spec, $pipes);
                if (is_resource($p)) {
                    fclose($pipes[0]); stream_get_contents($pipes[1]); fclose($pipes[1]); $err = stream_get_contents($pipes[2]); fclose($pipes[2]); $exit = proc_close($p);
                    $ok = $exit === 0 && is_file($output) && filesize($output) > 0;
                    $detail = $ok ? 'import and encryption ok' : 'encryption failed: ' . trim((string)$err);
                } else $detail = 'cannot start encryption';
            }
        } else $detail = 'cannot start import';
    } else $detail = 'cannot create temp files';
    checkResult('gpg_encryption', $ok, $detail);
    if (is_string($input)) @unlink($input);
    if (is_string($output)) @unlink($output);
    if (is_dir($home)) { foreach (glob($home . '/*') ?: [] as $file) if (is_file($file)) @unlink($file); @rmdir($home); }
}

$result['success'] = !in_array(false, array_column($result['checks'], 'ok'), true);
http_response_code($result['success'] ? 200 : 500);
echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
