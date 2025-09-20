import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ImageOff, Calendar, Users, Phone, ExternalLink } from "lucide-react";
import { useState } from "react";
import { teams} from "./arrays/mannschaftenList";

const MannschaftSection = () => {
  const { elementRef } = useScrollAnimation();
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});
  const [openTeam, setOpenTeam] = useState<number | null>(null);

  const handleImageError = (teamId: number) => {
    setImageErrors(prev => ({...prev, [teamId]: true}));
  };

  return (
    <section id="teams" className="py-16 container mx-auto px-4 animate-fadeIn">
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
            href="https://bsv-ergebnisdienst.de/index.php?p1=0:pa:BLS3-24-7" 
            target="_blank"
            className="underline hover:text-club-accent hover:underline"
          >
            Bereichsliga Süd Staffel 3
          </a>
        </p>
      </div>

      <div 
        ref={elementRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
      >
        {teams.map((team: any) => (
          <Card key={team.id} className="overflow-hidden group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
            <div className="h-56 md:h-64 flex items-stretch">
              <div className="w-2/5 bg-gray-50 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
                {imageErrors[team.id] || team.image === "nicht eingegeben" ? (
                  <div className="flex items-center justify-center w-full h-full bg-gray-100">
                    <ImageOff className="w-10 h-10 opacity-50 text-gray-400" />
                  </div>
                ) : (
                  <img 
                    src={team.image}
                    alt={team.name}
                    className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                    onError={() => handleImageError(team.id)}
                  />
                )}
              </div>

              <div className="w-3/5 p-6 flex flex-col justify-between transition-colors duration-300 group-hover:bg-white/5">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{team.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{team.league}</p>
                  {/* short meta row */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    {team.captain && (
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {team.captain}</span>
                    )}
                    {team.nextMatch && (
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {team.nextMatch}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {team.record ? (
                      <div className="text-sm text-gray-700">
                        <strong className="text-club-primary">{team.record.w}</strong> W
                        <span className="mx-2">·</span>
                        <strong className="text-club-primary">{team.record.d}</strong> D
                        <span className="mx-2">·</span>
                        <strong className="text-club-primary">{team.record.l}</strong> L
                      </div>
                    ) : (
                      <a href={team.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 flex items-center gap-1"><ExternalLink className="w-4 h-4" /> Ergebnisse</a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {(team.venue || (team.squad && team.squad.length) || team.notes || team.record || team.captain || team.nextMatch) && (
                      <button
                        onClick={() => setOpenTeam(openTeam === team.id ? null : team.id)}
                        className="text-sm px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        {openTeam === team.id ? 'Schließen' : 'Details'}
                      </button>
                    )}
                    {team.contact && (
                      <a href={`mailto:${team.contact}`} className="text-sm px-3 py-1 rounded bg-club-accent text-white hover:bg-club-dark transition-colors flex items-center gap-1">
                        <Phone className="w-4 h-4" /> Kontakt
                      </a>
                    )}
                  </div>
                </div>

                {/* expandable details */}
                <div className={`mt-3 overflow-hidden transition-all ${openTeam === team.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="text-sm text-gray-600 space-y-2">
                    {team.venue && <div><strong>Spielort:</strong> {team.venue}</div>}
                    {team.squad && (
                      <div>
                        <strong>Kader:</strong>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {team.squad.slice(0,6).map((m:any, i:number) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs">{m}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {team.notes && <div><strong>Notiz:</strong> {team.notes}</div>}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MannschaftSection;