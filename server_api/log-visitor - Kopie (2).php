<?php
// Nur Loggen, wenn kein Bot
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
if (stripos($userAgent, 'bot') !== false || stripos($userAgent, 'crawl') !== false) {
    exit; // Keine Logs für Bots
}

$timestamp = date('Y-m-d H:i:s');
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$referer = $_SERVER['HTTP_REFERER'] ?? 'N/A';

// User-Agent in Anführungszeichen setzen, damit Semikolon nicht als Trenner wirkt
$line = "$timestamp;$ip;\"$userAgent\";$referer\n";

// Pfad zur CSV-Datei (ggf. anpassen)
$logFile = __DIR__ . '/visits.csv';

// Datei anhängen
file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX);
?>
