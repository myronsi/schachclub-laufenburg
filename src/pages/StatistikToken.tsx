import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";

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
      navigate("/"); // ← automatische Weiterleitung
    }
  }, [params, navigate]);
  
  useEffect(() => {
    if (!zugelassen) return; // ⛔ Noch kein Zugriff → abbrechen
    
    // ✅ CSV laden + Chart anzeigen
    fetch("/server_api/visits.csv")
      .then((res) => res.text())
      .then((data) => {
        const lines = data.split("\n").filter(Boolean).slice(1);
        const csvRows: string[][] = [];
        const dayCounts: Record<string, number> = {};

        lines.forEach((line) => {
          const parts = line.split(";");
          if (parts.length < 1) return;
          csvRows.push(parts);
          const date = parts[0].split(" ")[0];
          dayCounts[date] = (dayCounts[date] || 0) + 1;
        });

        setRows(csvRows);
        setPerDay(dayCounts);

        const ctx = document.getElementById("statistikChart") as HTMLCanvasElement;
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: Object.keys(dayCounts),
            datasets: [{
              label: "Besuche pro Tag",
              data: Object.values(dayCounts),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            }],
          },
        });
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
              "Zeit;IP;Browser;Referer",
              ...rows.map((r) => r.join(";"))
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
        <h1 className="text-2xl font-bold mb-4">📊 Besucherstatistik</h1>
        <canvas id="statistikChart" width="800" height="300" className="mb-8"></canvas>
        
        <div className="overflow-auto border border-gray-400 max-w-full">
          <table className="table-auto w-full text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
               <tr>
                 <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700">Zeitstempel</th>
                 <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700">IP</th>
                 <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700">System</th>
                 <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700">Architektur</th>
                 <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700">Engine</th>
                 <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700">Browser</th>
                 <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700">Version</th>
                 <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700">Referer</th>
               </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const currentDate = row[0].split(" ")[0];
                const showBorder = lastDate && currentDate !== lastDate;
                lastDate = currentDate;

                return (
                  <tr
                    key={i}
                    className={`hover:bg-yellow-100 transition ${showBorder ? "border-t-4 border-black" : ""}`}
                  >
                    {row.map((cell, j) => (
                      <td key={j} className="border px-2 py-1 whitespace-nowrap">
                        {cell || "N/A"} {/* Füge "N/A" für leere Felder hinzu */}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
