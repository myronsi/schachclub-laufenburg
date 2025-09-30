import { Info, Euro, Users, MapPin, Clock, Phone, Mail, Calendar, BookOpen, Heart, Flag, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef } from "react";
import { Link } from "react-router-dom";
import FastInfo from "@/components/about/FastInfo";

const AboutSection = () => {
  const venueAnim = useScrollAnimation();
  const boardAnim = useScrollAnimation();
  const feesAnim = useScrollAnimation();

  const historySectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h2 className="text-3xl font-bold text-club-primary">Über den Verein</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Schach verbindet — generationenübergreifend, kompetitiv und freundlich. Wir sind ein lebendiger Verein mit Angeboten für Einsteiger bis Leistungsspieler.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card
            ref={venueAnim.elementRef}
            className={`opacity-0 ${boardAnim.isVisible ? "animate-slideInUp delay-100" : ""}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="text-club-accent" /> Spiellokal & Zeiten
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-700 space-y-2">
                <div>
                  Feuerwehrhaus Hochsal<br />
                  Bertastraße 6, Obergeschoss<br />
                  79725 Laufenburg-Hochsal (Baden)
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <div><strong>Spielabend:</strong> Dienstags, 18:30 Uhr</div>
                    <div className="text-xs text-gray-500">Jugendtraining: Dienstags, 17:00 Uhr</div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <a href="https://maps.app.goo.gl/puPFehZ1gS2ny2Kn8" target="_blank" rel="noopener noreferrer" className="text-sm underline text-club-primary hover:text-club-accent">Anfahrt</a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            ref={boardAnim.elementRef}
            className={`opacity-0 ${boardAnim.isVisible ? "animate-slideInUp delay-100" : ""}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="text-club-accent" /> Der Vorstand & Kontakt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>1. Vorstand:</strong> Benno Moser</li>
                <li><strong>2. Vorstand:</strong> Jochen Bahner</li>
                <li><strong>Schatzmeister:</strong> Daniel Bahner</li>
              </ul>

              <div className="mt-4 flex flex-col gap-2">
                <a href="mailto:1.Vorsitzender@sc-laufenburg.de" className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded bg-club-accent hover:bg-club-dark text-white w-max">
                  <Mail className="w-4 h-4" /> E-Mail schreiben
                </a>
              </div>
            </CardContent>
          </Card>

          <Card
            ref={feesAnim.elementRef}
            className={`opacity-0 ${feesAnim.isVisible ? "animate-slideInUp delay-100" : ""}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Euro className="text-club-accent" /> Mitgliedsbeiträge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-700 space-y-2">
                <div><strong>Erwachsene (aktiv):</strong> 40,00 € / Jahr</div>
                <div><strong>Passive Mitglieder:</strong> 20,00 € / Jahr</div>
                <div><strong>Jugendliche:</strong> 20,00 € / Jahr</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className={`opacity-0 ${feesAnim.isVisible ? "animate-slideInUp delay-100" : ""} grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8`}>
          <Card >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="text-club-accent" /> Was kommt als Nächstes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>DWZ Grand-Prix:</strong> 22.11.2025 — DWZ bekommen oder verbessern</li>
                <li><strong>Nikolausblitz:</strong> Dezember — genauer Termin folgt</li>
              </ul>
              <div className="mt-4">
                <Link to="/turniere" className="text-sm underline text-club-primary hover:text-club-accent">Alle Termine & Turniere</Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="text-club-accent" /> Kurze Chronik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  Gegründet 1969, gewachsen durch ehrenamtliches Engagement. Highlights: Aufbau der Jugendabteilung, zahlreiche lokale Turniere und freundschaftliche Begegnungen mit Vereinen der Region.
                </p>
                <p className="text-xs text-gray-500">Für die vollständige Chronik besuche unsere Chronik-Seite.</p>
                <div className="mt-3">
                  <Link to="/archiv/chronik" className="text-sm underline text-club-primary hover:text-club-accent">
                   Zur Chronik
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="text-club-accent" /> Mitglied werden
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 space-y-2">
                Als Mitglied unterstützt du den Verein und profitierst von regelmäßigen Spielabenden, Trainings und Vereinsaktivitäten.
              </p>
              <div className="mt-4">
                <Link to="/mitgliedwerden" className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded bg-club-accent hover:bg-club-dark text-white w-max">Jetzt Mitglied werden</Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <FastInfo />
      </div>
    </section>
  );
};

export default AboutSection;