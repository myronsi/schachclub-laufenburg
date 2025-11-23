import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ImageOff, Calendar, Users, Mail } from "lucide-react";
import { useState, useEffect } from "react";

interface Team {
  id: number;
  name: string;
  league: string;
  image: string;
  url: string;
  captain?: string;
  contact?: string;
  nextMatch?: string;
  venue?: string;
  record?: { w: number; d: number; l: number };
  squad?: string[];
  notes?: string;
  founded?: number;
}

const MannschaftSection = () => {
  const { elementRef } = useScrollAnimation();
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});
  const [openTeam, setOpenTeam] = useState<number | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState<{ id: string; name: string; text: string } | null>(null);
  const [descriptionLoading, setDescriptionLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://sc-laufenburg.de/api/teams.php');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const transformedTeams = data.map((team: any) => ({
          id: team.id,
          name: team.name,
          league: team.league,
          image: team.image,
          url: team.url,
          captain: team.captain || undefined,
          contact: team.contact || undefined,
          nextMatch: team.nextMatch || undefined,
          venue: team.venue || undefined,
          record: team.record ? JSON.parse(team.record) : undefined,
          squad: team.squad ? JSON.parse(team.squad) : undefined,
          notes: team.notes || undefined,
          founded: team.founded || undefined
        }));
        
        setTeams(transformedTeams);
        setError(null);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch teams');
      } finally {
        setLoading(false);
      }
    };

    const fetchDescription = async () => {
      try {
        setDescriptionLoading(true);
        const response = await fetch('https://sc-laufenburg.de/api/teams.php?id=0');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setDescription(data);
      } catch (err) {
        console.error('Error fetching description:', err);
      } finally {
        setDescriptionLoading(false);
      }
    };

    fetchTeams();
    fetchDescription();
  }, []);

  const handleImageError = (teamId: number) => {
    setImageErrors(prev => ({...prev, [teamId]: true}));
  };

  return (
    <section id="teams" className="py-16 container mx-auto px-4 animate-fadeIn">
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h2 className="text-3xl font-bold text-club-primary">Unsere Mannschaften</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Informationen zu unseren Mannschaften, Spielklassen, Ansprechpartnern und kommenden Begegnungen.
          </p>
        </header>

        {error && (
          <div className="text-center py-4 mb-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800 text-sm">
              Es ist ein Fehler beim Laden der Artikel aufgetreten. Bitte versuche es später erneut.
            </p>
          </div>
        )}

        {descriptionLoading ? (
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md border-l-4 border-club-accent p-5 mb-6">
            <Skeleton className="h-5 w-32 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ) : description ? (
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md border-l-4 border-club-accent p-5 mb-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-club-primary mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-club-accent rounded-full"></span>
              {description.name}
            </h3>
            <div 
              className="text-sm text-gray-700 leading-relaxed [&>p]:mb-2 [&>ul]:ml-4 [&>ul]:list-disc [&>ol]:ml-4 [&>ol]:list-decimal" 
              dangerouslySetInnerHTML={{ __html: description.text }} 
            />
          </div>
        ) : null}

        <div 
          ref={elementRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {loading ? (
            <>
              {[0, 1].map((n) => (
                <Card key={n} className="overflow-hidden">
                  <div className="h-56 md:h-64 flex items-stretch">
                    <div className="w-2/5 bg-gray-50 flex items-center justify-center">
                      <Skeleton className="w-full h-full" />
                    </div>
                    <div className="w-3/5 p-6 flex flex-col justify-between">
                      <div>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-3" />
                        <div className="flex items-center gap-3 mb-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-28" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-32" />
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-8 w-20" />
                          <Skeleton className="h-8 w-24" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </>
          ) : (
            teams.map((team: any) => (
            <Card key={team.id} className="overflow-hidden group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <div className="h-56 md:h-64 flex items-stretch">
                <a 
                  href={team.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-2/5 bg-gray-50 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105"
                >
                  {imageErrors[team.id] || team.image === "nicht eingegeben" ? (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                      <ImageOff className="w-10 h-10 opacity-50 text-gray-400" />
                    </div>
                  ) : (
                    <img 
                      src={team.image}
                      alt={team.name}
                      className="object-cover w-full h-full transform transition-transform duration-500"
                      onError={() => handleImageError(team.id)}
                    />
                  )}
                </a>

                <div className="w-3/5 p-6 flex flex-col justify-between transition-colors duration-300 group-hover:bg-white/5">
                  <div>
                    <a 
                      href={team.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-club-accent transition-colors"
                    >
                      <h3 className="text-xl font-semibold mb-1">{team.name}</h3>
                    </a>
                    <a 
                      href={team.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-club-accent transition-colors"
                    >
                      <p className="text-gray-600 text-sm mb-3">{team.league}</p>
                    </a>
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
                    {team.record && (team.record.w > 0 || team.record.d > 0 || team.record.l > 0) && (
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-700">
                          <strong className="text-club-primary">{team.record.w}</strong> W
                          <span className="mx-2">·</span>
                          <strong className="text-club-primary">{team.record.d}</strong> D
                          <span className="mx-2">·</span>
                          <strong className="text-club-primary">{team.record.l}</strong> L
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 ml-auto">
                      {(team.venue || (team.squad && team.squad.length > 0) || team.notes) && (
                        <button
                          onClick={() => setOpenTeam(openTeam === team.id ? null : team.id)}
                          className="text-sm px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {openTeam === team.id ? 'Schließen' : 'Details'}
                        </button>
                      )}
                      {team.contact && (
                        <a href={`mailto:${team.contact}`} className="text-sm px-3 py-1 rounded bg-club-accent text-white hover:bg-club-dark transition-colors flex items-center gap-1">
                          <Mail className="w-4 h-4" /> Kontakt
                        </a>
                      )}
                    </div>
                  </div>

                  <div className={`mt-3 overflow-hidden transition-all ${openTeam === team.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="text-sm text-gray-600 space-y-2">
                      {team.venue && <div><strong>Spielort:</strong> {team.venue}</div>}
                      {team.squad && team.squad.length > 0 && (
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
          ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MannschaftSection;
