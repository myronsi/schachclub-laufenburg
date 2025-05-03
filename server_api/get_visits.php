<?php
// Optional: Zugangsschutz per Token
if (!isset($_GET['token']) || $_GET['token'] !== 'geheim123') {
    http_response_code(403);
    echo "Zugriff verweigert.";
    exit;
}

// Sicherheitsheader und Klartext-Ausgabe
header('Content-Type: text/plain');
readfile(__DIR__ . '/visits.csv');
