
import { Image } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MediaSection = () => {
  const images = [
    "/lovable-uploads/e98db37a-c4c3-4a84-9476-ca90b1ecc551.png",
    "/lovable-uploads/381cb2a6-79e2-46c2-a6c5-5d23fea193ed.png",
    "/lovable-uploads/7ada8408-4612-4a55-ab4a-7775da6cfa30.png",
    "/lovable-uploads/4a01e21d-c4fc-4741-8ded-af302cda3890.png",
    "/lovable-uploads/90a7447d-c815-4fba-9222-4055017292b0.png",
    "/lovable-uploads/4b84a145-14b8-4cde-9462-5e35cefe985c.png",
    "/lovable-uploads/57add343-4fac-4d9c-b1b2-e668cf368e59.png",
    "/lovable-uploads/a5155d07-0daa-4dd2-b74c-af197ad7dee9.png",
    "/lovable-uploads/bfb0f5d2-4997-4c8f-b40e-e4151417e55b.png",
    "/lovable-uploads/08258dc4-dd15-4e8a-bb58-693660380a28.png",
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="aspect-square relative cursor-pointer hover-scale overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={`Schachclub Bild ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Schachclub Impression {index + 1}</DialogTitle>
                  </DialogHeader>
                  <div className="relative w-full max-h-[80vh] overflow-hidden">
                    <img
                      src={image}
                      alt={`Schachclub Bild ${index + 1}`}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
