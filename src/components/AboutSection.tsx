import { Info, Euro, ScrollText, Users, ArrowBigDown, ArrowBigUp, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { timeline} from "./arrays/historyList";
import { useRef } from "react";
import { ScrollButton } from "@/components/ui/scroll-button"; 

const AboutSection = () => {
  const boardAnimation = useScrollAnimation();
  const timelineAnimation = useScrollAnimation({
    threshold: 0.01,
    rootMargin: "100px"
  });
  const feesAnimation = useScrollAnimation();
  const documentsAnimation = useScrollAnimation();

  // Refs для прокрутки
  const historySectionRef = useRef<HTMLDivElement>(null);
  const timelineEndRef = useRef<HTMLDivElement>(null);

  const scrollToTimelineEnd = () => {
    timelineEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

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
          <CardContent>
            <ul className="space-y-2 pt-6 text-center text-lg">
              <li>
                <div className="flex items-center justify-center gap-2">
                  <Info className="text-club-accent" />
                  Spiellokal
                </div>
                <b>Feuerwehrhaus Hochsal</b><br/>
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
        <Card 
          ref={documentsAnimation.elementRef}
          className={`mb-12 opacity-0 ${documentsAnimation.isVisible ? 'animate-slideInLeft' : ''}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScrollText className="text-club-accent"/>
              Wichtige Dokumente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a 
                  href="docs/satzung_laufenburg.pdf" 
                  className="hover:text-club-accent hover:underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Satzung des Schachclubs Laufenburg e.V.
                </a>
              </li>
              <li>
                <a 
                  href="docs/aufnahmeantrag.pdf" 
                  className="hover:text-club-accent hover:underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Aufnahmeantrag Schachclub Laufenburg e.V.
                </a>
              </li>
              <li>
                <a 
                  href="docs/mitgliederanmeldung_bsv_2018.pdf" 
                  className="hover:text-club-accent hover:underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Mitglieder-Anmeldung Badischer Schachverband e.V.
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
        <div 
          ref={timelineAnimation.elementRef}
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-y-4 md:gap-y-0 mb-4 md:mb-6 px-2 md:px-0">
            <div 
              ref={historySectionRef}
              className="flex items-center gap-3"
            >
              <h2 className="text-2xl md:text-2xl font-semibold text-club-primary">
                Unsere Geschichte
              </h2>
              <ScrollButton 
                onClick={scrollToTimelineEnd}
                icon={<ArrowBigDown className="w-5 h-5" />}
                className="md:-mt-1"
              />
              <span 
                className="text-dark font-medium bg-[#F3F4F6] py-6 hover:underline hover:text-club-accent hover:cursor-pointer"
                onClick={scrollToTimelineEnd}
              >
                zur Gründung
              </span>
            </div>
            
            <a
              href="https://www.sc-laufenburg.de/index_old.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-club-accent text-white px-4 py-2 rounded hover:bg-club-dark transition-colors whitespace-nowrap inline-flex items-center justify-center w-full md:w-auto mt-2 md:mt-0"
            >
              Unsere ALTE HomePage von 2016
              </a>
            <a
              href="/docs/geschichte.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-club-accent text-white px-4 py-2 rounded hover:bg-club-dark transition-colors whitespace-nowrap inline-flex items-center justify-center w-full md:w-auto mt-2 md:mt-0"
            >
              <Download
                className="pr-2"
              />
              Vollständige Geschichte (PDF)
            </a>
          </div>
          <div className="relative ml-4 md:ml-12 max-w-[calc(100%-2rem)] md:max-w-[calc(100%-3rem)]">
            <div 
              className="absolute left-[15px] md:left-[19px] top-4 bottom-0 w-[2px] bg-club-accent"
              style={{ height: "calc(100% - 1rem)" }}
            />

            <div className="space-y-6 md:space-y-8 relative pl-4 md:pl-8">
              {timeline.map((group, groupIndex) => (
                <div 
                  key={group.year}
                  className={`relative transform transition-all duration-500 ease-out ${
                    timelineAnimation.isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-6'
                  }`}
                  style={{ transitionDelay: `${groupIndex * 0.15}s` }}
                >
                  <div className="absolute -left-[32px] md:-left-[42px] top-0 flex items-center gap-2 mb-4"> {/* Добавлен mb-4 */}
                    <div className={`w-3 h-3 md:w-4 md:h-4 bg-club-accent rounded-full transform translate-x-[7px] md:translate-x-[9px] z-10 transition-all duration-300 ${
                      timelineAnimation.isVisible ? 'scale-100' : 'scale-0'
                    }`} />
                    <h4 className="text-lg md:text-xl font-semibold text-club-primary bg-[#F3F4F6] pr-2 ml-1">
                      {group.year}
                    </h4>
                  </div>

                  {/* Geändert pt-6 md:pt-8 на pt-10 md:pt-12 */}
                  <div className="pt-10 md:pt-12 pl-2 md:pl-4 space-y-3 md:space-y-4">
                    {group.events.map((event, eventIndex) => (
                      <div 
                        key={eventIndex} 
                        className={`flex gap-2 md:gap-3 transform transition-all duration-500 ease-out ${
                          timelineAnimation.isVisible 
                            ? 'opacity-100 translate-x-0' 
                            : 'opacity-0 -translate-x-6'
                        }`}
                        style={{ transitionDelay: `${groupIndex * 0.15 + eventIndex * 0.1}s` }}
                      >
                        {event.date && (
                          <div className="w-16 md:w-20 shrink-0 text-xs md:text-sm text-club-accent font-medium">
                            {event.date}
                          </div>
                        )}
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base break-words hyphens-auto">
                          {event.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div 
              ref={timelineEndRef}
              className="relative flex items-center gap-2 mt-6 hover:cursor-pointer"
              onClick={scrollToHistoryStart}
              style={{
                left: "10px",
                marginLeft: "4px",
                width: "calc(100% - 19px)"
              }}
            >
              <span className="text-dark font-medium bg-[#F3F4F6] py-6 hover:underline hover:text-club-accent">
                zum aktuellsten Eintrag
              </span>
              <ScrollButton 
                icon={<ArrowBigUp className="w-5 h-5" />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
