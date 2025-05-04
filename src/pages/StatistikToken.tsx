import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import Papa from "papaparse";

export default function StatistikToken() {
  const [params] = useSearchParams();
  const [zugelassen, setZugelassen] = useState(false);
  const [rows, setRows] = useState<string[][]>([]);
  const [perDay, setPerDay] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    const secret = import.meta.env.VITE_SECRET_TOKEN;
    if (token === secret) {
      setZugelassen(true);
    } else {
      navigate("/");
    }
  }, [params, navigate]);

  useEffect(() => {
    if (!zugelassen) return;

    fetch("/server_api/visits.csv")
      .then((res) => {
        if (!res.ok) throw new Error("CSV konnte nicht geladen werden");
        return res.text();
      })
      .then((text) => {
        const parsed = Papa.parse<string[]>(text, {
          delimiter: ";",
          skipEmptyLines: true,
        });

        const data = parsed.data;
        const header = data[0];
        const rowsOnly = data.slice(1);

        const validRows: string[][] = [];
        const dayCounts: Record<string, number> = {};

        rowsOnly.forEach((parts, idx) => {
          if (parts.length !== 4) {
            console.warn(`⚠️ Ungültige CSV-Zeile [${idx + 2}]:`, parts);
            return;
          }

          const [timestamp, ip, userAgent, referer] = parts.map((s) => s.trim());

          // --- robuster UA-Parser ---
          const uaParts = userAgent.match(/\(([^)]+)\)/);
          let system = "Unbekannt";
          let arch = "Unbekannt";
          let engine = "Unbekannt";
          let browser = "Unbekannt";
          let version = "Unbekannt";

          if (uaParts) {
            const systemInfo = uaParts[1].split(";").map((s) => s.trim());
            system = systemInfo[0] || "Unbekannt";
            arch = systemInfo[1] || "Unbekannt";
          }

          const agentRest = userAgent.replace(/\(.*?\)\s*/, "").trim();
          if (agentRest) {
            const parts = agentRest.split(" ").filter(Boolean);
            engine = parts[0] || "Unbekannt";

            const browserPart = parts.find((s) => s.includes("/"));
            if (browserPart) {
              const [b, v] = browserPart.split("/");
              browser = b || "Unbekannt";
              version = v || "Unbekannt";
            }
          }

          validRows.push([
            timestamp,
            ip,
            system,
            arch,
            engine,
            browser,
            version,
            referer || "N/A",
          ]);

          const date = timestamp.split(" ")[0];
          dayCounts[date] = (dayCounts[date] || 0) + 1;
        });

        setRows(validRows);
        setPerDay(dayCounts);

        // Diagramm initialisieren
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
              scales: {
                y: { beginAtZero: true },
              },
            },
          });
        }
      })
      .catch((err) => {
        console.error("🚫 Fehler beim Laden der Statistik:", err.message);
      });
  }, [zugelassen]);

  if (!zugelassen) {
    return <div className="p-4 text-red-500">⛔ Zugriff verweigert</div>;
  }

  let lastDate = "";

  return (
    <div>
      <div className="flex justify-end gap-4 mb-4">
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
          📥 CSV-Export
        </button>

        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          🖨️ Drucken
        </button>
      </div>

      <div className="p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-4">📊 Besucherstatistik</h1>

        <div className="h-[300px] mb-8">
          <canvas id="statistikChart"></canvas>
        </div>

        <div className="overflow-auto border border-gray-400 max-w-full max-h-[600px]">
          <table className="table-auto w-full text-sm border-collapse">
            <thead className="bg-gray-200 sticky top-0 z-30 text-base shadow-md">
              <tr>
                <th className="px-2 py-2 text-left font-semibold text-gray-800">Zeit</th>
                <th className="px-2 py-2 text-left font-semibold text-gray-800">IP</th>
                <th className="px-2 py-2 text-left font-semibold text-gray-800">System</th>
                <th className="px-2 py-2 text-left font-semibold text-gray-800">Architektur</th>
                <th className="px-2 py-2 text-left font-semibold text-gray-800">Engine</th>
                <th className="px-2 py-2 text-left font-semibold text-gray-800">Browser</th>
                <th className="px-2 py-2 text-left font-semibold text-gray-800">Version</th>
                <th className="px-2 py-2 text-left font-semibold text-gray-800">Referer</th>
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
                  const currentDate = row[0].split(" ")[0];
                  const showBorder = lastDate && currentDate !== lastDate;
                  lastDate = currentDate;

                  return (
                    <tr
                      key={i}
                      className={`hover:bg-yellow-100 transition ${
                        showBorder ? "border-t-4 border-black" : ""
                      }`}
                    >
                      {row.map((cell, j) => (
                        <td key={j} className="border px-2 py-1 whitespace-nowrap">
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
    </div>
  );
}
