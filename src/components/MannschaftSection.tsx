import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const teams = [
  {
    id: 1,
    name: "Mannschaft1 BSV-Ergebnisdienst",
    league: "Hochrhein Bezirksklasse",
    image: "nicht eingegeben",
  },
  {
    id: 2,
    name: "nicht eingegeben",
    league: "nicht eingegeben",
    image: "nicht eingegeben",
  },
  {
    id: 3,
    name: "nicht eingegeben",
    league: "nicht eingegeben",
    image: "nicht eingegeben",
  },
];

const MannschaftSection = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Предотвращаем бесконечный цикл при ошибке загрузки fallback
    target.src = "/imgs/image-off.svg";
    target.classList.remove("object-cover", "w-full", "h-full");
    target.classList.add("opacity-50", "w-10", "h-10");
  };

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
            <div className="h-48 flex items-center justify-center hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img 
                src={team.image}
                alt={team.name}
                className="object-cover w-full h-full"
                onError={handleImageError}
              />
            </div>
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
