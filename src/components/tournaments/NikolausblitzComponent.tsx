import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { nikolausblitzData } from "@/components/arrays/turniereListe";

const NikolausblitzComponent = () => {
  return (
    <main>
      <section className="py-16 animate-fadeIn">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-club-primary">Nikolausblitz</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
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
                {nikolausblitzData.map((entry) => (
                  <TableRow key={entry.year}>
                    <TableCell>{entry.year}</TableCell>
                    <TableCell>{entry.first}</TableCell>
                    <TableCell>{entry.second}</TableCell>
                    <TableCell>{entry.third}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NikolausblitzComponent;
