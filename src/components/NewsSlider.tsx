import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react";

const news = [
  {
    id: 1,
    title: "Erfolg beim Bezirksturnier",
    description: "Unsere Jugendmannschaft sichert sich den ersten Platz",
    image: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f",
  },
  {
    id: 2,
    title: "Neue Jugendgruppe",
    description: "Start der U12-Gruppe im kommenden Monat",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b",
  },
  {
    id: 3,
    title: "Sommerfest 2024",
    description: "Save the Date: 15. Juli 2024",
    image: "https://images.unsplash.com/photo-1582127832282-0c3d5fd5d5f7",
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
    <div className="relative h-[500px] w-full overflow-hidden mt-16">
      {news.map((item, index) => (
        <div
          key={item.id}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center text-white px-4">
            <div className="max-w-2xl animate-fadeIn">
              <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
              <p className="text-xl mb-6">{item.description}</p>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {news.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-club-accent" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsSlider;