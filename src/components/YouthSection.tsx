
import { Calendar, Image, MapPin, CircleHelp, ImageOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const YouthSection = () => {
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

  const imageUrls = [
    {
      src: "photos/jugendspiele.jpg",
      alt: "Laufenburger Kindersommer 30.07.12 - 01.08.12"
    },
    {
      src: "photos/jugendspiele1.jpg",
      alt: "Laufenburger Kindersommer 30.07.12 - 01.08.12"
    },
    {
      src: "photos/jugendspiele2.jpg",
      alt: "Laufenburger Kindersommer 30.07.12 - 01.08.12"
    },
    {
      src: "photos/jugendspiele3.jpg",
      alt: "Laufenburger Kindersommer 30.07.12 - 01.08.12"
    },
    {
      src: "photos/jugendspiele4.jpg",
      alt: "Laufenburger Kindersommer 30.07.12 - 01.08.12"
    },
    {
      src: "photos/jugendspiele5.jpg",
      alt: "Laufenburger Kindersommer 30.07.12 - 01.08.12"
    },
  
  ];

  return (
    <section id="youth" className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-club-primary mb-12 text-center">
          Jugendarbeit
        </h2>

        {/* Introduction */}
        <div className="mb-12 bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <p>
              Jugendarbeit ist essenziell für Vereine. Schach fördert die geistige Entwicklung 
              von Kindern und Jugendlichen: Es trainiert Konzentration, logisches Denken und 
              verbindet Lernen spielerisch mit Wettkampf. Aktuell können wir alle Interessierten 
              jeden Alters aufnehmen - egal, ob sie Schach neu lernen oder verbessern möchten. 
              Einfach unverbindlich vorbeischauen! Bei Fragen gerne eine Mail an Jugendleiter Jochen:{" "}
                <a href="mailto:jugend@sc-laufenburg.de" className="text-blue-600 hover:text-blue-800 hover:underline">
                  jugend@sc-laufenburg.de
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
              Aktuell trainieren alle interessierten Jugendlichen gemeinsam; Neueinsteiger 
              mit Grundkenntnissen können jederzeit zum Schnuppertraining vorbeikommen. 
              Bei genügend Interesse wäre ein zusätzlicher Anfängerkurs möglich - hier können 
              sich Interessierte aller Altersgruppen unverbindlich melden. Neben dem regulären 
              Training bieten wir jährlich den Laufenburger Kindersommer an, ein Angebot für 
              absolute Schach-Anfänger:innen, um uns kennenzulernen.
            </p>
          </div>
        </div>

        {/* When and Where Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="text-club-accent" />
                Wann
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Dienstags, 17.00</p>
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
              <p>Feuerwehrhaus Hochsal, Bertastr. 6, 79725 Laufenburg</p>
            </CardContent>
          </Card>
        </div>

        {/* Photo Album */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-club-primary flex items-center gap-2">
            <Image className="text-club-accent" />
            Fotoalbum
          </h3>
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
                          alt={image.alt || `Youth event ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={() => setImageErrors(prev => ({...prev, [index]: true}))}
                        />
                      </div>
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                      <DialogHeader className="space-y-2">
                        <DialogTitle>{image.alt || `Bild ${index + 1}`}</DialogTitle>
                      </DialogHeader>

                      <div className="flex flex-col items-center gap-4">
                        <div className="w-full flex justify-center">
                          <img src={image.src} alt={image.alt || `Youth event ${index + 1}`} className="object-contain w-full max-h-[75vh]" />
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

export default YouthSection;