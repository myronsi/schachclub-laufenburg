import { Calendar, Image, Video } from "lucide-react";
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