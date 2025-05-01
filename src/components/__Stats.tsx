import { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";

export default function BesucherStatistik() {
  const [perDay, setPerDay] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/visits.csv")
      .then((res) => res.text())
      .then((data) => {
        const lines = data.split("\n").slice(1); // skip header
        const counts: Record<string, number> = {};

        lines.forEach((line) => {
          const parts = line.split(";");
          if (parts.length < 1) return;
          const date = parts[0]?.split(" ")[0];
          if (!date) return;
          counts[date] = (counts[date] || 0) + 1;
        });

        setPerDay(counts);
        drawChart(counts);
      });
  }, []);

  function drawChart(data: Record<string, number>) {
    const ctx = document.getElementById("besucherChart") as HTMLCanvasElement;
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: "Besuche pro Tag",
            data: Object.values(data),
            backgroundColor: "rgba(33, 150, 243, 0.6)",
          },
        ],
      },
    });
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">📊 Besucherstatistik</h2>
      <canvas id="besucherChart" width="600" height="300"></canvas>
    </div>
  );
}
