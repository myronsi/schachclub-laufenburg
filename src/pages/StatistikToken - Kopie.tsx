// src/pages/StatistikToken.tsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import Papa from "papaparse";

export default function StatistikToken() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [rows, setRows] = useState<string[][]>([]);
  const [perDay, setPerDay] = useState<Record<string, number>>({});
  const [zugelassen, setZugelassen] = useState(false);

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
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse<string[]>(text, {
          delimiter: ";",
          skipEmptyLines: true,
        });

        const data = parsed.data;
        const rowsOnly = data.filter((r) => r.length === 4); // Nur vollständige Zeilen
        const validRows: string[][] = [];
        const dayCounts: Record<string, number> = {};

        rowsOnly.forEach((parts, idx) => {
          const [timestamp, ip, userAgent, referer] = parts.map((s) => s.trim());

          // User-Agent-Zerlegung
          const uaMatch = userAgent.match(/\(([^)]+)\)/);
          const systemInfo = uaMatch?.[1]?.split(";").map((s) => s.trim()) || [];
          const system = systemInfo[0] || "N/A";
          const arch = systemInfo[1] || "N/A";

          const remaining = userAgent.replace(/\(.*?\)\s*/, "").split(" ").filter(Boolean);
          const engine = remaining[0] || "N/A";
          const browserEntry = remaining.find((s) => s.includes("/")) || "N/A/N/A";
          const [browser, version] = browserEntry.split("/") || ["N/A", "N/A"];

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
                  backgroundColor: "rgba(59, 130, 246, 0.6)", // Tailwind blue-500
                },
              ],
            },
          });
        }
      });
  }, [zugelassen]);

  if (!zugelassen) {
    return <div className="p-4 text-red-500">⛔ Zugriff verweigert</div>;
  }

  let lastDate = "";

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-end gap-4">
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

      <h1 className="text-3xl font-bold">📊 Besucherstatistik</h1>
      <canvas id="statistikChart" width="800" height="300" className="mb-4"></canvas>

      <div className="overflow-auto max-h-[600px] border border-gray-300">
        <table className="min-w-full text-sm border-collapse">
          <thead className="sticky top-0 bg-gray-100 shadow z-10 text-base">
            <tr>
              <th className="px-2 py-2 text-left">Zeit</th>
              <th className="px-2 py-2 text-left">IP</th>
              <th className="px-2 py-2 text-left">System</th>
              <th className="px-2 py-2 text-left">Architektur</th>
              <th className="px-2 py-2 text-left">Engine</th>
              <th className="px-2 py-2 text-left">Browser</th>
              <th className="px-2 py-2 text-left">Version</th>
              <th className="px-2 py-2 text-left">Referer</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const currentDate = row[0].split(" ")[0];
              const newDay = lastDate !== currentDate;
              lastDate = currentDate;

              return (
                <tr
                  key={i}
                  className={`hover:bg-yellow-50 ${newDay ? "border-t-4 border-black" : ""}`}
                >
                  {row.map((cell, j) => (
                    <td key={j} className="px-2 py-1 border whitespace-nowrap">
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
