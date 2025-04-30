<?php
date_default_timezone_set('Europe/Berlin');

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$agent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
$referer = $_SERVER['HTTP_REFERER'] ?? 'unknown';
$time = date("Y-m-d H:i:s");

// Optional: IP anonymisieren (z. B. 192.168.1.0)
$ip_parts = explode('.', $ip);
if (count($ip_parts) === 4) {
    $ip_parts[3] = '0';
    $ip = implode('.', $ip_parts);
}

$logLine = "$time | IP: $ip | Agent: $agent | Referer: $referer\n";

file_put_contents(__DIR__ . "/visits.log", $logLine, FILE_APPEND);

echo json_encode(["status" => "logged"]);
?>
