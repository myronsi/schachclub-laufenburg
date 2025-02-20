
import { useState } from "react";
import { Image, SortDesc } from "lucide-react";
import { ImageItem, images } from "./mediaImages";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

const MediaSection = () => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  const sortedImages = isReversed ? [...images].reverse() : images;

  const renderImages = (items: ImageItem[]) => (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="space-y-2">
          <img
            src={item.src}
            alt={item.title}
            className="object-cover w-full rounded-lg cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(item);
            }}
          />
          {item.description && (
            <p className="text-sm text-gray-600">{item.description}</p>
          )}
          {selectedImage?.src === item.src && item.children && (
            <div className="pl-4 border-l-2 border-gray-200">
              {renderImages(item.children)}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <section id="media" className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-club-primary">
            Archiv
          </h2>
          <Button
            variant="outline"
            onClick={() => setIsReversed(!isReversed)}
            className="flex items-center gap-2"
          >
            <SortDesc className="h-4 w-4" />
            {isReversed ? "Neueste zuerst" : "Älteste zuerst"}
          </Button>
        </div>

        <div className="mb-13">
          <h3 className="text-2xl font-semibold mb-6 text-club-primary flex items-center gap-2">
            <Image className="text-club-accent" />
            Fotogalerie
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-4">
            {sortedImages.map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="aspect-square relative cursor-pointer hover-scale overflow-hidden rounded-lg">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent 
                  className="max-w-4xl max-h-[90vh] overflow-y-auto"
                  onInteractOutside={() => setSelectedImage(null)}
                >
                  <DialogHeader>
                    <DialogTitle>{image.title}</DialogTitle>
                    <DialogDescription>{image.description}</DialogDescription>
                  </DialogHeader>
                  {renderImages(image.children || [])}
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
