import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { vereinsmeisterData, pokalsiegerData, nikolausblitzData, blitzsiegerData} from "./arrays/turniereListe"

const TournamentSection = () => {
  return (
    <section id="tournaments" className="py-16 bg-club-light animate-fadeIn">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-club-primary">
          Turniere und Sieger
        </h2>
        
        <Tabs defaultValue="vereinsmeister" className="w-full">
          <TabsList className="scrollable-tabs-list">
            <TabsTrigger 
              value="vereinsmeister" 
              className="md:ml-[90px] ml-4 md:whitespace-nowrap"
            >
              <span className="md:hidden text-left">
                Vereins<br/>meister
              </span>
              <span className="hidden md:inline">
                Vereinsmeister
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="pokalsieger" 
              className="md:whitespace-nowrap"
            >
              <span className="md:hidden">Pokal<br/>sieger</span>
              <span className="hidden md:inline">Pokalsieger</span>
            </TabsTrigger>
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
