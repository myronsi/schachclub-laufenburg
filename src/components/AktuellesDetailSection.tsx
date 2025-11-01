import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const KNOWN_TLDS = ['.co.uk', '.com', '.de', '.org', '.net', '.info', '.eu', '.ch', '.at', '.co', '.gov', '.edu', '.nu'];

function stripKnownTld(hostname: string) {
  const lower = hostname.toLowerCase();
  for (const t of KNOWN_TLDS.sort((a, b) => b.length - a.length)) {
    if (lower.endsWith(t)) {
      return hostname.slice(0, hostname.length - t.length);
    }
  }
  return hostname;
}

function titleCase(s: string) {
  return s
    .split(/[-_\s\.\/]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function formatLinkLabel(urlStr: string) {
  try {
    const u = new URL(urlStr);
    let host = u.hostname.replace(/^www\./i, '');
    host = stripKnownTld(host);
    host = host.replace(/\./g, ' ');

  const path = u.pathname.replace(/\/+$/,'');
    const parts = path.split('/').filter(Boolean).map((p) => decodeURIComponent(p).replace(/[-_]/g, ' '));
    const hostLabel = titleCase(host);
    if (parts.length === 0) return hostLabel;
    const pathLabel = parts.map((p) => titleCase(p)).join(' › ');
    return `${hostLabel} › ${pathLabel}`;
  } catch (e) {
    return titleCase(urlStr.replace(/^https?:\/\//i, '').replace(/[:?#].*$/, ''));
  }
}

type NewsItem = {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  image?: string;
  link?: string;
};

function AktuellesDetailSection() {
  const { slug } = useParams();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageAvailable, setImageAvailable] = useState<boolean>(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    fetch(`https://sc-laufenburg.de/api/news.php?slug=${encodeURIComponent(slug)}`)
      .then(async (res) => {
        if (res.status === 404) {
          setNewsItem(null);
          setLoading(false);
          return null;
        }

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.message || `HTTP ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        if (data) setNewsItem(data);
      })
      .catch((err) => {
        console.error('news fetch error', err);
        setError(String(err?.message || err));
      })
      .finally(() => {
        if (loading) setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    setImageAvailable(Boolean(newsItem?.image));
  }, [newsItem?.image]);

  if (loading) return (
    <article className="mx-auto px-4 pt-16 py-16 max-w-6xl">
      <header className="mb-6 relative">
        <div className="text-center">
          <Skeleton className="h-8 w-56 mx-auto" />
          <div className="mt-2"><Skeleton className="h-4 w-32 mx-auto" /></div>
        </div>
      </header>

      <div className={`md:items-start md:gap-8 md:flex`}>
        <main className="md:flex-1">
          <section className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/4" />
          </section>
        </main>

        <aside className="md:w-1/3 w-full mt-6 md:mt-0 hidden md:block">
          <Skeleton className="w-full h-56" />
        </aside>
      </div>
    </article>
  );
  if (error) return (
    <div className="mx-auto max-w-2xl p-6 bg-red-50 border border-red-200 text-red-700 rounded-lg">
      <strong className="block text-lg">Fehler beim Laden</strong>
      <p className="mt-2 text-sm">Es ist ein Fehler beim Laden des Artikels aufgetreten. Bitte versuche es später erneut.</p>
      <p className="mt-3 text-xs text-red-600">{error}</p>
    </div>
  );

  if (!newsItem) return (
    <div className="mx-auto max-w-2xl p-8 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-center">
      <h2 className="text-xl font-semibold">Artikel nicht gefunden</h2>
      <p className="mt-2 text-sm text-gray-600">Der angeforderte Artikel existiert nicht oder wurde entfernt.</p>
      <p className="mt-4"><Link to="/aktuelles" className="underline">Zurück zur Übersicht</Link></p>
    </div>
  );

  return (
    <article className="mx-auto px-4 pt-16 py-16 max-w-6xl animate-fadeIn">
      <header className="mb-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <Link to="/aktuelles" aria-label="Zurück zur Übersicht" className="flex items-center text-gray-600 hover:text-club-primary justify-self-start">
            <ArrowLeft className="w-5 h-5" />
            <span className="ml-2 hidden sm:inline">Zurück</span>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-club-primary break-words">{newsItem.title}</h1>
            <p className="mt-2 text-sm text-gray-500">{new Date(newsItem.date).toLocaleDateString('de-DE')}</p>
          </div>
          <div className="justify-self-end">
            <span className="inline-flex items-center opacity-0 pointer-events-none">
              <ArrowLeft className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Zurück</span>
            </span>
          </div>
        </div>
      </header>

  <div className={`md:items-start md:gap-8 ${newsItem?.image && imageAvailable ? 'md:flex' : ''}`}>
        <main className="md:flex-1">
          <section className="prose lg:prose-xl max-w-none prose-img:rounded-lg prose-img:shadow-lg prose-img:mx-auto prose-img:max-w-full">
            <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
          </section>

          {newsItem.link && (
            <p className="mt-6 text-left md:text-left">
              <a
                href={newsItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-2 bg-club-accent text-white px-4 py-2 rounded hover:bg-club-dark transition-colors shadow-sm"
              >
                <ExternalLink className="hidden sm:inline-block w-4 h-4" />
                <span className="font-medium">Weitere Informationen</span>
                <span className="ml-3 text-xs text-white/90 bg-white/10 px-2 py-0.5 rounded">
                  {formatLinkLabel(newsItem.link)}
                </span>
              </a>
            </p>
          )}
        </main>

        {newsItem.image && imageAvailable && (
          <aside className="md:w-1/3 w-full mt-6 md:mt-0">
            <div className="md:sticky md:top-24 rounded-lg overflow-hidden shadow-lg">
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="w-full h-56 md:h-[480px] object-cover"
                onError={() => setImageAvailable(false)}
                onLoad={() => setImageAvailable(true)}
              />
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}

export default AktuellesDetailSection;
