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
      </div>
    </section>
  );
};

export default MediaSection;