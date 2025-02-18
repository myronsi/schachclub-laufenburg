import { Info, Users, Euro, ScrollText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const boardAnimation = useScrollAnimation();
  const timelineAnimation = useScrollAnimation({
    threshold: 0.05,
    rootMargin: "50px"
  });
  const feesAnimation = useScrollAnimation();
  const documentsAnimation = useScrollAnimation();
  const historyAnimation = useScrollAnimation();

  const timeline = [
    // Timeline data remains unchanged
  ];

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-club-primary mb-12 text-center">
          Über den Verein
        </h2>

        <Card 
          ref={boardAnimation.elementRef}
          className={`mb-12 opacity-0 ${boardAnimation.isVisible ? 'animate-slideInLeft' : ''}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="text-club-accent" />
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
                  href="docs/aufnahme_verband.pdf" 
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
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-club-primary">
            Unsere Geschichte
          </h3>
          <div className="relative ml-12">
            <div 
              className="absolute left-[19px] top-4 bottom-0 w-[2px] bg-club-accent"
              style={{ height: "calc(100% - 1rem)" }}
            />

            <div className="space-y-8 relative pl-8">
              {timeline.map((group, groupIndex) => (
                <div 
                  key={group.year}
                  className={`relative opacity-0 transition-all duration-500 ease-out ${
                    timelineAnimation.isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'translate-x-[-20px]'
                  }`}
                  style={{ 
                    transitionDelay: `${groupIndex * 0.1}s`,
                  }}
                >
                  <div className="absolute -left-[42px] top-0 flex items-center gap-3">
                    <div className="w-4 h-4 bg-club-accent rounded-full transform translate-x-[9px] z-10" />
                    <h4 className="text-xl font-semibold text-club-primary bg-background pr-2">
                      {group.year}
                    </h4>
                  </div>

                  <div className="pt-8 pl-4 space-y-4">
                    {group.events.map((event, eventIndex) => (
                      <div 
                        key={eventIndex} 
                        className={`flex gap-3 opacity-0 transition-all duration-500 ease-out ${
                          timelineAnimation.isVisible 
                            ? 'opacity-100 translate-x-0' 
                            : 'translate-x-[-20px]'
                        }`}
                        style={{ 
                          transitionDelay: `${groupIndex * 0.1 + eventIndex * 0.05}s`,
                        }}
                      >
                        {event.date && (
                          <div className="w-20 shrink-0 text-sm text-club-accent font-medium">
                            {event.date}
                          </div>
                        )}
                        <p className="text-gray-600 leading-relaxed">
                          {event.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
