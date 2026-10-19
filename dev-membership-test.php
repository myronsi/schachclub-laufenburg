<?php

declare(strict_types=1);

/* Temporary DEV-only backend self-test. Delete after the mail/encryption path is verified. */
const TEST_TOKEN = 'SC-LAUENBURG-DEV-MAIL-TEST-2026';
const TEST_RECIPIENT = 'info@sc-laufenburg.de';
const TEST_FINGERPRINT = 'EE922E0C7824B68184E3E787C1911FE9F6E109E9';

header('Content-Type: application/json; charset=UTF-8');

if (($_GET['token'] ?? '') !== TEST_TOKEN) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Not found']);
    exit;
}

$result = [
    'success' => false,
    'php_version' => PHP_VERSION,
    'host' => $_SERVER['HTTP_HOST'] ?? '',
    'checks' => [],
];

function checkResult(string $name, bool $ok, string $message = ''): void
{
    global $result;
    $result['checks'][$name] = ['ok' => $ok];
    if ($message !== '') {
        $result['checks'][$name]['message'] = $message;
    }
}

$configCandidates = [__DIR__ . '/config.ini', dirname(__DIR__) . '/config.ini'];
$configPath = null;
foreach ($configCandidates as $candidate) {
    if (is_readable($candidate)) {
        $configPath = $candidate;
        break;
    }
}
checkResult('config', $configPath !== null, $configPath !== null ? 'config.ini found' : 'config.ini not found');

