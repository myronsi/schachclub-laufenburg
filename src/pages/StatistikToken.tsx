import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Papa from "papaparse";
import { Chart } from "chart.js/auto";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";
import "../styles/StatistikToken.css";

export default function StatistikToken() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [zugelassen, setZugelassen] = useState(false);
  const [rows, setRows] = useState<string[][]>([]);
  const [perDay, setPerDay] = useState<Record<string, number>>({});

  const [sortConfig, setSortConfig] = useState<{ index: number; direction: "asc" | "desc" } | null>(null);
  const [filterSystem, setFilterSystem] = useState("");
  const [filterArch, setFilterArch] = useState("");
  const [filterBrowser, setFilterBrowser] = useState("");
  const [filterReferer, setFilterReferer] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  useEffect(() => {
    const token = params.get("token");
    if (token === import.meta.env.VITE_SECRET_TOKEN) setZugelassen(true);
    else navigate("/");
  }, [params, navigate]);

  useEffect(() => {
    if (!zugelassen) return;
    fetch("/server_api/visits.csv")
      .then((res) => (res.ok ? res.text() : Promise.reject("CSV nicht gefunden")))
      .then((text) => {
        const { data } = Papa.parse<string[]>(text, {
          delimiter: ";",
          skipEmptyLines: true,
          quoteChar: '"',
          header: false,
        });
        const rowsOnly = data.slice(1);
        const valid: string[][] = [];
        const counts: Record<string, number> = {};

        for (const parts of rowsOnly) {
          if (parts.length < 4) continue;
          const timestamp = parts[0].trim();
          const ip = parts[1].trim() || "Unbekannt";
          const referer = parts[parts.length - 1].trim() || "N/A";
          const ua = parts.slice(2, parts.length - 1).join(";").trim();

          const uaMatch = ua.match(/\(([^)]+)\)/);
          let system = "Unbekannt", arch = "Unbekannt", engine = "Unbekannt", browser = "Unbekannt", version = "Unbekannt";
          if (uaMatch) {
            const [s, a] = uaMatch[1].split(";").map((s) => s.trim());
            system = s || system;
            arch = a || arch;
          }
          const tail = ua.replace(/\(.*?\)\s*/, "").split(" ").filter(Boolean);
          if (tail.length) engine = tail[0];
          const bp = tail.find((t) => t.includes("/"));
          if (bp) [browser, version] = bp.split("/");

          valid.push([timestamp, ip, system, arch, engine, browser, version, referer]);
          const day = timestamp.split(" ")[0];
          counts[day] = (counts[day] || 0) + 1;
        }

        setRows(valid);
        setPerDay(counts);

        const ctx = document.getElementById("statistikChart") as HTMLCanvasElement;
        if (ctx) {
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: Object.keys(counts),
              datasets: [{ label: "Besuche pro Tag", data: Object.values(counts), backgroundColor: "rgba(75,192,192,0.6)" }],
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } },
          });
        }
      })
      .catch(console.error);
  }, [zugelassen]);

  const processed = useMemo(() => {
    let out = [...rows];
    if (filterSystem) out = out.filter((r) => r[2] === filterSystem);
    if (filterArch) out = out.filter((r) => r[3] === filterArch);
    if (filterBrowser) out = out.filter((r) => r[5] === filterBrowser);
    if (filterReferer) out = out.filter((r) => r[7].includes(filterReferer));
    if (dateFrom) out = out.filter((r) => new Date(r[0]) >= dateFrom);
    if (dateTo) {
      const end = new Date(dateTo);
      end.setHours(23, 59, 59, 999);
      out = out.filter((r) => new Date(r[0]) <= end);
    }
    if (sortConfig) {
      out.sort((a, b) =>
        sortConfig.direction === "asc"
          ? a[sortConfig.index].localeCompare(b[sortConfig.index])
          : b[sortConfig.index].localeCompare(a[sortConfig.index])
      );
    }
    return out;
  }, [rows, filterSystem, filterArch, filterBrowser, filterReferer, dateFrom, dateTo, sortConfig]);

  const pageCount = Math.ceil(processed.length / pageSize);
  const pageRows = processed.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (!zugelassen) return <div className="p-4 text-red-600">⛔ Zugriff verweigert</div>;

  let lastDate = "";
  return (
    <>
      <header className="bg-blue-800 text-white p-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto">
          <span className="text-lg font-semibold">Schachclub Laufenburg ev. 1969</span>
        </div>
      </header>

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">📊 Besucherstatistik</h1>
        <div className="print-header-space no-print" />

        <div className="flex justify-end gap-4 mb-4 no-print">
          <button
            onClick={() => {
              const csv = ["Zeit;IP;System;Architektur;Engine;Browser;Version;Referer", ...processed.map((r) => r.join(";"))].join("\n");
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "besuche.csv";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            📥 CSV‑Export
          </button>
          <button onClick={() => window.print()} className="bg-blue-600 text-white px-4 py-2 rounded">
            🖨️ Drucken
          </button>
        </div>

        <div className="chart-container">
          <canvas id="statistikChart"></canvas>
        </div>

        <div className="filters">
          <select value={filterSystem} onChange={(e) => { setFilterSystem(e.target.value); setCurrentPage(1); }}>
            <option value="">Alle Systeme</option>
            {[...new Set(rows.map((r) => r[2]))].map((s) => <option key={s}>{s}</option>)}
          </select>
          <select value={filterArch} onChange={(e) => { setFilterArch(e.target.value); setCurrentPage(1); }}>
            <option value="">Alle Architekturen</option>
            {[...new Set(rows.map((r) => r[3]))].map((a) => <option key={a}>{a}</option>)}
          </select>
          <select value={filterBrowser} onChange={(e) => { setFilterBrowser(e.target.value); setCurrentPage(1); }}>
            <option value="">Alle Browser</option>
            {[...new Set(rows.map((r) => r[5]))].map((b) => <option key={b}>{b}</option>)}
          </select>
          <input
            type="text"
            placeholder="Referer enthält"
            value={filterReferer}
            onChange={(e) => { setFilterReferer(e.target.value); setCurrentPage(1); }}
          />
          <div className="w-full flex gap-2 mt-2">
            <DatePicker
              selected={dateFrom}
              onChange={(d: Date | null) => { setDateFrom(d); setCurrentPage(1); }}
              placeholderText="Von"
              dateFormat="dd.MM.yyyy"
              className="border px-2 py-1"
              isClearable
            />
            <DatePicker
              selected={dateTo}
              onChange={(d: Date | null) => { setDateTo(d); setCurrentPage(1); }}
              placeholderText="Bis"
              dateFormat="dd.MM.yyyy"
              className="border px-2 py-1"
              isClearable
            />
          </div>
        </div>

        <div className="pagination">
          {Array.from({ length: pageCount }, (_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "bg-gray-300" : ""}>
              {i + 1}
            </button>
          ))}
        </div>

        <div className="table-container">
          <table className="print-table">
            <thead>
              <tr>
                {["Zeit","IP","System","Architektur","Engine","Browser","Version","Referer"].map((col, idx) => (
                  <th key={col} onClick={() => {
                    setSortConfig((prev) =>
                      prev && prev.index === idx
                        ? { index: idx, direction: prev.direction === "asc" ? "desc" : "asc" }
                        : { index: idx, direction: "asc" }
                    );
                  }}>
                    {col}{sortConfig?.index === idx ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr><td colSpan={8}>Keine Besucherdaten</td></tr>
              ) : pageRows.map((row, i) => {
                const date = row[0].split(" ")[0];
                const showBorder = lastDate && date !== lastDate;
                lastDate = date;
                return (
                  <tr key={i} className={showBorder ? "border-t-4 border-black" : ""}>
                    {row.map((cell, j) => (
                      <td key={j} className={j === 7 ? "referrer" : ""}>{cell}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
