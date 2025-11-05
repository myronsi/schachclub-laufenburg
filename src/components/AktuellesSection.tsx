import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

type NewsItem = {
  id: number;
  slug: string;
  title: string;
  description: string;
  content?: string;
  date: string;
  image?: string | null;
  link?: string | null;
};

const NewsThumb = ({ src, alt }: { src?: string | null; alt: string }) => {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover rounded"
      onError={() => setErrored(true)}
    />
  );
};

const AktuellesSection = () => {
  const [items, setItems] = useState<NewsItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const timer = setTimeout(() => {
      const q = query.trim();
      const url = `https://sc-laufenburg.de/api/news.php${q ? `?q=${encodeURIComponent(q)}` : ''}`;

      fetch(url)
        .then(async (res) => {
          if (!res.ok) throw new Error((await res.json()).message || `HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (!cancelled) setItems(Array.isArray(data) ? data.slice(0, 5) : []);
        })
        .catch((err) => {
          if (!cancelled) setError(String(err?.message || err));
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <section className="pt-16 py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-club-primary">Aktuelles</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Neuigkeiten, Berichte und Ankündigungen aus dem Verein.</p>
        </header>

        

        <div className="max-w-3xl mx-auto mb-6">
          <label className="sr-only">Suche Nachrichten</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><Search className="w-4 h-4" /></span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nach Artikel suchen"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-club-accent"
            />
          </div>
        </div>

        {loading && (
          <div className="space-y-4">
            {[1,2,3].map((n) => (
              <article key={n} className="bg-white border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>

                  <div className="w-28 h-20 md:w-36 md:h-24 flex-shrink-0 self-center md:self-start">
                    <Skeleton className="w-full h-full" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        {error &&     
          <div className="mx-auto max-w-2xl p-6 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <strong className="block text-lg">Fehler beim Laden</strong>
            <p className="mt-2 text-sm">Es ist ein Fehler beim Laden der Artikel aufgetreten. Bitte versuche es später erneut.</p>
            <p className="mt-3 text-xs text-red-600">{error}</p>
          </div>
        }

        {!loading && items && (
          <div className="space-y-4">
            {items.length === 0 && (
              <div className="mx-auto max-w-2xl p-4 text-center text-gray-600">Keine Artikel gefunden.</div>
            )}
            {items.map((it) => (
              <article key={it.id} className="bg-white border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <Link to={`/aktuelles/${encodeURIComponent(it.slug)}`} className="text-lg font-semibold text-club-primary hover:underline">{it.title}</Link>
                    <div className="text-sm text-gray-500 mt-1">{new Date(it.date).toLocaleDateString('de-DE')}</div>
                    <p className="text-sm mt-3 text-gray-700">{it.description}</p>
                  </div>

                  {it.image && (
                    <div className="w-28 h-20 md:w-36 md:h-24 flex-shrink-0 self-center md:self-start">
                      <NewsThumb src={it.image} alt={it.title} />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AktuellesSection;
