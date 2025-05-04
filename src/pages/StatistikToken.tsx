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

  useEffect(() => {
    const token = params.get("token");
    if (token === import.meta.env.VITE_SECRET_TOKEN) {
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
        const rowsOnly = data.slice(1); // Überspringe Header
  
        const validRows: string[][] = [];
        const dayCounts: Record<string, number> = {};
  
        for (const parts of rowsOnly) {
          if (parts.length !== 4) continue;
  
          const [timestamp, ip, userAgent, referer] = parts.map(s => s.trim());
  
          const uaMatch = userAgent.match(/\(([^)]+)\)/);
          const sysParts = uaMatch?.[1]?.split(";").map(s => s.trim()) || [];
          const system = sysParts[0] || "N/A";
          const arch = sysParts[1] || "N/A";
  
          const afterParen = userAgent.replace(/\(.*?\)\s*/, "").trim();
          const tokens = afterParen.split(" ").filter(Boolean);
  
          let engine = "N/A", browser = "N/A", version = "N/A";
          if (tokens.length > 0) engine = tokens[0];
          const bv = tokens.find(t => t.includes("/"));
          if (bv) [browser, version] = bv.split("/");
  
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
  
          const day = timestamp.split(" ")[0];
          dayCounts[day] = (dayCounts[day] || 0) + 1;
        }
  
        setRows(validRows);
        setPerDay(dayCounts);
  
        const ctx = document.getElementById("statistikChart") as HTMLCanvasElement;
        if (ctx) {
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
        }
      });
  }, [zugelassen]);
  
  if (!zugelassen) return <div className="p-4 text-red-600">⛔ Zugriff verweigert</div>;

  let lastDate = "";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Besucherstatistik</h1>

      <div className="flex gap-4 mb-6">
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

      <canvas id="statistikChart" className="mb-8" height="300"></canvas>

      <div className="overflow-auto border border-gray-400 max-h-[600px] max-w-full">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10 shadow text-base">
            <tr>
              <th className="border px-2 py-2">Zeit</th>
              <th className="border px-2 py-2">IP</th>
              <th className="border px-2 py-2">System</th>
              <th className="border px-2 py-2">Architektur</th>
              <th className="border px-2 py-2">Engine</th>
              <th className="border px-2 py-2">Browser</th>
              <th className="border px-2 py-2">Version</th>
              <th className="border px-2 py-2">Referer</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-4 text-gray-500">Keine Besucherdaten</td></tr>
            ) : (
                rows.map((row, i) => {
                const currentDate = row[0].split(" ")[0];
                const showBorder = i > 0 && row[0].split(" ")[0] !== rows[i - 1][0].split(" ")[0];

                return (
                    <tr key={i} className={`hover:bg-yellow-100 ${showBorder ? "border-t-4 border-black" : ""}`}>
                    {row.map((cell, j) => (
                        <td key={j} className="border px-2 py-1 whitespace-nowrap">{cell}</td>
                    ))}
                    </tr>
                );
                })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
