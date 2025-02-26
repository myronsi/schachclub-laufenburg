import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ImageOff } from "lucide-react";
import { useState } from "react";
import { teams} from "./arrays/mannschaftenList";

const MannschaftSection = () => {
  const { elementRef } = useScrollAnimation();
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

  const handleImageError = (teamId: number) => {
    setImageErrors(prev => ({...prev, [teamId]: true}));
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
        {teams.map((team) => (
          <Card key={team.id} className="overflow-hidden">
            <a href={team.url}
              target="_blank"
              className="underline hover:text-club-accent hover:underline"
            >
            <div className="h-48 flex items-center justify-center hover:scale-105 transition-transform duration-300 overflow-hidden">
              {imageErrors[team.id] || team.image === "nicht eingegeben" ? (
                <div className="flex items-center justify-center w-full h-full bg-gray-100">
                  <ImageOff className="w-10 h-10 opacity-50 text-gray-400" />
                </div>
              ) : (
                <img 
                  src={team.image}
                  alt={team.name}
                  className="object-cover w-full h-full"
                  onError={() => handleImageError(team.id)}
                />
              )}
            </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
                <p className="text-gray-600">{team.league}</p>
              </div>
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MannschaftSection;