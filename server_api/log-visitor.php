<?php
date_default_timezone_set('Europe/Berlin');

// Zugriff absichern
$expectedToken = "geheim123";
$providedToken = $_GET['token'] ?? '';
if ($providedToken !== $expectedToken) {
    http_response_code(403);
    echo json_encode(["error" => "Zugriff verweigert"]);
    exit;
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$agent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
$referer = $_SERVER['HTTP_REFERER'] ?? 'unknown';
$time = date("Y-m-d H:i:s");

// IP anonymisieren (letztes Oktett)
$ip_parts = explode('.', $ip);
if (count($ip_parts) === 4) {
    $ip_parts[3] = '0';
    $ip = implode('.', $ip_parts);
}

// Token im Referer ausblenden
$referer = preg_replace('/([?&]token=)[^&]+/', '$1***', $referer);

// CSV-sicher formatieren
$agent = '"' . str_replace('"', '""', $agent) . '"';  // "escaping"
$referer = '"' . str_replace('"', '""', $referer) . '"';

$file = __DIR__ . "/visits.csv";

// Falls Datei neu ist: Header schreiben
if (!file_exists($file)) {
    file_put_contents($file, "Zeit;IP;User-Agent;Referer\n");
}

// CSV-Zeile schreiben
$csvLine = "$time;$ip;$agent;$referer\n";
file_put_contents($file, $csvLine, FILE_APPEND);

echo json_encode(["status" => "logged"]);
?>
