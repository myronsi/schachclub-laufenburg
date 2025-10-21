import { Euro, Users, MapPin, Clock, Phone, Mail, Calendar, BookOpen, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useState, useEffect } from "react";
import type { CalendarEvent } from "@/types/calendarTypes";
import { Link } from "react-router-dom";
import FastInfo from "@/components/about/FastInfo";
const REMOTE_CALENDAR_URL = "/calendar-proxy.php";

function isCalendarEvent(obj: any): obj is CalendarEvent {
  return obj && typeof obj.title === 'string' && typeof obj.date === 'string' && ['tournament','meeting','training','special'].includes(obj.type);
}

const UpcomingEvents = () => {
  const [items, setItems] = useState<CalendarEvent[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const url = `${REMOTE_CALENDAR_URL}?_=${Date.now()}`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Invalid JSON');
        const validated = (data as any[]).filter(isCalendarEvent) as CalendarEvent[];
        const today = new Date();
        const upcoming = validated
          .map(e => ({...e, _d: new Date(e.date)}))
          .filter(e => e._d >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
          .sort((a,b) => a._d.getTime() - b._d.getTime())
          .slice(0,2)
          .map(e => ({ title: e.title, date: e.date, time: e.time, location: e.location, description: e.description, type: e.type }));
        if (!cancelled) setItems(upcoming.length ? upcoming : null);
      } catch (e: any) {
        if (!cancelled) setErr(String(e?.message || e));
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const fallbackMessage = 'Aktuell liegen uns keine Termine vor — das Problem wird bald behoben.';

  return (
    <>
      {items && items.length > 0 ? (
        <ul className="text-sm text-gray-700 space-y-2">
          {items.map((ev, i) => (
            <li key={i}><strong>{new Date(ev.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}:</strong> {ev.title} {ev.description ? `— ${ev.description}` : ''}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-700">{fallbackMessage}</p>
      )}
      <div className="mt-4">
        <Link to="/kalender" className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded bg-club-accent hover:bg-club-dark text-white w-max">Alle Termine & Turniere</Link>
      </div>
    </>
  );
};

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
                  <Link to="/spiellokal" rel="noopener noreferrer" className="text-sm underline text-club-primary hover:text-club-accent">
                    Mehr erfahren
                  </Link>
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
                <Link to="/kontakt" className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded bg-club-accent hover:bg-club-dark text-white w-max">
                  <Mail className="w-4 h-4" /> Kontaktieren
                </Link>
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
              <UpcomingEvents />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="text-club-accent" /> Jugend & Training
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  Unsere Jugendabteilung bietet regelmäßiges Training, Turnierbeteiligung und Spaß für Kinder und Jugendliche. Anfänger sind jederzeit willkommen.
                </p>
                <p className="text-xs text-gray-500">Weitere Informationen zu Terminen, Trainern und Programmen findest du auf der Jugendseite.</p>
                <div className="mt-3">
                  <Link to="/jugend" className="text-sm underline text-club-primary hover:text-club-accent">
                   Zur Jugendseite
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="text-club-accent" /> Mitgliederbereich
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 space-y-2">
                Geschützter Bereich für Mitglieder: Termine, Protokolle und exklusive Informationen. Bitte melde dich an, um Zugriff zu erhalten.
              </p>
              <div className="mt-4">
                <Link to="/login" className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded bg-club-accent hover:bg-club-dark text-white w-max">Zum Mitgliederbereich</Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-3xl font-semibold py-20 text-center text-club-secondary">Schnellinfo</h3>


        <FastInfo />
      </div>
    </section>
  );
};

export default AboutSection;