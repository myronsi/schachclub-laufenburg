<?php
date_default_timezone_set('Europe/Berlin');

// Konfiguration laden
$config = require __DIR__ . '/config.php';
$expectedToken = $config['TOKEN'];
$file = $config['CSV_FILE'];

// Zugriff absichern per Token
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

// IP anonymisieren
if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
    // IPv4-Anonymisierung (letztes Oktett auf .9999 setzen)
    $ip_parts = explode('.', $ip);
    if (count($ip_parts) === 4) {
        $ip_parts[3] = '9999'; // Beibehaltung deiner Methode
        $ip = implode('.', $ip_parts);
    }
} elseif (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) {
    // IPv6-Anonymisierung (Standard /64-Maskierung)
    // Behält die ersten 4 Gruppen (Netzwerkpräfix), setzt Rest auf Null.
    if (function_exists('inet_pton') && function_exists('inet_ntop')) {
        try { // Füge try-catch hinzu für ungültige IPs, die filter_var passieren
            $binary_ip = inet_pton($ip);
            // Maske, um die ersten 64 Bits (4 Gruppen) beizubehalten
            $mask = inet_pton("ffff:ffff:ffff:ffff::");
            if ($binary_ip !== false && $mask !== false) {
                $anonymized_binary_ip = $binary_ip & $mask;
                $ip = inet_ntop($anonymized_binary_ip); // Ergibt z.B. 2001:db8:abcd:1234::
            } else {
                $ip = 'ipv6_invalid_format'; // Falls inet_pton fehlschlägt
            }
        } catch (\Exception $e) {
            // Logge den Fehler, falls gewünscht
            // error_log("Error anonymizing IPv6: " . $e->getMessage() . " IP: " . $ip);
            $ip = 'ipv6_anon_error';
        }
    } else {
        // Fallback, falls inet_pton nicht verfügbar ist (selten)
        $ip = 'ipv6_anon_fallback';
    }

// Für die Spaltenbreite: Der Umbruch wird in CSS gehandhabt.
    // Sicherstellen, dass die Länge nicht exzessiv wird (optional, falls obiges schon gut ist)
    // Die Methode mit inet_ntop(inet_pton & mask) erzeugt bereits kompakte Adressen wie "2001:db8:abcd:1234::"
    // Diese sind typischerweise nicht übermäßig lang.
}
// Für die Spaltenbreite: Der Umbruch wird in CSS in StatistikToken.css gehandhabt:
// .table-container td { word-break: break-word; overflow-wrap: anywhere; }
// Dies sollte auch für die anonymisierten IPv6-Adressen funktionieren.

// Token im Referer ausblenden
$referer = preg_replace('/([?&]token=)[^&]+/', '$1***', $referer);

// CSV-sicher formatieren
$agent = '"' . str_replace('"', '""', $agent) . '"';
$referer = '"' . str_replace('"', '""', $referer) . '"';

// Header schreiben, wenn Datei neu ist
if (!file_exists($file)) {
    file_put_contents($file, "Zeit;IP;User-Agent;Referer\n", LOCK_EX);
}

// CSV-Zeile schreiben
file_put_contents($file, "$time;$ip;$agent;$referer\n", FILE_APPEND | LOCK_EX);

// Optional: JSON-Antwort nur bei Erfolg oder detailliertere Infos
// header('Content-Type: application/json'); // Wichtig für JSON-Antwort
// echo json_encode(["status" => "logged", "ip_processed" => $ip]); // Beispiel für mehr Details
exit; // Beenden, nachdem die Arbeit getan ist, um keine weiteren Ausgaben zu erzeugen
?>