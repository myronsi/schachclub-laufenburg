
import { Info, Users, Euro, ScrollText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const boardAnimation = useScrollAnimation();
  const timelineAnimation = useScrollAnimation();
  const feesAnimation = useScrollAnimation();
  const documentsAnimation = useScrollAnimation();
  const historyAnimation = useScrollAnimation();

  const timeline = [
    { year: "1950", event: "Gründung des Schachclubs Laufenburg" },
    { year: "1975", event: "Erster Aufstieg in die Bezirksliga" },
    { year: "2000", event: "50-jähriges Jubiläum" },
    { year: "2023", event: "Neugestaltung des Vereinsheims" },
    { year: "2023", event: "Neugestaltung des Vereinsheims" },
    // ToDo ..... VIELE INHALTLICHE LÜCKEN nachtragen .. //
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
                  href="https://example.com" 
                  className="hover:text-club-accent hover:underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Satzung des Schachclubs Laufenburg e.V.
                </a>
              </li>
              <li>
                <a 
                  href="https://example.com" 
                  className="hover:text-club-accent hover:underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Aufnahmeantrag Schachclub Laufenburg e.V.
                </a>
              </li>
              <li>
                <a 
                  href="https://example.com" 
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
        <div className="mb-12" ref={timelineAnimation.elementRef}>
          <h3 className="text-2xl font-semibold mb-6 text-club-primary">
            Unsere Geschichte
          </h3>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`flex items-start gap-4 opacity-0 ${
                  timelineAnimation.isVisible
                    ? 'animate-slideInRight'
                    : ''
                }`}
                style={{
                  animationDelay: timelineAnimation.isVisible ? `${index * 0.2}s` : '0s',
                }}
              >
                <div className="bg-club-accent text-white px-3 py-1 rounded">
                  {item.year}
                </div>
                <p className="flex-1 pt-1">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
