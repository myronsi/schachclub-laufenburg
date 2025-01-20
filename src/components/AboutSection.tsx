import { Info, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutSection = () => {
  const timeline = [
    { year: "1950", event: "Gründung des Schachclubs Laufenburg" },
    { year: "1975", event: "Erster Aufstieg in die Bezirksliga" },
    { year: "2000", event: "50-jähriges Jubiläum" },
    { year: "2023", event: "Neugestaltung des Vereinsheims" },
  ];

  const sponsors = [
    { name: "Sparkasse Hochrhein", url: "https://www.sparkasse-hochrhein.de" },
    { name: "Stadt Laufenburg", url: "https://www.laufenburg.de" },
  ];

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-club-primary mb-12 text-center opacity-0 animate-fadeIn">
          Über den Verein
        </h2>

        {/* Mission Statement */}
        <Card className="mb-12 opacity-0 animate-slideInLeft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="text-club-accent" />
              Unsere Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Der Schachclub Laufenburg e.V. fördert seit über 70 Jahren die
              Schachkultur in der Region. Wir bieten einen Ort für
              Schachbegeisterte jeden Alters, um ihre Fähigkeiten zu entwickeln
              und ihre Leidenschaft für das königliche Spiel zu teilen.
            </p>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-club-primary opacity-0 animate-slideInRight">
            Unsere Geschichte
          </h3>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className="flex items-start gap-4 opacity-0"
                style={{
                  animation: `slideInRight 0.5s ease-out ${index * 0.2}s forwards`,
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

        {/* Sponsors */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-club-primary flex items-center gap-2 opacity-0 animate-slideInLeft">
            <Users className="text-club-accent" />
            Partner & Sponsoren
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sponsors.map((sponsor, index) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0"
                style={{
                  animation: `scaleIn 0.5s ease-out ${index * 0.2}s forwards`,
                }}
              >
                <Card className="hover-scale card-shadow">
                  <CardContent className="flex items-center justify-center h-32">
                    <h4 className="text-xl font-semibold text-club-primary">
                      {sponsor.name}
                    </h4>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;