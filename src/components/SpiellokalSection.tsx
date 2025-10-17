import { Calendar, Image, MapPin, CircleHelp, ImageOff, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const SpiellokalSection = () => {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const imageUrls = [
    { src: "/photos/building.jpg", alt: "Gebäude außen" },
    { src: "/photos/building_inside.jpg", alt: "Gebäude im Inneren" },
  ];

  return (
    <section id="spiellokal" className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-club-primary mb-12 text-center">
          Unser Spiellokal
        </h2>

        {/* Introduction */}
        <div className="mb-12 bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <p>
              Unser Spiellokal befindet sich im Feuerwehrhaus Hochsal. Hier treffen wir uns wöchentlich zum Schachspielen und Training. Das Lokal ist im Obergeschoss und bietet eine gemütliche Atmosphäre für Spieler aller Altersgruppen. Bei Fragen gerne eine Mail an:{" "}
              <a href="mailto:info@sc-laufenburg.de" className="text-blue-600 hover:text-blue-800 hover:underline">
                info@sc-laufenburg.de
              </a>
            </p>
          </div>
        </div>

        {/* What Section */}
        <div className="mb-12 bg-white rounded-lg shadow-md p-6">
          <CardTitle className="text-2xl mb-6 flex items-center gap-2">
            <CircleHelp className="text-club-accent" />
            Was
          </CardTitle>
          <div className="space-y-4">
            <p>
              Im Spiellokal finden das Jugendtraining und der reguläre Spielabend statt. Wir bieten Training für Anfänger und Fortgeschrittene, sowie freies Spielen und Vereinsturniere. Neueinsteiger sind herzlich willkommen – kommen Sie einfach vorbei!
            </p>
          </div>
        </div>

        {/* When, Where, and Directions Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="text-club-accent" />
                Wann
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Jugendtraining: Dienstags ab 17:00 Uhr</li>
                <li>Spielabend: Dienstags ab 18:30 Uhr</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="text-club-accent" />
                Wo
              </CardTitle>
            </CardHeader>
            <CardContent className="text-1xl font-normal">
              <p>Feuerwehrhaus Hochsal</p>
              <p>Bertastraße 6 (Obergeschoss)</p>
              <p>79725 Laufenburg-Hochsal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="text-club-accent" />
                Anfahrt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Das Spiellokal ist gut erreichbar. Nutzen Sie Google Maps für die genaue Route:</p>
              <a 
                href="https://maps.app.goo.gl/Z1ukbcpu45ejXS7G9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline mt-2 block"
              >
                Zur Google Maps Karte
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Photo Album */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imageUrls.map((image, index) => (
              <div key={index} className="">
                {imageErrors[index] ? (
                  <div className="aspect-square rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <ImageOff className="w-10 h-10 opacity-50" />
                      <span className="text-xs text-center">Image not available</span>
                    </div>
                  </div>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <img
                          src={image.src}
                          alt={image.alt || `Event ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={() => setImageErrors(prev => ({ ...prev, [index]: true }))}
                        />
                      </div>
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                      <DialogHeader className="space-y-2">
                        <DialogTitle>{image.alt || `Bild ${index + 1}`}</DialogTitle>
                      </DialogHeader>

                      <div className="flex flex-col items-center gap-4">
                        <div className="w-full flex justify-center">
                          <img src={image.src} alt={image.alt || `Event ${index + 1}`} className="object-contain w-full max-h-[75vh]" />
                        </div>
                        {/* no description available for these images */}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                <p className="text-sm text-center text-gray-600 mt-2">{image.alt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpiellokalSection;