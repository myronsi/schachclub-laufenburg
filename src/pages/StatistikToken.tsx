// src/pages/StatistikToken.tsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Papa from "papaparse";
import { Chart } from "chart.js/auto";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function StatistikToken() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [zugelassen, setZugelassen] = useState(false);
  const [rows, setRows] = useState<string[][]>([]);
  const [perDay, setPerDay] = useState<Record<string, number>>({});

  // Erweiterungen: Sortierung, Filter, Datum, Pagination
  const [sortConfig, setSortConfig] = useState<{ index: number; direction: "asc" | "desc" } | null>(null);
  const [filterText, setFilterText] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

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
        const parsed = Papa.parse<string[]>(text, {
          delimiter: ";",
          skipEmptyLines: true,
          quoteChar: '"',
          header: false,
        });
        const rowsOnly = parsed.data.slice(1);
        const valid: string[][] = [];
        const counts: Record<string, number> = {};

        rowsOnly.forEach((parts) => {
          if (parts.length < 4) return;
          const timestamp = parts[0].trim();
          const ip = parts[1].trim() || "Unbekannt";
          const referer = parts[parts.length - 1].trim() || "N/A";
          const ua = parts.slice(2, parts.length - 1).join(";").trim();

          // UA‑Parsing
          const uaMatch = ua.match(/\(([^)]+)\)/);
          let system = "Unbekannt", arch = "Unbekannt", engine = "Unbekannt", browser = "Unbekannt", version = "Unbekannt";
          if (uaMatch) {
            const sys = uaMatch[1].split(";").map((s) => s.trim());
            system = sys[0] || system;
            arch = sys[1] || arch;
          }
          const tail = ua.replace(/\(.*?\)\s*/, "").split(" ").filter(Boolean);
          if (tail.length) engine = tail[0];
          const bp = tail.find((t) => t.includes("/"));
          if (bp) [browser, version] = bp.split("/");

          valid.push([timestamp, ip, system, arch, engine, browser, version, referer]);
          const day = timestamp.split(" ")[0];
          counts[day] = (counts[day] || 0) + 1;
        });

        setRows(valid);
        setPerDay(counts);

        const ctx = document.getElementById("statistikChart") as HTMLCanvasElement;
        if (ctx) {
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: Object.keys(counts),
              datasets: [
                {
                  label: "Besuche pro Tag",
                  data: Object.values(counts),
                  backgroundColor: "rgba(75,192,192,0.6)",
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

  // Gefilterte, sortierte, paginierte Zeilen
  const processedRows = useMemo(() => {
    let filtered = rows;
    if (filterText) {
      filtered = filtered.filter(
        (r) =>
          r[5].toLowerCase().includes(filterText.toLowerCase()) ||
          r[7].toLowerCase().includes(filterText.toLowerCase())
      );
    }
    if (dateFrom) filtered = filtered.filter((r) => new Date(r[0]) >= dateFrom!);
    if (dateTo) filtered = filtered.filter((r) => new Date(r[0]) <= dateTo!);
    if (sortConfig) {
      filtered = [...filtered].sort((a, b) =>
        sortConfig.direction === "asc"
          ? a[sortConfig.index].localeCompare(b[sortConfig.index])
          : b[sortConfig.index].localeCompare(a[sortConfig.index])
      );
    }
    return filtered;
  }, [rows, filterText, dateFrom, dateTo, sortConfig]);

  const pageCount = Math.ceil(processedRows.length / pageSize);
  const pageRows = processedRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const onHeaderClick = (idx: number) =>
    setSortConfig((prev) =>
      prev && prev.index === idx
        ? { index: idx, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { index: idx, direction: "asc" }
    );

  if (!zugelassen) return <div className="p-4 text-red-600">⛔ Zugriff verweigert</div>;

  let lastDate = "";
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📊 Besucherstatistik</h1>

      <div className="flex justify-end gap-4 mb-4 no-print">
        <button
          onClick={() => {
            const csv = [
              "Zeit;IP;System;Architektur;Engine;Browser;Version;Referer",
              ...processedRows.map((r) => r.join(";")),
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
        <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          🖨️ Drucken
        </button>
      </div>

      <div className="h-[300px] mb-4 no-print">
        <canvas id="statistikChart"></canvas>
      </div>

      {/* Filter & Datum direkt über Tabelle */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter Browser/Referrer"
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-2 py-1"
        />
        <DatePicker
          selected={dateFrom}
          onChange={(d: Date | null) => {
            setDateFrom(d);
            setCurrentPage(1);
          }}
          selectsStart
          startDate={dateFrom}
          endDate={dateTo}
          placeholderText="Von"
          className="border px-2 py-1"
        />
        <DatePicker
          selected={dateTo}
          onChange={(d: Date | null) => {
            setDateTo(d);
            setCurrentPage(1);
          }}
          selectsEnd
          startDate={dateFrom}
          endDate={dateTo}
          placeholderText="Bis"
          className="border px-2 py-1"
        />
        <DatePicker
          selected={dateFrom}
          onChange={(d: Date | null) => {
            setDateFrom(d);
            setCurrentPage(1);
          }}
          selectsStart
          startDate={dateFrom}
          endDate={dateTo}
          placeholderText="Von"
          className="border px-2 py-1"
        />
        <DatePicker
          selected={dateTo}
          onChange={(d: Date | null) => {
            setDateTo(d);
            setCurrentPage(1);
          }}
          selectsEnd
          startDate={dateFrom}
          endDate={dateTo}
          placeholderText="Bis"
          className="border px-2 py-1"
        />
      </div>

      <div className="overflow-auto border border-gray-300 max-h-[600px] max-w-full table-container">
        <table className="min-w-[900px] w-full text-sm border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {['Zeit','IP','System','Architektur','Engine','Browser','Version','Referer'].map((col, idx) => (
                <th key={col} onClick={() => onHeaderClick(idx)} className="border px-2 py-2 text-left font-semibold cursor-pointer">
                  {col} {sortConfig?.index === idx ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                  Keine Besucherdaten
                </td>
              </tr>
            ) : (
              pageRows.map((row, i) => {
                const date = row[0].split(' ')[0];
                const showBorder = lastDate && date !== lastDate;
                lastDate = date;
                return (
                  <tr key={i} className={`hover:bg-yellow-100 ${showBorder ? 'border-t-4 border-black' : ''}`}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={
                          j === 7
                            ? 'border px-2 py-1 whitespace-normal break-words'
                            : 'border px-2 py-1 break-all max-w-[150px]'
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

      <div className="flex justify-center gap-2 mt-4 no-print">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-2 py-1 border ${currentPage === page ? 'bg-gray-300' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
