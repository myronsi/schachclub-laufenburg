import { Info, Users, Euro, ScrollText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const boardAnimation = useScrollAnimation();
  const timelineAnimation = useScrollAnimation({
    threshold: 0.01,
    rootMargin: "100px"
  });
  const feesAnimation = useScrollAnimation();
  const documentsAnimation = useScrollAnimation();

  const timeline = [
    {
      year: "2025",
      events: [
        { date: "Januar", text: "Homepage - erneute Pflege" },
        { date: "Januar", text: "Archiv mit Bildergeschichten aufgearbeitet" },
        { date: "Januar", text: "Fehlerbeseitigung" }
      ]
    },
    {
      year: "2023",
      events: [
        { date: "Januar", text: "Homepage - Wiederaufnahme der Pflege" },
        { date: "Januar", text: "Lücken und Verweise aktualisiert" },
        { date: "Januar", text: "Fehlerbeseitigung" }
      ]
    },
    {
      year: "2016",
      events: [
        { date: "07.06", text: "Neue Homepage im modernen Design, betreut von Jens Werther und Jochen Bahner" }
      ]
    },
    {
      year: "2015",
      events: [
        { 
          date: "09.10–11.10", 
          text: "3. Laufenburger Open: Gregor Haag (A-Open) und Sabrina Schlüter (B-Open) siegen" 
        },
        { 
          date: "03.10–05.10", 
          text: "2. Laufenburger Open mit 29 Teilnehmern. Sieger: Gregor Haag (A-Open) und Markus Haag (B-Open)" 
        }
      ]
    },
    {
      year: "2014",
      events: [
        { date: "13.04", text: "Abstieg in die Bezirksliga nach knapper 3,5:4,5-Niederlage" }
      ]
    },
    {
      year: "2013",
      events: [
        { date: "04.10–06.10", text: "Erstes Laufenburger Open: IM Ali Habibi (A-Open) und Werner Hilpert (B-Open) gewinnen" },
        { date: "23.07", text: "Benno Moser wird 1. Vorsitzender, Jochen Bahner 2. Vorsitzender" },
        { date: "05.05", text: "Klassenerhalt in der Bereichsliga durch 5:3-Sieg in der Relegation" }
      ]
    },
    {
      year: "2012",
      events: [
        { date: "12.12", text: "Stefan Frommherz gewinnt ersten Roland-Bahner-Pokal" },
        { date: "24.07", text: "Sommerpokal wird zu Ehren von Roland Bahner umbenannt" },
        { date: "12.06", text: "Tod von Roland Bahner. Sohn Jochen übernimmt seine Ämter" },
        { date: "19.05", text: "Jugendgrandprix-Turnier in Laufenburg mit 23 Teilnehmern" }
      ]
    },
    {
      year: "2011",
      events: [
        { date: "06.12", text: "Nikolausblitzturnier-Rekord: 13 Spieler. Sieger Tobias Oelschlegel" },
        { date: "03.12", text: "3. Jugendgrandprix-Turnier mit 30 Teilnehmern" },
        { date: "24.08", text: "Jochen Bahner wird Vereinsmeister" },
        { date: "17.04", text: "Abstieg in die Bezirksklasse" },
        { date: "Feb.–Aug.", text: "Ausweichquartier in der Sportgaststätte SV08 Laufenburg" }
      ]
    },
    {
      year: "2010",
      events: [
        { date: "14.12", text: "Nikolausblitzturnier: 13 Teilnehmer. Sieger Tobias Oelschlegel" },
        { date: "04.12", text: "Jugendgrandprix-Turnier mit 49 Teilnehmern" },
        { date: "21.11", text: "Problematische Auswärtsfahrt nach Endingen" },
        { date: "10.11", text: "5 Jugendbezirksmeistertitel für Laufenburger Nachwuchs" },
        { date: "21.05", text: "Aufstieg in die Bereichsliga Freiburg/Hochrhein" },
        { date: "20.03", text: "Erfolge bei Lörracher Stadtjugendmeisterschaft" }
      ]
    },
    {
      year: "2009",
      events: [
        { date: "08.12", text: "40-Jahr-Jubiläum: Nikolausblitzturnier mit Fritz Meyer" },
        { date: "05.12", text: "Erstes Jugendgrandprix-Turnier in Laufenburg" },
        { date: "08.11", text: "Simultan mit GM Viktor Kortschnoi (23 Bretter)" },
        { date: "08.08", text: "Tag der offenen Tür mit IM Ali Habibi" },
        { date: "03.02", text: "Josef Jurgetz verabschiedet sich in den Ruhestand" },
        { date: "02.01–06.01", text: "Daniel und Jochen Bahner bei Badischen Jugendeinzelmeisterschaften" }
      ]
    },
    {
      year: "2008",
      events: [
        { date: "09.12", text: "Nikolausblitzturnier mit 12 Spielern" },
        { date: "15.11", text: "Jochen und Daniel Bahner gewinnen Bezirksjugendmeisterschaften" },
        { date: "04.10", text: "Schnuppertraining für Kinder gestartet" },
        { date: "21.09", text: "Schachcamp am Thuner See mit IM Ali Habibi" },
        { date: "31.07", text: "LaKiSo-Angebot mit 13 Teilnehmern" },
        { date: "22.07", text: "Satzungsänderung und Jugendvereinsmeisterschaften" },
        { date: "01.03", text: "Rückkehr in die Gärtnerklause" },
        { date: "23.02", text: "Erfolge beim Jugendmannschaftsturnier in Waldshut" },
        { date: "04.01–06.01", text: "Daniel Bahner bei Badischen U12-Meisterschaften" }
      ]
    },
    {
      year: "2007",
      events: [
        { date: "09.12", text: "3 Pokale beim Jugendgrandprix" },
        { date: "31.10", text: "Brunchfahrt mit Bernhard Bürgin" },
        { date: "12.06", text: "Thomas Schmidt wird Vereinsmeister" },
        { date: "03.03", text: "2. Platz bei Jugendmannschaftsmeisterschaft" }
      ]
    },
    {
      year: "2006",
      events: [
        { date: "August", text: "Erstes LaKiSo-Schachtraining" }
      ]
    },
    {
      year: "2005",
      events: [
        { date: "10.12", text: "Wiederbelebung der Jugendabteilung mit 7 Jugendlichen" },
        { date: "03.12", text: "Jochen Bahner 2. beim Wiesental-Jugendturnier" },
        { date: "26.11", text: "Erste Teilnahme an Bezirksjugendmeisterschaft" },
        { date: "24.07", text: "Tod von Ehrenmitglied Joseph Hauser (98)" },
        { date: "17.04", text: "Aufstieg in die Bereichsliga" }
      ]
    },
    {
      year: "2004",
      events: [
        { date: "07.12", text: "2. Nikolausblitzturnier erfolgreich" },
        { date: "02.05", text: "Knapp verpasster Aufstieg gegen Todtnau-Schönau" },
        { date: "04.04", text: "Neue Bundesliga-Garnituren eingeweiht" }
      ]
    },
    {
      year: "2003",
      events: [
        { date: "09.12", text: "Erstes Nikolausblitzturnier mit 10 Teilnehmern" },
        { date: "Juli", text: "Sommerpokal-Turnier mit neuem Wanderpokal" },
        { date: "28.06", text: "Frühschoppen mit Blitzturnier" },
        { date: "21.05", text: "„Schach im Freibad“-Aktion" }
      ]
    },
    {
      year: "2002",
      events: [
        { date: "20.12", text: "Tod von Franz Baumgartner" },
        { date: "23.07", text: "Jahreshauptversammlung" },
        { date: "20.07", text: "Tag der offenen Tür mit Blitzturnier" },
        { date: "Mai", text: "4. Platz in der Bezirksliga; Pokalerfolg gegen Engen" }
      ]
    },
    {
      year: "2001",
      events: [
        { date: "Juli", text: "Tod von Josef Ebner" },
        { date: "23.06", text: "Schachbeteiligung am Schulfest" }
      ]
    },
    {
      year: "2000",
      events: [
        { date: "Juli", text: "Homepage online" },
        { date: "21.03", text: "Sommerpokalverleihung mit Imbiss" },
        { date: "06.02", text: "Tod von Willi Watzek" }
      ]
    },
    {
      year: "1999",
      events: [
        { date: "", text: "Jugendförderung durch Siegfried Korb und Elmar Kohlhöfer" }
      ]
    },
    {
      year: "1997",
      events: [
        { date: "21.08", text: "Eintragung ins Vereinsregister als „SC Laufenburg e.V.“" },
        { date: "27.01", text: "Tod von Herbert Müller" }
      ]
    },
    {
      year: "1994",
      events: [
        { date: "25.06", text: "Siegfried Korb wird Ehrenmitglied" },
        { date: "Juni", text: "25-Jahr-Feier mit GM Charles Partos" }
      ]
    },
    {
      year: "1988",
      events: [
        { date: "02.10", text: "Erfolge beim Hochrhein-Schachturnier" }
      ]
    },
    {
      year: "1987",
      events: [
        { date: "", text: "Josef Hauser wird Ehrenmitglied" }
      ]
    },
    {
      year: "1986",
      events: [
        { date: "06.09", text: "Simultan mit GM Viktor Kortschnoi" },
        { date: "20.04", text: "Tod von Dr. Gustav Brachtl" }
      ]
    },
    {
      year: "1984",
      events: [
        { date: "", text: "Willi Watzek zieht ins Allgäu" },
        { date: "29.06", text: "15-Jahr-Feier; Ehrung von Dr. Brachtl" }
      ]
    },
    {
      year: "1982",
      events: [
        { date: "Aug.", text: "Freilandschach am Rheinuferweg" }
      ]
    },
    {
      year: "1981",
      events: [
        { date: "04.02", text: "Eigene Vereinssatzung" }
      ]
    },
    {
      year: "1979",
      events: [
        { date: "Sept.", text: "Umzug in die Gärtnerklause; 10-Jahr-Feier" },
        { date: "", text: "Verlust von Spielern durch Wiedergründung SC Säckingen" }
      ]
    },
    {
      year: "1972–79",
      events: [
        { date: "", text: "Erfolge in Landesliga; Jugendturniere" }
      ]
    },
    {
      year: "1972",
      events: [
        { date: "30.07", text: "Simultan mit GM Friedrich Sämisch" },
        { date: "24.02", text: "Gründung Schach-AG an Hebelschule" }
      ]
    },
    {
      year: "1971",
      events: [
        { date: "", text: "Beitritt zum Badischen Schachverband" },
        { date: "08.08", text: "Freilandschach im „Salmen“-Garten" },
        { date: "10.03", text: "Verselbstständigung vom SC 08" }
      ]
    },
    {
      year: "1970–71",
      events: [
        { date: "", text: "Erste Stadtmeisterschaft: Dr. Brachtl siegt" }
      ]
    },
    {
      year: "1970",
      events: [
        { date: "", text: "Umzug in den „Salmen“" }
      ]
    },
    {
      year: "1969",
      events: [
        { date: "01.10", text: "Regelmäßiger Spielbetrieb im „Lerchenstüble“" },
        { date: "23.09", text: "Gründung als Abteilung des SV 08 Laufenburg" }
      ]
    }
  ];

  return (
    <section id="about" className="py-8 md:py-16">
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
        <div 
          ref={timelineAnimation.elementRef}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-2xl font-semibold mb-4 md:mb-6 text-club-primary px-2 md:px-0">
            Unsere Geschichte
          </h2>
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

                  {/* Изменено pt-6 md:pt-8 на pt-10 md:pt-12 */}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
