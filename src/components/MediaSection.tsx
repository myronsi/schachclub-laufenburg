import { Image, Video, Newspaper } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MediaSection = () => {
  const pressReleases = [
    {
      title: "Erfolgreicher Saisonstart",
      date: "15.03.2024",
      preview: "Die erste Mannschaft startet mit einem Sieg in die neue Saison.",
      link: "#",
    },
    {
      title: "Jugendturnier 2024",
      date: "01.03.2024",
      preview: "Großer Andrang beim diesjährigen Jugendturnier.",
      link: "#",
    },
  ];

  return (
    <section id="media" className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-club-primary mb-12 text-center">
          Medien
        </h2>

        {/* Photo Gallery */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-club-primary flex items-center gap-2">
            <Image className="text-club-accent" />
            Fotogalerie
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="aspect-square bg-gray-200 rounded-lg cursor-pointer hover-scale" />
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="aspect-square bg-gray-200 rounded-lg w-full" />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        {/* Videos */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-club-primary flex items-center gap-2">
            <Video className="text-club-accent" />
            Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="aspect-video bg-gray-200 rounded-lg cursor-pointer hover-scale" />
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Video Titel</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video bg-gray-200 rounded-lg w-full" />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        {/* Press Releases */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-club-primary flex items-center gap-2">
            <Newspaper className="text-club-accent" />
            Pressemitteilungen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pressReleases.map((press) => (
              <a
                key={press.title}
                href={press.link}
                className="hover-scale"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="card-shadow h-full">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span>{press.title}</span>
                      <span className="text-sm text-gray-500">{press.date}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{press.preview}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;