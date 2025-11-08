import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

interface NikolausblitzEntry {
  year: string;
  first: string;
  second: string;
  third: string;
}

const NikolausblitzComponent = () => {
  const [data, setData] = useState<NikolausblitzEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://sc-laufenburg.de/api/tournaments.php?type=nikolausblitz');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const tournaments = await response.json();
        
        // Transform API response
        const transformedData = tournaments.map((entry: any) => ({
          year: entry.year,
          first: entry.first,
          second: entry.second || '',
          third: entry.third || ''
        }));
        
        setData(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching nikolausblitz:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <main>
      <section className="py-16 animate-fadeIn">
        <div className="container mx-auto px-4">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-bold text-club-primary">Nikolausblitz</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Vorweihnachtliches Blitzturnier: Kurze Bedenkzeiten, viel Tempo und eine große Portion Spaß für alle Teilnehmer.
            </p>
          </header>
          {error && (
            <div className="text-center py-4 mb-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-800 text-sm">
                Fehler beim Laden der Daten. Bitte versuchen Sie es später erneut.
              </p>
            </div>
          )}
          <div className="bg-white rounded-lg shadow-md p-6">
            {loading ? (
              <div className="space-y-3">
                <div className="flex gap-4 pb-3 border-b">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                </div>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex gap-4 py-3">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jahr</TableHead>
                    <TableHead>1. Platz</TableHead>
                    <TableHead>2. Platz</TableHead>
                    <TableHead>3. Platz</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((entry) => (
                    <TableRow key={entry.year}>
                      <TableCell>{entry.year}</TableCell>
                      <TableCell>{entry.first}</TableCell>
                      <TableCell>{entry.second}</TableCell>
                      <TableCell>{entry.third}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default NikolausblitzComponent;
