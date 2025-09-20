import { Info, Euro, ScrollText, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef } from "react";
import { ScrollButton } from "@/components/ui/scroll-button"; 

const AboutSection = () => {
  const boardAnimation = useScrollAnimation();
  const feesAnimation = useScrollAnimation();
  const documentsAnimation = useScrollAnimation();

  // Refs для прокрутки
  const historySectionRef = useRef<HTMLDivElement>(null);

  const scrollToHistoryStart = () => {
    historySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="about" className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-club-primary mb-12 text-center">
          Über den Verein
        </h2>

        <Card 
          ref={boardAnimation.elementRef}
          className={`mb-12 opacity-0 ${boardAnimation.isVisible ? 'animate-slideInRight' : ''}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="text-club-accent" />
              Spiellokal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Feuerwehrhaus Hochsal<br/>
                Bertastraße 6, Obergeschoss <br/>
                79725 Laufenburg-Hochsal (Baden)
              </li>
              <li>Spielabend: Dienstags, 18:30 Uhr</li>
              <li>Jugendtraining: Dienstags, 17:00 Uhr</li>
            </ul>
          </CardContent>
        </Card>

        <Card 
          ref={boardAnimation.elementRef}
          className={`mb-12 opacity-0 ${boardAnimation.isVisible ? 'animate-slideInLeft' : ''}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-club-accent" />
              Der Vorstand
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>1. Vorstand: Benno Moser</li>
              <li>2. Vorstand: Jochen Bahner</li>
              <li>Schatzmeister: Daniel Bahner</li>
            </ul>
          </CardContent>
        </Card>

        <Card 
          ref={feesAnimation.elementRef}
          className={`mb-12 opacity-0 ${feesAnimation.isVisible ? 'animate-slideInRight' : ''}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Euro className="text-club-accent" />
              Mitgliedsbeiträge
              <span className="text-sm font-normal">/Jahr</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>aktive Erwachsene: 40,00 €</li>
              <li>passive Mitglieder: 20,00 €</li>
              <li>Jugendliche: 20,00 €</li>
            </ul>
          </CardContent>
        </Card>
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-y-4 md:gap-y-0 mb-4 md:mb-6 px-2 md:px-0">
            <div className="flex gap-2 mt-2 md:mt-0">
              <a
                href="https://www.sc-laufenburg.de/index_old.html"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-club-accent text-white px-4 py-2 rounded hover:bg-club-dark transition-colors whitespace-nowrap inline-flex items-center justify-center w-full md:w-auto"
              >
                Unsere ALTE HomePage von 2016
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
