import { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";

export default function StatistikToken() {
  const [rows, setRows] = useState<string[][]>([]);
  const [perDay, setPerDay] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/visits.csv")
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
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Besucherstatistik</h1>
      <canvas id="statistikChart" width="800" height="300" className="mb-8"></canvas>

      <table className="table-auto w-full border border-gray-400 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Zeit</th>
            <th className="border px-2 py-1">IP</th>
            <th className="border px-2 py-1">Browser</th>
            <th className="border px-2 py-1">Referer</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="border px-2 py-1">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
