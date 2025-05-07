<?php
$logfile = __DIR__ . "/visits.log";

if (!file_exists($logfile)) {
    die("Logdatei nicht gefunden.");
}

$lines = file($logfile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$visitsPerDay = [];

echo "<h1>Besucher-Analyse</h1>";
echo "<table border='1' cellpadding='6' cellspacing='0'>";
echo "<tr><th>Zeitpunkt</th><th>IP (anonym)</th><th>Browser/OS</th><th>Referer</th></tr>";

foreach ($lines as $line) {
    preg_match('/^(.*?) \| IP: (.*?) \| Agent: (.*?) \| Referer: (.*)$/', $line, $matches);
    if (count($matches) === 5) {
        $date = substr($matches[1], 0, 10);
        $visitsPerDay[$date] = ($visitsPerDay[$date] ?? 0) + 1;

        echo "<tr>";
        echo "<td>{$matches[1]}</td>";
        echo "<td>{$matches[2]}</td>";
        echo "<td style='max-width:400px'>{$matches[3]}</td>";
        echo "<td>{$matches[4]}</td>";
        echo "</tr>";
    }
}
echo "</table>";

// Link zur CSV, aber nicht neu schreiben!
echo "<p><a href='visits.csv' download>📥 Besuchsdaten als CSV herunterladen</a></p>";

// Tagesstatistik anzeigen
echo "<h2>📊 Besuche pro Tag</h2>";
echo "<ul>";
foreach ($visitsPerDay as $day => $count) {
    echo "<li>$day: $count Besuche</li>";
}
echo "</ul>";
?>
