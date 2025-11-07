import { useMemo, useState, useEffect } from "react";
import { Search, Filter, Download } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Document {
  id: number;
  name: string;
  filename: string;
  filepath: string;
  category?: string;
  description?: string;
  file_size?: number;
  upload_date?: string;
  updated_at?: string;
  display_order: number;
  is_active: boolean;
}

const DocumentsSection = () => {
  const [query, setQuery] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = new URLSearchParams();
        
        params.append('active_only', 'true');
        
        if (selectedCategory && selectedCategory !== "all") {
          params.append('category', selectedCategory);
        }
        
        if (query.trim()) {
          params.append('search', query.trim());
        }
        
        const url = `https://sc-laufenburg.de/api/documents.php?${params.toString()}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }
        
        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching documents:', err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchDocuments();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, selectedCategory]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    documents.forEach(doc => {
      if (doc.category) cats.add(doc.category);
    });
    return Array.from(cats).sort();
  }, [documents]);

  const extractYear = (text: string): number | null => {
    const yearMatch = text.match(/\b(19\d{2}|20\d{2})\b/);
    return yearMatch ? parseInt(yearMatch[0]) : null;
  };

  const filteredDocs = useMemo(() => {
    return [...documents].sort((a, b) => {
      const aIsStatuten = a.category?.toLowerCase() === 'statuten';
      const bIsStatuten = b.category?.toLowerCase() === 'statuten';

      if (aIsStatuten && !bIsStatuten) return -1;
      if (!aIsStatuten && bIsStatuten) return 1;

      const aYear = extractYear(a.name) || extractYear(a.filename);
      const bYear = extractYear(b.name) || extractYear(b.filename);

      if (!aYear && bYear) return -1;
      if (aYear && !bYear) return 1;

      if (aYear && bYear) {
        return bYear - aYear;
      }

      return 0;
    });
  }, [documents]);

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getCategoryColor = (category?: string) => {
    if (!category) return 'bg-gray-100 text-gray-700';
    
    const colors: Record<string, string> = {
      'statuten': 'bg-blue-100 text-blue-700',
      'protokolle': 'bg-purple-100 text-purple-700',
      'formulare': 'bg-green-100 text-green-700',
      'berichte': 'bg-yellow-100 text-yellow-700',
      'geschichte': 'bg-red-100 text-red-700',
      'sonstiges': 'bg-orange-100 text-orange-700'
    };
    
    const normalizedCategory = category.toLowerCase();
    return colors[normalizedCategory] || 'bg-indigo-100 text-indigo-700';
  };

  return (
    <section id="documents" className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-club-primary mb-12 text-center">
          Dokumente
        </h2>
        
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="sr-only">Suche Dokumente</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Nach Dokumenten suchen..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-club-accent"
                />
              </div>
            </div>

            {categories.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition ${
                      selectedCategory && selectedCategory !== "all" ? "bg-club-accent text-white hover:bg-club-dark" : "bg-white"
                    }`}
                    title="Filter nach Kategorie"
                  >
                    <Filter className="w-4 h-4" />
                    {selectedCategory && selectedCategory !== "all" && (
                      <span className="text-sm font-medium">{selectedCategory}</span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64" align="end">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Kategorie filtern
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Alle Kategorien" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alle Kategorien</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>
                            <span className="inline-flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${getCategoryColor(cat).split(' ')[0]}`}></span>
                              {cat}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        {error && (
          <div className="text-center py-4 mb-4 bg-yellow-50 border border-yellow-200 rounded max-w-4xl mx-auto">
            <p className="text-yellow-800 text-sm">
              Es ist ein Fehler beim Laden der Dokumente aufgetreten. Bitte versuche es später erneut.
            </p>
          </div>
        )}

        {loading && (
          <div className="max-w-4xl mx-auto mb-8 space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white border rounded-md p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-10 w-28" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold">
                Verfügbare Dokumente ({filteredDocs.length})
              </h4>
            </div>

            <ul className="space-y-3">
            {filteredDocs.map((doc) => (
              <li 
                key={doc.id} 
                className="flex items-start justify-between bg-white rounded-md p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <div className="text-base font-medium">{doc.name}</div>
                    
                    {doc.category && (
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getCategoryColor(doc.category)}`}>
                        {doc.category}
                      </span>
                    )}
                  </div>

                  {doc.description && (
                    <div className="text-sm text-gray-600 mb-2">{doc.description}</div>
                  )}

                  <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                    <span title="Dateiname">{doc.filename}</span>
                    
                    {doc.file_size && (
                      <>
                        <span>•</span>
                        <span title="Dateigröße">{formatFileSize(doc.file_size)}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <a
                    href={doc.filepath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-sm p-2 rounded-md bg-club-accent text-white hover:bg-club-dark transition-all duration-300 ease-in-out whitespace-nowrap flex items-center overflow-hidden hover:px-4"
                    title="Dokument herunterladen"
                  >
                    <Download className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden md:block max-w-0 opacity-0 translate-x-2 group-hover:max-w-xs group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-300 ease-in-out overflow-hidden">
                      Download
                    </span>
                  </a>
                </div>
              </li>
            ))}

              {filteredDocs.length === 0 && (
                <li className="text-center text-gray-500 py-8 bg-gray-50 rounded-md">
                  <div>Keine Dokumente gefunden.</div>
                  {(query || (selectedCategory && selectedCategory !== "all")) && (
                    <button
                      onClick={() => {
                        setQuery("");
                        setSelectedCategory("all");
                      }}
                      className="mt-3 text-sm text-club-accent hover:underline"
                    >
                      Filter zurücksetzen
                    </button>
                  )}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default DocumentsSection;
