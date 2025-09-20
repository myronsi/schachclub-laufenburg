import { useMemo, useState } from "react";

const documents = [
  { name: "Satzung (PDF)", href: "/docs/satzung_laufenburg.pdf" },
  { name: "Geschichte (PDF)", href: "/docs/geschichte.pdf" },
  { name: "Aufnahmeantrag (PDF)", href: "/docs/aufnahmeantrag.pdf" },
];

const DocumentsSection = () => {
  const [query, setQuery] = useState("");

  const filteredDocs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return documents;
    return documents.filter(
      (d) => d.name.toLowerCase().includes(q) || d.href.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section id="documents" className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-club-primary mb-12 text-center">
                Dokumente
            </h2>
            <div className="max-w-3xl mx-auto mb-12">
                <label className="block text-sm font-medium text-gray-700 mb-2">Suche Dokumente</label>
                <div className="flex gap-2">
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Name oder Dateiname eingeben"
                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-club-accent"
                />
                <button
                    onClick={() => setQuery("")}
                    className="px-4 py-2 bg-gray-100 rounded-md"
                >
                    Reset
                </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mb-8">
                <h4 className="text-xl font-semibold mb-4">Verfügbare Dokumente</h4>
                <ul className="space-y-3">
                {filteredDocs.map((doc) => (
                    <li key={doc.href} className="flex items-center justify-between bg-white rounded-md p-3 shadow-sm">
                    <div>
                        <div className="text-sm font-medium">{doc.name}</div>
                        <div className="text-xs text-gray-500">{doc.href}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm px-3 py-1 rounded-md bg-club-accent text-white hover:bg-club-dark transition"
                        >
                        Download
                        </a>
                    </div>
                    </li>
                ))}
                {filteredDocs.length === 0 && (
                    <li className="text-sm text-gray-500">Keine Dokumente gefunden.</li>
                )}
                </ul>
            </div>
        </div>
    </section>
  );
};

export default DocumentsSection;
