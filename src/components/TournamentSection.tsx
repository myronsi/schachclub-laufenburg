
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const vereinsmeisterData = [
  { year: "2014", first: "Benno Moser", second: "Nico Zorn", third: "Leonid Krol" },
  { year: "2013", first: "Nico Zorn", second: "Heinz Meyer", third: "Nicolas Mesot" },
  { year: "2012", first: "Jochen Bahner", second: "Nico Zorn", third: "Benno Moser" },
  { year: "2011", first: "Jochen Bahner", second: "Benno Moser", third: "Wolfgang Scheina" },
  { year: "2010", first: "Stefan Frommherz", second: "Wolfgang Scheina", third: "Jochen Bahner" },
  { year: "2009", first: "Stefan Frommherz", second: "Roland Bahner", third: "Wolfgang Scheina" },
  { year: "2008", first: "Thomas Schmidt", second: "Stefan Frommherz", third: "Roland Bahner" },
  { year: "2007", first: "Thomas Schmidt", second: "Bernhard Bürgin", third: "Roland Bahner" },
  { year: "2006", first: "Bernhard Bürgin", second: "Wolfgang Scheina", third: "Roland Bahner" },
  { year: "2005", first: "Wolfgang Scheina", second: "Josef Jurgetz", third: "Roland Bahner" },
  { year: "2004", first: "Josef Jurgetz", second: "Wolfgang Scheina", third: "Elmar Kohlhöfer" },
  { year: "2003", first: "Bernhard Bürgin", second: "Roland Bahner", third: "Wolfgang Scheina" },
  { year: "2002", first: "Wolfgang Scheina", second: "Bernhard Bürgin", third: "Roland Bahner" },
  { year: "2001", first: "Bernhard Bürgin", second: "Roland Bahner", third: "Wolfgang Scheina" },
  { year: "1993", first: "Karl-Heinz Pflaum", second: "", third: "" },
];

const pokalsiegerData = [
  { year: "2014", winner: "Nico Zorn" },
  { year: "2012", winner: "Stefan Frommherz" },
  { year: "2011", winner: "Tobias Oelschlegel" },
  { year: "2010", winner: "Wolfgang Scheina" },
  { year: "2009", winner: "Tobias Oelschlegel" },
  { year: "2008", winner: "Stefan Frommherz" },
  { year: "2007", winner: "Bernhard Bürgin" },
  { year: "2006", winner: "Bernhard Bürgin" },
  { year: "2005", winner: "Roland Bahner" },
  { year: "2004", winner: "Bernhard Bürgin" },
  { year: "2003", winner: "Roland Bahner" },
  { year: "2002", winner: "Bernhard Bürgin" },
  { year: "2001", winner: "Bernhard Bürgin" },
  { year: "2000", winner: "Bernhard Bürgin" },
  { year: "1993", winner: "Karl-Heinz Pflaum" },
  { year: "1992", winner: "Karl-Heinz Pflaum" },
  { year: "1991", winner: "Karl-Heinz Pflaum" },
  { year: "1989", winner: "K.D. Oeschger" },
  { year: "1988", winner: "K.D. Oeschger" },
  { year: "1987", winner: "K.D. Oeschger" },
  { year: "1986", winner: "Franz Baumgartner" },
];

const blitzsiegerData = [
  { year: "2017", winner: "Tobias Oelschlegel" },
  { year: "2016", winner: "Tobias Oelschlegel" },
  { year: "2014", winner: "Bernhard Bürgin" },
  { year: "2012", winner: "Jochen Bahner" },
  { year: "2011", winner: "Tobias Oelschlegel" },
  { year: "2010", winner: "Tobias Oelschlegel" },
  { year: "2009", winner: "Jochen Bahner" },
  { year: "2008", winner: "Bernhard Bürgin" },
  { year: "2007", winner: "Stefan Frommherz" },
  { year: "2006", winner: "Elmar Kohlhöfer" },
  { year: "2005", winner: "Roland Bahner" },
  { year: "2004", winner: "Wolfgang Scheina" },
  { year: "2003", winner: "Karl-Heinz Pflaum" },
  { year: "1993", winner: "Karl-Heinz Pflaum" },
  { year: "1992", winner: "Karl-Heinz Pflaum" },
  { year: "1991", winner: "Karl-Heinz Pflaum" },
  { year: "1990", winner: "K.D. Oeschger" },
  { year: "1989", winner: "K.D. Oeschger" },
  { year: "1988", winner: "K.D. Oeschger" },
  { year: "1987", winner: "K.D. Oeschger" },
];

const TournamentSection = () => {
  return (
    <section id="tournaments" className="py-16 bg-club-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-club-primary">
          Turniere und Sieger
        </h2>
        
        <Tabs defaultValue="vereinsmeister" className="w-full">
          <TabsList className="scrollable-tabs-list">
            <TabsTrigger value="vereinsmeister">Vereinsmeister</TabsTrigger>
            <TabsTrigger value="pokalsieger">Pokalsieger</TabsTrigger>
            <TabsTrigger value="nikolausblitz">Nikolausblitz</TabsTrigger>
            <TabsTrigger value="blitzsieger">Blitzsieger</TabsTrigger>
          </TabsList>

          <TabsContent value="vereinsmeister">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold mb-6">Vereinsmeister</h3>
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
                  {vereinsmeisterData.map((entry) => (
                    <TableRow key={entry.year}>
                      <TableCell>{entry.year}</TableCell>
                      <TableCell>{entry.first}</TableCell>
                      <TableCell>{entry.second}</TableCell>
                      <TableCell>{entry.third}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} className="text-center italic">
                      2000 bis 1994: Keine Meisterschaft
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="pokalsieger">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold mb-6">Pokalsieger</h3>
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
          </TabsContent>

          <TabsContent value="nikolausblitz">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold mb-6">Nikolausblitz</h3>
              <p className="text-gray-600 italic">Noch keine Einträge vorhanden</p>
            </div>
          </TabsContent>

          <TabsContent value="blitzsieger">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold mb-6">Blitzsieger</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jahr</TableHead>
                    <TableHead>Sieger</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blitzsiegerData.map((entry) => (
                    <TableRow key={entry.year}>
                      <TableCell>{entry.year}</TableCell>
                      <TableCell>{entry.winner}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TournamentSection;
