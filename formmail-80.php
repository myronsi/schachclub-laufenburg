<?php
declare(strict_types=1);

/*
 * Mail relay for the public website.
 * Membership applications arrive here ONLY as already PGP-encrypted files.
 * No application fields are accepted, parsed, stored or logged by this script.
 */

const MEMBERSHIP_RECIPIENT = '1.Vorsitzender@sc-laufenburg.de';
const CONTACT_RECIPIENT = 'info@sc-laufenburg.de';
const MAX_MEMBERSHIP_BYTES = 8 * 1024 * 1024;

header('Content-Type: application/json; charset=UTF-8');

function fail(string $message, int $status = 400): never
{
    http_response_code($status);
    echo json_encode(['success' => false, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function cleanHeader(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

function sendAttachmentMail(string $to, string $subject, string $body, string $filename, string $content): bool
{
    $boundary = '=_SC_' . bin2hex(random_bytes(16));
    $encodedBody = chunk_split(base64_encode($body));
    $encodedFile = chunk_split(base64_encode($content));

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
        'From: Schachclub Laufenburg Website <noreply@sc-laufenburg.de>',
        'Reply-To: noreply@sc-laufenburg.de',
    ];

    $message = '--' . $boundary . "\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . $encodedBody
        . '--' . $boundary . "\r\n"
        . 'Content-Type: application/octet-stream; name="' . cleanHeader($filename) . '"' . "\r\n"
        . 'Content-Disposition: attachment; filename="' . cleanHeader($filename) . '"' . "\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . $encodedFile
        . '--' . $boundary . "--\r\n";

    return mail($to, cleanHeader($subject), $message, implode("\r\n", $headers));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail('Nur POST-Anfragen sind erlaubt.', 405);
}

/* Membership applications: the browser must send one encrypted .pgp file. */
if (($_POST['type'] ?? '') === 'membership_application') {
    if (!isset($_FILES['membership_application']) || !is_array($_FILES['membership_application'])) {
        fail('Kein verschlüsselter Mitgliedsantrag übermittelt.');
    }

    $upload = $_FILES['membership_application'];
    if (($upload['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        fail('Der verschlüsselte Antrag konnte nicht hochgeladen werden.');
    }

    $size = (int)($upload['size'] ?? 0);
    $name = cleanHeader((string)($upload['name'] ?? ''));
    $tmp = (string)($upload['tmp_name'] ?? '');

    if ($size <= 0 || $size > MAX_MEMBERSHIP_BYTES) {
        fail('Die verschlüsselte Datei ist zu groß oder leer.');
    }
    if (!preg_match('/^SC-Aufnahmeantrag-[A-Za-z0-9-]+\.pdf\.pgp$/', $name)) {
        fail('Ungültiger Dateiname für den Mitgliedsantrag.');
    }
    if (!is_uploaded_file($tmp)) {
        fail('Ungültiger Upload.');
    }

    $content = file_get_contents($tmp);
    if ($content === false || $content === '') {
        fail('Die verschlüsselte Datei konnte nicht gelesen werden.', 500);
    }

    /* The server does not decrypt or archive this content. */
    $sent = sendAttachmentMail(
        MEMBERSHIP_RECIPIENT,
        'Schachclub Laufenburg – verschlüsselter Mitgliedsantrag',
        "Ein neuer Mitgliedsantrag wurde über die Website übermittelt.\r\n\r\n"
        . "Der PDF-Antrag ist als OpenPGP-Datei angehängt und muss mit dem privaten Schlüssel des Vorstands entschlüsselt werden.\r\n\r\n"
        . "Die Website hat keine Antragsdaten im Klartext gespeichert.",
        $name,
        $content
    );

    if (!$sent) {
        fail('Der Antrag konnte nicht per E-Mail übermittelt werden.', 502);
    }

    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

/* Existing public contact form. */
$name = cleanHeader((string)($_POST['name'] ?? ''));
$email = cleanHeader((string)($_POST['email'] ?? ''));
$subject = cleanHeader((string)($_POST['subject'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    fail('Bitte füllen Sie alle Pflichtfelder aus.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
}
if (strlen($message) > 20000 || strlen($subject) > 200) {
    fail('Die Nachricht ist zu lang.');
}

$body = "Name: {$name}\r\nE-Mail: {$email}\r\n\r\n{$message}";
$headers = "MIME-Version: 1.0\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n"
    . "From: Schachclub Laufenburg Website <noreply@sc-laufenburg.de>\r\n"
    . "Reply-To: {$email}\r\n";

if (!mail(CONTACT_RECIPIENT, $subject, $body, $headers)) {
    fail('Die Nachricht konnte nicht gesendet werden.', 502);
}

echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
