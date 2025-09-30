import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pokalsiegerData } from "@/components/arrays/turniereListe";

const PokalsiegerComponent = () => {
  return (
    <main>
      <section className="py-16 bg-club-light animate-fadeIn">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-club-primary">Pokalsieger</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jahr</TableHead>
                  <TableHead>Sieger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pokalsiegerData.map((entry) => (
                  <TableRow key={entry.year}>
                    <TableCell>{entry.year}</TableCell>
                    <TableCell>{entry.winner}</TableCell>
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

export default PokalsiegerComponent;
