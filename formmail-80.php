<?php

declare(strict_types=1);

require_once __DIR__ . '/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/phpmailer/src/SMTP.php';
require_once __DIR__ . '/phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

date_default_timezone_set('Europe/Berlin');

function fail(string $message, int $status = 400): never
{
    http_response_code($status);
    echo $message;
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail('Ungültige Request Methode', 405);
}

$configPath = __DIR__ . '/config.ini';
$config = parse_ini_file($configPath, true);

if ($config === false || !isset($config['mail']) || !is_array($config['mail'])) {
    error_log('FormMail: config.ini konnte nicht geladen werden.');
    fail('Fehler: Konfigurationsdatei nicht gefunden oder fehlerhaft.', 500);
}

$mailConfig = $config['mail'];

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

/*
 * reCAPTCHA
 *
 * The secret must be stored in config.ini:
 *
 * [recaptcha]
 * secret = "YOUR_SECRET"
 */
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
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $postData,
            'timeout' => 10,
        ],
    ]);

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
$fromEmail = (string)($mailConfig['from_email'] ?? 'info@sc-laufenburg.de');
$fromName = (string)($mailConfig['from_name'] ?? 'SC Laufenburg');
$smtpHost = (string)($mailConfig['host'] ?? 'smtp.strato.de');
$smtpUsername = (string)($mailConfig['username'] ?? '');
$smtpPassword = (string)($mailConfig['password'] ?? '');
$smtpEncryption = (string)($mailConfig['encryption'] ?? 'tls');
$smtpPort = (int)($mailConfig['port'] ?? 587);

if (!filter_var($to, FILTER_VALIDATE_EMAIL) || !filter_var($fromEmail, FILTER_VALIDATE_EMAIL) || $smtpUsername === '' || $smtpPassword === '') {
    error_log('FormMail: SMTP/mail configuration is incomplete or invalid.');
    fail('Fehler: Mail-Konfiguration ist unvollständig.', 500);
}

$encryption = match (strtolower($smtpEncryption)) {
    'ssl', 'smtps' => PHPMailer::ENCRYPTION_SMTPS,
    'tls', 'starttls' => PHPMailer::ENCRYPTION_STARTTLS,
    'none', '' => '',
    default => $smtpEncryption,
};

$mail = new PHPMailer(true);

try {
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
    $mail->isHTML(false);
    $mail->Body = $body;

    if (!empty($_FILES['files']) && is_array($_FILES['files']['name'] ?? null)) {
        $files = $_FILES['files'];
        $fileCount = 0;
        $totalSize = 0;
        $maxFiles = 2;
        $maxTotal = 5 * 1024 * 1024;
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $allowed = [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
        ];

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
