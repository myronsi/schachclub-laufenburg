
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const teams = [
  {
    id: 1,
    name: "Mannschaft1 BSV-Ergebnisdienst",
    league: "Hochrhein Bezirksklasse",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
  {
    id: 2,
    name: "2. Mannschaft",
    league: "Bezirksliga",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    id: 3,
    name: "U19",
    league: "Jugend-Regionalliga",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  },
];

const MannschaftSection = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section id="teams" className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-club-primary">
        Unsere Mannschaften
      </h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Aktuell</h3>
        <p className="mb-2">
          <a 
            href="https://bsv-ergebnisdienst.de/index.php?p1=0:pa:BK9-24-4" 
            target="_blank"
            className="underline hover:text-club-accent hover:underline"
          >
            Bezirksklasse Hochrhein
          </a>
        </p>
        <p className="mb-4">
          In diesem Jahr spielen wir nicht ganz um den<br />
          Aufstieg in die{"  "}
          <a 
            href="https://bsv-ergebnisdienst.de/index.php?saison=24&totyp=0" 
            target="_blank"
            className="underline hover:text-club-accent hover:underline"
          >
            Bereichsliga Süd Staffel 3
          </a>
        </p>
        <p>
          <a 
            href="https://bsv-ergebnisdienst.de/index.php?p1=0:kt:BK9-24-4" 
            target="_blank"
            className="underline hover:text-club-accent hover:underline"
          >
            Mannschaft1 BSV-Ergebnisdienst - Hochrhein Bezirksklasse
          </a>
        </p>
      </div>

      <div 
        ref={elementRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {teams.map((team, index) => (
          <Card
            key={team.id}
            className={`overflow-hidden opacity-0 ${
              isVisible ? 'animate-slideInRight' : ''
            }`}
            style={{
              animationDelay: isVisible ? `${index * 0.2}s` : '0s',
            }}
          >
            <div
              className="h-48 bg-cover bg-center hover:scale-105 transition-transform duration-300"
              style={{ backgroundImage: `url(${team.image})` }}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
              <p className="text-gray-600">{team.league}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MannschaftSection;
