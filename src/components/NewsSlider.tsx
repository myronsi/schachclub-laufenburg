import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react";

const news = [
  {
    id: 1,
    title: "Osterdienstag",
    description: "Am Dienstag, 22. April, findet kein Spieleabend statt.",
    image: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f",
  },
  {
    id: 2,
    title: "...",
    description: "...",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b",
  },
];

const NewsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length);
  };

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: "Schachclub Laufenburg News",
        text: title,
        url: window.location.href,
      }).catch((error) => console.log("Error sharing:", error));
    }
  };
  
  return (
    <div className="relative h-screen w-full overflow-hidden pt-16 md:pt-20">
      {news.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center text-white px-4">
            <div className="max-w-2xl animate-fadeIn mx-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                {item.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="text-white w-8 h-8 md:w-10 md:h-10" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
      >
        <ChevronRight className="text-white w-8 h-8 md:w-10 md:h-10" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {news.map((_, index) => (
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