if ($configPath === null) {
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

$config = parse_ini_file($configPath, true);
checkResult('config_parse', is_array($config), is_array($config) ? 'parsed' : 'parse failed');
if (!is_array($config) || !isset($config['mail']) || !is_array($config['mail'])) {
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

$mailConfig = $config['mail'];
$fromEmail = (string)($mailConfig['from_email'] ?? '');
$fromName = (string)($mailConfig['from_name'] ?? 'SC Laufenburg');
$smtpHost = (string)($mailConfig['host'] ?? '');
$smtpUsername = (string)($mailConfig['username'] ?? '');
$smtpPassword = (string)($mailConfig['password'] ?? '');
$smtpEncryption = strtolower((string)($mailConfig['encryption'] ?? 'tls'));
$smtpPort = (int)($mailConfig['port'] ?? 587);

checkResult('smtp_config', filter_var($fromEmail, FILTER_VALIDATE_EMAIL) && $smtpHost !== '' && $smtpUsername !== '' && $smtpPassword !== '' && $smtpPort > 0, 'SMTP fields present');

$phpMailerPaths = [
    __DIR__ . '/PHPMailer.php',
    __DIR__ . '/SMTP.php',
    __DIR__ . '/Exception.php',
];
$phpMailerOk = true;
foreach ($phpMailerPaths as $path) {
    if (!is_readable($path)) {
        $phpMailerOk = false;
    }
}
checkResult('phpmailer_files', $phpMailerOk, $phpMailerOk ? 'all files found' : 'one or more PHPMailer files missing');

$keyPath = __DIR__ . '/membership-public-key.asc';
checkResult('public_key', is_readable($keyPath), is_readable($keyPath) ? 'key found' : 'key missing');

$gpg = null;
foreach (['/usr/bin/gpg', '/usr/local/bin/gpg', 'gpg'] as $candidate) {
    if ($candidate === 'gpg' || is_executable($candidate)) {
        $gpg = $candidate;
        break;
    }
}
checkResult('gpg_binary', $gpg !== null, $gpg !== null ? $gpg : 'gpg not found');
checkResult('proc_open', function_exists('proc_open'), function_exists('proc_open') ? 'available' : 'disabled');

if ($gpg !== null && function_exists('proc_open') && is_readable($keyPath)) {
    $home = sys_get_temp_dir() . '/sc-laufenburg-test-' . bin2hex(random_bytes(8));
    $input = tempnam(sys_get_temp_dir(), 'sc-test-input-');
    $output = tempnam(sys_get_temp_dir(), 'sc-test-output-');
    $ok = false;
    $detail = '';

    if ($input !== false && $output !== false && mkdir($home, 0700, true)) {
        file_put_contents($input, "%PDF-1.4\n% DEV backend test\n");
        $spec = [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']];
        $importCommand = escapeshellarg($gpg) . ' --batch --yes --no-tty --homedir ' . escapeshellarg($home) . ' --import ' . escapeshellarg($keyPath);
        $p = proc_open($importCommand, $spec, $pipes);
        if (is_resource($p)) {
            fclose($pipes[0]);
            $stdout = stream_get_contents($pipes[1]);
            fclose($pipes[1]);
            $stderr = stream_get_contents($pipes[2]);
            fclose($pipes[2]);
            $exit = proc_close($p);
            if ($exit !== 0) {
                $detail = 'GPG import failed: ' . trim((string)$stderr);
            } else {
                $encryptCommand = escapeshellarg($gpg) . ' --batch --yes --no-tty --trust-model always --homedir ' . escapeshellarg($home) . ' --output ' . escapeshellarg($output) . ' --encrypt --recipient ' . escapeshellarg(TEST_FINGERPRINT) . ' ' . escapeshellarg($input);
                $p = proc_open($encryptCommand, $spec, $pipes);
                if (is_resource($p)) {
                    fclose($pipes[0]);
                    $stdout = stream_get_contents($pipes[1]);
                    fclose($pipes[1]);
                    $stderr = stream_get_contents($pipes[2]);
                    fclose($pipes[2]);
                    $exit = proc_close($p);
                    $ok = $exit === 0 && is_file($output) && filesize($output) > 0;
                    $detail = $ok ? 'GPG import and encryption succeeded' : 'GPG encryption failed: ' . trim((string)$stderr);
                } else {
                    $detail = 'Could not start GPG encryption process';
                }
            }
        } else {
            $detail = 'Could not start GPG import process';
        }
    } else {
        $detail = 'Could not create temporary test files/directory';
    }

    checkResult('gpg_encryption', $ok, $detail);

    if (is_string($input)) @unlink($input);
    if (is_string($output)) @unlink($output);
    if (is_dir($home)) {
        foreach (glob($home . '/*') ?: [] as $file) {
            if (is_file($file)) @unlink($file);
        }
        @rmdir($home);
    }
}

if ($phpMailerOk && $smtpHost !== '' && $smtpUsername !== '' && $smtpPassword !== '') {
    require_once __DIR__ . '/PHPMailer.php';
    require_once __DIR__ . '/SMTP.php';
    require_once __DIR__ . '/Exception.php';

    try {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = $smtpHost;
        $mail->SMTPAuth = true;
        $mail->Username = $smtpUsername;
        $mail->Password = $smtpPassword;
        $mail->Port = $smtpPort;
        if ($smtpEncryption === 'tls' || $smtpEncryption === 'starttls') {
            $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        } elseif ($smtpEncryption === 'ssl' || $smtpEncryption === 'smtps') {
            $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        }
        $mail->CharSet = 'UTF-8';
        $mail->Timeout = 20;
        $mail->setFrom($fromEmail, $fromName);
        $mail->addAddress(TEST_RECIPIENT);
        $mail->Subject = 'SC Laufenburg DEV backend test';
        $mail->Body = 'Automatischer DEV-Test: GPG und PHPMailer/SMTP funktionieren.';
        $mail->isHTML(false);
        $mail->send();
        checkResult('smtp_send', true, 'test mail sent to ' . TEST_RECIPIENT);
    } catch (Throwable $e) {
        $error = isset($mail) && $mail instanceof PHPMailer\PHPMailer\PHPMailer ? $mail->ErrorInfo : '';
        checkResult('smtp_send', false, trim($error !== '' ? $error : $e->getMessage()));
    }
}

$allOk = true;
foreach ($result['checks'] as $check) {
    if (($check['ok'] ?? false) !== true) {
        $allOk = false;
        break;
    }
}
$result['success'] = $allOk;
http_response_code($allOk ? 200 : 500);
echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
