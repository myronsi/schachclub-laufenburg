
import { Calendar, Image, Mail, MapPin, Video } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const YouthSection = () => {
  const trainingGroups = [
    {
      age: "U12",
      time: "Montags, 17:00 - 18:30",
      trainer: "Max Mustermann",
      details: "Grundlagen des Schachspiels",
    },
    {
      age: "U16",
      time: "Mittwochs, 18:00 - 19:30",
      trainer: "Anna Schmidt",
      details: "Fortgeschrittene Taktik und Strategie",
    },
  ];

  return (
    <section id="youth" className="py-16 bg-club-light animate-fadeIn">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-club-primary mb-12 text-center">
          Jugendsektion
        </h2>

        {/* Introduction */}
        <div className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-6 text-club-primary">Jugendarbeit</h3>
          <div className="space-y-4">
            <p>
              Jugendarbeit ist ein unverzichtbarer Bestandteil eines jeden Vereins. Gerade das Schachspielen hat sehr günstige Auswirkungen auf die geistige Entwicklung von Kindern und Jugendlichen: Das Konzentrationsvermögen wird ausgebildet, das logische Denken geschult und das Ganze in spielerischer Form und mit Wettkampfcharakter.
            </p>
            <p>
              Momentan können wir alle Interessenten aus allen Altersgruppen integrieren, die Lust daran haben das Schachspiel zu erlernen oder ihr Schachfähigkeiten zu verbessern. Schaut doch einfach unverbindlich vorbei. Bei weiteren Fragen könnt ihr auch jederzeit unserem Jugendleiter Jochen eine Email (<a href="mailto:jugend@sc-laufenburg.de" className="text-blue-600 hover:text-blue-800 hover:underline">jugend@sc-laufenburg.de</a>) schreiben.
            </p>
          </div>
        </div>

        {/* What Section */}
        <div className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-6 text-club-primary">Was?</h3>
          <div className="space-y-4">
            <p>
              Momentan trainieren alle interessierten Jugendspieler zusammen in einer Gruppe. Neulinge, die die grundlegenden Regeln bereits kennen, sind jederzeit herzlich dazu eingeladen im Training vorbeizuschauen. Bei ausreichendem Interesse wäre es auch möglich einen zusätzlichen Anfängerkurs anzubieten - Interessierte aller Altersklassen können gerne unverbindlich Interesse anmelden.
            </p>
            <p>
              Zusätzlich zum regelmäßigem Jugendtraining, nehmen wir auch jährlich am Laufenburger Kindersommer (LAKISO) teil. Dieses Angebot richtet sich an Anfänger, die die Regeln des Schachspiels noch nicht beherrschen und eignet sich ideal um uns besser kennen zu lernen.
            </p>
          </div>
        </div>

        {/* When and Where Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="text-club-accent" />
                Wann?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Das wöchentliche Jugendtraining findet jeden Dienstag außerhalb der Schulferien zwischen 17.00- 19.30 Uhr statt.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="text-club-accent" />
                Wo?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Treffpunkt für das wöchentliche Jugendtraining ist unser Spiellokal (Feuerwehrhaus Hochsal, Bertastr. 6, 79725 Laufenburg)</p>
            </CardContent>
          </Card>
        </div>

        {/* Training Plans */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-club-primary flex items-center gap-2">
            <Calendar className="text-club-accent" />
            Trainingspläne
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingGroups.map((group) => (
              <Dialog key={group.age}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover-scale card-shadow">
                    <CardHeader>
                      <CardTitle>{group.age} Training</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg mb-2">{group.time}</p>
                      <p className="text-club-accent">{group.trainer}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{group.age} Trainingsdetails</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <p className="mb-2">
                      <strong>Zeit:</strong> {group.time}
                    </p>
                    <p className="mb-2">
                      <strong>Trainer:</strong> {group.trainer}
                    </p>
                    <p>
                      <strong>Schwerpunkt:</strong> {group.details}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        {/* Photo Album */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-club-primary flex items-center gap-2">
            <Image className="text-club-accent" />
            Fotoalbum
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="aspect-square bg-gray-200 rounded-lg hover-scale"
              />
            ))}
          </div>
        </div>

        {/* Trainer Videos */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-club-primary flex items-center gap-2">
            <Video className="text-club-accent" />
            Trainervideos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((index) => (
              <div
                key={index}
                className="aspect-video bg-gray-200 rounded-lg hover-scale"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouthSection;
