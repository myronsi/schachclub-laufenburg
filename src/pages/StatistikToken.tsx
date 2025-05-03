// src/pages/StatistikToken.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as Papa from "papaparse";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { UAParser } from "ua-parser-js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Visit = {
  timestamp: string;
  ip: string;
  userAgent: string;
  referrer: string;
  browser?: string;
  browserVersion?: string;
  os?: string;
  osVersion?: string;
};

export default function StatistikToken() {
  const [searchParams] = useSearchParams();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [error, setError] = useState("");
  const token = searchParams.get("token");

  useEffect(() => {
    if (token !== "geheim123") {
      setError("Zugriff verweigert.");
      return;
    }

    fetch(`/server_api/get_visits.php?token=${token}`)
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse<string[]>(csvText.trim(), {
          delimiter: ";",
          skipEmptyLines: true,
        });

        if (parsed.errors.length > 0) {
          console.error("CSV Parse Error:", parsed.errors);
          setError("Fehler beim Parsen der Besuchsdaten.");
          return;
        }

        const rawData = parsed.data as string[][];

        // Header überspringen + ungültige Zeilen filtern
        const data: Visit[] = rawData
          .slice(1) // Header-Zeile entfernen
          .filter((row) => row.length >= 4 && row[0]?.match(/^\d{4}-\d{2}-\d{2}/))
          .map(([timestamp, ip, userAgent, referrer]) => {
            const parsedUA = new UAParser(userAgent);
            const browser = parsedUA.getBrowser();
            const os = parsedUA.getOS();

            return {
              timestamp,
              ip,
              userAgent,
              referrer,
              browser: `${browser.name || "Unbekannt"} ${browser.version || ""}`.trim(),
              os: `${os.name || "Unbekannt"} ${os.version || ""}`.trim(),
            };
          });

        setVisits(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Fehler beim Laden der Besuchsdaten.");
      });
  }, [token]);

  const browserCounts = visits.reduce((acc: Record<string, number>, visit) => {
    const browser = visit.browser || "Unbekannt";
    acc[browser] = (acc[browser] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(browserCounts),
    datasets: [
      {
        label: "Besuche pro Browser",
        data: Object.values(browserCounts),
        backgroundColor: "rgba(59, 130, 246, 0.6)", // Tailwind blue-500
      },
    ],
  };

  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Besuchsstatistik</h1>

      <div className="max-w-xl">
        <Bar data={chartData} />
      </div>

      <div className="overflow-x-auto max-h-[70vh] overflow-y-auto border rounded-lg">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10 text-left">
            <tr>
              <th className="border px-2 py-1">Zeit</th>
              <th className="border px-2 py-1">IP</th>
              <th className="border px-2 py-1">Browser</th>
              <th className="border px-2 py-1">System</th>
              <th className="border px-2 py-1">Referrer</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((v, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border px-2 py-1 whitespace-nowrap">{v.timestamp}</td>
                <td className="border px-2 py-1">{v.ip}</td>
                <td className="border px-2 py-1">{v.browser}</td>
                <td className="border px-2 py-1">{v.os}</td>
                <td className="border px-2 py-1 max-w-[300px] truncate" title={v.referrer}>
                  {v.referrer}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
