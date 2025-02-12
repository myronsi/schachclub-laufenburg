
import { Info, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const boardAnimation = useScrollAnimation();
  const feesAnimation = useScrollAnimation();
  const documentsAnimation = useScrollAnimation();
  const historyAnimation = useScrollAnimation();

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
            <CardTitle>Mitgliedsbeiträge (pro Jahr)</CardTitle>
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
            <CardTitle>Wichtige Dokumente</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>(Satzung des Schachclubs Laufenburg e.V.)</li>
              <li>Aufnahmeantrag Schachclub Laufenburg e.V.</li>
              <li>Mitglieder-Anmeldung Badischer Schachverband e.V.</li>
            </ul>
          </CardContent>
        </Card>

        <div ref={historyAnimation.elementRef}>
          <h3 className="text-2xl font-semibold mb-6 text-club-primary">
            Geschichte
          </h3>
          <div className="space-y-4">
            <div className={`opacity-0 ${historyAnimation.isVisible ? 'animate-slideInRight' : ''}`}>
              <p className="font-semibold">Januar 2025: Homepage - erneute Pflege</p>
              <ul className="list-disc pl-5">
                <li>Aufarbeiten des verschollenen Archivs mit vielen Bildergeschichten</li>
                <li>Beseitigen von Fehlern</li>
              </ul>
            </div>
            
            <div className={`opacity-0 ${historyAnimation.isVisible ? 'animate-slideInRight' : ''}`}>
              <p className="font-semibold">Januar 2023: Homepage - Wiederaufnahme der Pflege</p>
              <ul className="list-disc pl-5">
                <li>Aufarbeiten vieler Lücken und Verweise</li>
                <li>Beseitigen von Fehlern</li>
              </ul>
            </div>

            <div className={`opacity-0 ${historyAnimation.isVisible ? 'animate-slideInRight' : ''}`}>
              <p className="font-semibold">ToDo</p>
              <p>..... VIELE INHALTLICHE LÜCKEN nachtragen .. Bitte um Zuarbeit</p>
            </div>

            <div className={`opacity-0 ${historyAnimation.isVisible ? 'animate-slideInRight' : ''}`}>
              <p className="font-semibold">07.06.2016</p>
              <p>Dank Jens Werther geht unsere alte Schach-Homepage in Rente. Unsere Homepage im neuen Design wird in Zukunft von ihm, sowie Jochen Bahner betreut.</p>
            </div>

            {/* Hier folgt der Rest der Geschichte chronologisch geordnet... */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
