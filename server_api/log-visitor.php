<?php
date_default_timezone_set('Europe/Berlin');

// Zugriff absichern per Token
$expectedToken = "geheim123";
$providedToken = $_GET['token'] ?? '';
if ($providedToken !== $expectedToken) {
    http_response_code(403);
    exit;
}

// Besucherdaten erfassen
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$agent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
$referer = $_SERVER['HTTP_REFERER'] ?? 'unknown';
$time = date("Y-m-d H:i:s");

// IP anonymisieren (letztes Oktett auf 0 setzen)
$ip_parts = explode('.', $ip);
if (count($ip_parts) === 4) {
    $ip_parts[3] = '9999';
    $ip = implode('.', $ip_parts);
}

// Token im Referer ausblenden
$referer = preg_replace('/([?&]token=)[^&]+/', '$1***', $referer);

// CSV-sicher formatieren (Anführungszeichen escapen und einrahmen)
$agent = '"' . str_replace('"', '""', $agent) . '"';
$referer = '"' . str_replace('"', '""', $referer) . '"';

$file = __DIR__ . "/visits.csv";

// Header schreiben, wenn Datei neu ist
if (!file_exists($file)) {
    file_put_contents($file, "Zeit;IP;User-Agent;Referer\n");
}

// CSV-Zeile schreiben
file_put_contents($file, "$time;$ip;$agent;$referer\n", FILE_APPEND | LOCK_EX);

echo json_encode(["status" => "logged"]);
?>
