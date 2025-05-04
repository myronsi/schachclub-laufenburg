import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function StatistikToken() {
  const [params] = useSearchParams();
  const [zugelassen, setZugelassen] = useState(false);
  const [rows, setRows] = useState<string[][]>([]);
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
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse<string[]>(text.trim(), {
          delimiter: ";",
          skipEmptyLines: true,
        });
  
        const rowsOnly = parsed.data.slice(1); // Header überspringen
        const validRows: string[][] = [];
  
        rowsOnly.forEach((parts, idx) => {
          if (parts.length < 4) {
            console.warn(`⚠️ Ungültige CSV-Zeile [${idx + 2}]:`, parts);
            return;
          }
  
          const [timestamp, ipRaw, userAgentRaw, refererRaw] = parts;
          const ip = ipRaw?.trim() || "Unbekannt";
          const userAgent = userAgentRaw?.trim() || "";
          const referer = refererRaw?.trim() || "Unbekannt";
  
          const sysMatch = userAgent.match(/\(([^)]+)\)/);
          const sysParts = sysMatch?.[1]?.split(";").map((s) => s.trim()) || [];
          const system = sysParts[0] || "Unbekannt";
          const arch = sysParts[1] || "Unbekannt";
  
          const rest = userAgent.replace(/\(.*?\)\s*/, "").split(" ").filter(Boolean);
          const engine = rest[0] || "Unbekannt";
          const browserVersion = rest.find((s) => s.includes("/")) || "Unbekannt/Unbekannt";
          const [browser, version] = browserVersion.split("/") || ["Unbekannt", "Unbekannt"];
  
          validRows.push([
            timestamp,
            ip,
            system,
            arch,
            engine,
            browser,
            version,
            referer,
          ]);
        });
  
        setRows(validRows);
      });
  }, [zugelassen]);  

  if (!zugelassen) {
    return <div className="p-4 text-red-600">⛔ Zugriff verweigert</div>;
  }

  let lastDate = "";

  return (
    <div className="p-4">
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

      <div className="overflow-auto border max-h-[600px]">
        <table className="min-w-[1000px] w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-gray-100 text-base shadow">
            <tr>
              {[
                "Zeit",
                "IP",
                "System",
                "Architektur",
                "Engine",
                "Browser",
                "Version",
                "Referer",
              ].map((col) => (
                <th
                  key={col}
                  className="border px-2 py-2 text-left font-semibold text-gray-800"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const currentDate = row[0].split(" ")[0];
              const showBreak = lastDate && currentDate !== lastDate;
              lastDate = currentDate;

              return (
                <tr
                  key={i}
                  className={`hover:bg-yellow-100 ${
                    showBreak ? "border-t-4 border-black" : ""
                  }`}
                >
                  {row.map((cell, j) => (
                    <td key={j} className="border px-2 py-1 whitespace-nowrap">
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
