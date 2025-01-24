import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";

const tournaments = [
  {
    id: 1,
    name: "Sommerturnier 2024",
    date: "15. Juli 2024",
    location: "Schachclub Laufenburg",
    participants: "16 Teams",
  },
  {
    id: 2,
    name: "Jugendcup",
    date: "20. August 2024",
    location: "Schachclub Laufenburg",
    participants: "24 Teams",
  },
  {
    id: 3,
    name: "Herbstmeisterschaft",
    date: "10. September 2024",
    location: "Schachclub Laufenburg",
    participants: "12 Teams",
  },
];

const TournamentSection = () => {
  return (
    <section id="tournaments" className="py-16 bg-club-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-club-primary">
          Kommende Turniere
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((tournament) => (
            <Card
              key={tournament.id}
              className="hover-scale card-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{tournament.name}</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-3">
                    <Calendar size={20} />
                    <span>{tournament.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={20} />
                    <span>{tournament.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users size={20} />
                    <span>{tournament.participants}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TournamentSection;