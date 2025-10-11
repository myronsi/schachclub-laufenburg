import { Link } from "react-router-dom";
import { Trophy, Award, Zap, CalendarDays, Users } from "lucide-react";

const TournamentSection = () => {
  const tournaments = [
    {
      key: "vereinsmeister",
      title: "Vereinsmeister",
      subtitle: "Der Kampf um den Club-Titel",
      icon: Trophy,
      to: "/turniere/vereinsmeister",
      when: "jährlich • Frühjahr",
      description:
        "Traditionelles Meisterschaftsturnier der Mitglieder — lange Partien, spannende Spitzenpaarungen und der Kampf um die Krone des Vereins.",
    },
    // {
    //   key: "pokalsieger",
    //   title: "Pokalsieger",
    //   subtitle: "K.-o.-Modus • Action",
    //   icon: Award,
    //   to: "/turniere/pokalsieger",
    //   when: "Saison • einmalig",
    //   description:
    //     "Schnelle Entscheidungen im KO-Modus: Überraschungssieger, spannende Duelle und packende Endspiele.",
    // },
    {
      key: "nikolausblitz",
      title: "Nikolausblitz",
      subtitle: "Blitzturnier mit Flair",
      icon: Zap,
      to: "/turniere/nikolausblitz",
      when: "Dezember • Abend",
      description:
        "Vorweihnachtliches Blitzturnier: Kurze Bedenkzeiten, viel Tempo und eine große Portion Spaß für alle Teilnehmer.",
    },
    {
      key: "blitzsieger",
      title: "Blitzsieger",
      subtitle: "Schnelligkeit entscheidet",
      icon: CalendarDays,
      to: "/turniere/blitzsieger",
      when: "regelmäßig • Rangliste",
      description:
        "Regelmäßige Blitz-Events und Ranglisten: wer sammelt die meisten Siege und wird zum Blitzsieger?",
    },
  ];

  return (
    <section id="tournaments" className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h2 className="text-3xl font-bold text-club-primary mb-6 text-center">
            Turniere &amp; Sieger
          </h2>
          <p className="max-w-2xl mx-auto text-center text-gray-600 mb-8">
            Von klassischen Vereinsmeisterschaften bis zu schnellen Blitz-Events — Termine, Ergebnisse und Highlights unserer Turniere.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-6">
          {tournaments.map((t) => {
            const Icon = t.icon;
            return (
              <article
                key={t.key}
                className="w-full sm:w-80 flex-none bg-white rounded-lg shadow-sm p-5 flex flex-col hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                aria-labelledby={`t-${t.key}-title`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-club-primary/10 text-club-primary shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <h3 id={`t-${t.key}-title`} className="text-lg font-semibold">{t.title}</h3>
                    <p className="text-sm text-gray-500">{t.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-4 flex-1">{t.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{t.when}</span>
                  </div>

                  <Link
                    to={t.to}
                    className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded bg-club-accent text-white hover:bg-club-dark transition-colors"
                    aria-label={`Mehr zu ${t.title}`}
                  >
                    Details
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* <div className="text-center mt-8">
          <Link to="/turniere" className="text-sm underline text-club-primary hover:text-club-accent">
            Alle Turniere anzeigen
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default TournamentSection;