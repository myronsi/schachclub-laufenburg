import { Card } from "@/components/ui/card";

const teams = [
  {
    id: 1,
    name: "1. Mannschaft",
    league: "Regionalliga",
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

const TeamSection = () => {
  return (
    <section id="teams" className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-club-primary opacity-0 animate-fadeIn">
        Unsere Teams
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teams.map((team, index) => (
          <Card
            key={team.id}
            className="overflow-hidden opacity-0"
            style={{
              animation: `slideInRight 0.5s ease-out ${index * 0.2}s forwards`,
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

export default TeamSection;