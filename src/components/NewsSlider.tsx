import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { news } from "./arrays/newsList"

const NewsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const sortedNews = [...news].sort((a, b) => a.id - b.id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % sortedNews.length);
    }, 15000);
  
    return () => clearTimeout(timer);
  }, [currentSlide, sortedNews.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);  

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sortedNews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sortedNews.length) % sortedNews.length);
  };

  const renderSlideContent = (item: any) => {
    const content = (
      <>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
          {item.title}
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8">
          {item.description}
        </p>
      </>
    );

    if (!item.link) return content;
    if (typeof item.link === 'string' && item.link.startsWith('http')) {
      return (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      );
    }
    return (
      <Link to={item.link} className="block">
        {content}
      </Link>
    );
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {sortedNews.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
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
              {item.link && (
                (typeof item.link === 'string' && item.link.startsWith('http')) ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 bg-club-accent text-white px-4 py-2 rounded hover:bg-club-dark transition-colors"
                  >
                    Mehr erfahren
                  </a>
                ) : (
                  <Link
                    to={item.link}
                    className="inline-block mt-6 bg-club-accent text-white px-4 py-2 rounded hover:bg-club-dark transition-colors"
                  >
                    Mehr erfahren
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      ))}

      {sortedNews.length > 1 && (
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
        {sortedNews.map((_, index) => (
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