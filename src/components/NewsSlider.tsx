import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NewsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sortedNews = [...items].sort((a, b) => a.id - b.id);
  const slides = sortedNews.filter((v, i, a) => {
    if (!v || !v.slug) return false;
    return a.findIndex(x => x.slug === v.slug) === i;
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (slides.length > 0) setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 15000);

    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  

  // fetch news from API
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch('https://viserix.com/news.php')
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json())?.message || `HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setItems(data);
      })
      .catch((err) => {
        if (!cancelled) setError(String(err?.message || err));
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (Number.isFinite(prev) ? (prev + 1) % slides.length : 0));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => {
      const p = Number.isFinite(prev) ? prev : 0;
      return (p - 1 + slides.length) % slides.length;
    });
  }, [slides.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent | React.KeyboardEvent) => {
    const key = 'key' in e ? e.key : (e as KeyboardEvent).key;
    if (key === 'ArrowRight' || key === 'Right') {
      e.preventDefault?.();
      nextSlide();
    } else if (key === 'ArrowLeft' || key === 'Left') {
      e.preventDefault?.();
      prevSlide();
    }
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    // Global listener as a fallback
    const listener = (e: KeyboardEvent) => handleKeyDown(e);
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [handleKeyDown]);

  // Keep currentSlide in-range when slide list changes
  useEffect(() => {
    if (slides.length === 0) {
      setCurrentSlide(0);
      return;
    }
    if (!Number.isFinite(currentSlide) || currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const renderSlideContent = (item: any) => {
    const desc = String(item.description ?? "");
    const len = desc.length;
    const descSize = len > 320
      ? 'text-[clamp(0.75rem,2.2vw,1.1rem)]'
      : len > 200
        ? 'text-[clamp(0.875rem,2.8vw,1.25rem)]'
        : 'text-[clamp(1rem,3.5vw,1.75rem)]';
    return (
      <>
        <h2 className="font-extrabold mb-4 md:mb-6 break-words hyphens-auto leading-tight text-[clamp(1.5rem,5vw,3.5rem)]">
          {item.title}
        </h2>
        <p className={`mb-6 md:mb-8 leading-snug break-words hyphens-auto ${descSize}`}>
          {desc}
        </p>
      </>
    );
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={(e) => handleKeyDown(e)}
      tabIndex={0}
      role="region"
      aria-label="News Slider"
    >
      {slides.map((item, index) => (
        <div
          key={`${item.id ?? 'n'}-${item.slug}-${index}`}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={index === currentSlide ? 'false' : 'true'}
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{ 
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              minHeight: '100%'
            }}
          >
            <div className="absolute inset-0 bg-black/50 w-full h-full" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center text-white px-4">
            <div className="max-w-2xl animate-fadeIn mx-4">
              {renderSlideContent(item)}
              <Link
                to={`/aktuelles/${encodeURIComponent(item.slug)}`}
                className="inline-block mt-6 bg-club-accent text-white px-4 py-2 rounded hover:bg-club-dark transition-colors"
              >
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
      ))}

  {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            aria-label="Vorherige Nachricht"
          >
            <ChevronLeft className="text-white w-8 h-8 md:w-10 md:h-10" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            aria-label="Nächste Nachricht"
          >
            <ChevronRight className="text-white w-8 h-8 md:w-10 md:h-10" />
          </button>
        </>
      )}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors ${
              index === currentSlide ? "bg-club-accent" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsSlider;