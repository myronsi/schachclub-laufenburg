
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef } from "react";
import { Mail, Heart, BookOpen, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const MitgliedwerdenSection = () => {
  const introAnim = useScrollAnimation();
  const stepsAnim = useScrollAnimation();

  return (
    <section id="mitgliedwerden" className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <header className="text-center mb-10" ref={introAnim.elementRef}>
          <h2 className="text-3xl font-bold text-club-primary">Mitglied werden</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Schön, dass du Interesse an einer Mitgliedschaft hast. Hier stehen alle
            Informationen zum Ablauf, den Beiträgen und dem Aufnahmeantrag.
          </p>
        </header>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 ${stepsAnim.isVisible ? "animate-slideInUp" : "opacity-0"}`} ref={stepsAnim.elementRef}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="text-club-accent" /> Warum Mitglied?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                Als Mitglied unterstützt du den Verein und profitierst von regelmäßigen Spielabenden, Trainings und Vereinsaktivitäten.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="text-club-accent" /> Ablauf
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
                <li>Kontakt aufnehmen (E-Mail oder Spielabend).</li>
                <li>Probetag (kostenlos).</li>
                <li>Aufnahmeantrag ausfüllen — Vorstand entscheidet kurzfristig.</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="text-club-accent" /> Probetag
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-3">
                Du kannst dienstags zu einer für dich passenden Zeit zwischen <strong>17:00</strong> und <strong>19:00</strong> Uhr vorbeikommen.
              </p>
              <p className="text-sm text-gray-700 space-y-2">
                <Link to="/kontakt" className="text-club-primary hover:text-club-accent">Kontaktformular</Link>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="text-club-accent" /> Aufnahmeantrag
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <a href="/docs/aufnahmeantrag.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded bg-club-accent hover:bg-club-dark text-white w-max">
                  Aufnahmeantrag (PDF)
                </a>
                <Link to="/kontakt" className="text-sm underline text-club-primary hover:text-club-accent">Kontakt & Fragen</Link>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
};

export default MitgliedwerdenSection;
