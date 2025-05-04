// src/pages/StatistikToken.tsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Chart } from "chart.js/auto";

export default function StatistikToken() {
  const [params] = useSearchParams();
  const [zugelassen, setZugelassen] = useState(false);
  const [rows, setRows] = useState<string[][]>([]);
  const [perDay, setPerDay] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  // Token‑Check
  useEffect(() => {
    const token = params.get("token");
    const secret = import.meta.env.VITE_SECRET_TOKEN;
    if (token === secret) setZugelassen(true);
    else navigate("/");
  }, [params, navigate]);

  // CSV laden & parsen
  useEffect(() => {
    if (!zugelassen) return;

    fetch("/server_api/visits.csv")
      .then((res) => {
        if (!res.ok) throw new Error("CSV nicht gefunden");
        return res.text();
      })
      .then((text) => {
        const parsed = Papa.parse<string>(text, {
          delimiter: ";",
          skipEmptyLines: true,
          quoteChar: '"',
          header: false,
        });

        const rowsOnly = parsed.data.slice(1);
        const validRows: string[][] = [];
        const dayCounts: Record<string, number> = {};

        rowsOnly.forEach((parts, idx) => {
          if (parts.length < 4) {
            console.warn(`Ungültige Zeile [${idx + 2}]:`, parts);
            return;
          }

          const timestamp = parts[0].trim();
          const ip        = parts[1].trim() || "Unbekannt";
          const referer   = parts[parts.length - 1].trim() || "N/A";
          const userAgent = parts.slice(2, parts.length - 1).join(";").trim();

          // UA‑Parsing
          const uaMatch = userAgent.match(/\(([^)]+)\)/);
          let system="Unbekannt", arch="Unbekannt", engine="Unbekannt";
          let browser="Unbekannt", version="Unbekannt";

          if (uaMatch) {
            const [s,a] = uaMatch[1].split(";").map(s=>s.trim());
            system = s || system;
            arch   = a || arch;
          }

          const tail = userAgent.replace(/\(.*?\)\s*/, "").split(" ").filter(Boolean);
          if (tail.length) engine = tail[0];
          const bp = tail.find(t=>t.includes("/"));
          if (bp) [browser, version] = bp.split("/");

          validRows.push([timestamp, ip, system, arch, engine, browser, version, referer]);
          const day = timestamp.split(" ")[0];
          dayCounts[day] = (dayCounts[day]||0) + 1;
        });

        setRows(validRows);
        setPerDay(dayCounts);

        // Chart
        const ctx = document.getElementById("statistikChart") as HTMLCanvasElement;
        if (ctx) {
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: Object.keys(dayCounts),
              datasets: [
                {
                  label: "Besuche pro Tag",
                  data: Object.values(dayCounts),
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: { y: { beginAtZero: true } },
            },
          });
        }
      })
      .catch((e) => console.error("Fehler:", e));
  }, [zugelassen]);

  if (!zugelassen)
    return <div className="p-4 text-red-600">⛔ Zugriff verweigert</div>;

  let lastDate = "";

  return (
    <>
        {/* Print‑Styles */}
        <style>
            {`@media print {
            /* Buttons und Chart nicht drucken */
            .no-print { display: none !important; }

            /* Container im Druck nicht beschneiden */
            .table-container {
                overflow: visible !important;
                max-height: none !important;
            }

            /* Tabellen‑Elemente für Druck vorbereiten */
            table {
                page-break-inside: auto !important;
                border-collapse: collapse !important;
            }
            tr {
                page-break-inside: avoid !important;
                page-break-after: auto !important;
            }

            /* THEAD als Header‑Gruppe, wird auf jeder Seite wiederholt */
            thead {
                display: table-header-group !important;
            }
            tfoot {
                display: table-footer-group !important;
            }
        }`}
        </style>

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">📊 Besucherstatistik</h1>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mb-4 no-print">
          <button
            onClick={() => {
              const csv = [
                "Zeit;IP;System;Architektur;Engine;Browser;Version;Referer",
                ...rows.map((r) => r.join(";")),
              ].join("\n");
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "besuche.csv";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            📥 CSV‑Export
          </button>
          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            🖨️ Drucken
          </button>
        </div>

        {/* Chart */}
        <div className="h-[300px] mb-6 no-print">
          <canvas id="statistikChart"></canvas>
        </div>

        {/* Tabelle */}
        <div className="overflow-auto border border-gray-300 max-h-[600px] max-w-full table-container">
          <table className="min-w-[900px] w-full text-sm border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {["Zeit","IP","System","Architektur","Engine","Browser","Version","Referer"].map((col) => (
                  <th key={col} className="border px-2 py-2 text-left font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                    Keine Besucherdaten
                  </td>
                </tr>
              ) : (
                rows.map((row, i) => {
                  const date = row[0].split(" ")[0];
                  const showBorder = lastDate && date !== lastDate;
                  lastDate = date;

                  return (
                    <tr
                      key={i}
                      className={`hover:bg-yellow-100 ${showBorder ? "border-t-4 border-black" : ""}`}
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={
                            j === 7
                              ? "border px-2 py-1 whitespace-normal break-words"
                              : "border px-2 py-1 break-all max-w-[150px]"
                          }
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
