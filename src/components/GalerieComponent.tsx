import { useState } from "react";
import { Image, SortDesc } from "lucide-react";
import { ImageItem, images } from "./arrays/mediaImages";
import { Button } from "@/components/ui/button";
import { ButtonToTop } from "@/components/ui/arrowToTop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

const GalerieComponent = () => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [openDialogsCount, setOpenDialogsCount] = useState(0);

  const sortedImages = isReversed ? [...images].reverse() : images;

  const handleDialogOpenChange = (open: boolean) => {
    setOpenDialogsCount(prev => open ? prev + 1 : Math.max(prev - 1, 0));
    if (!open) setSelectedImage(null);
  };

  const renderImages = (items: ImageItem[]) => (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <div className="rounded-lg overflow-hidden">
            <img
              src={item.src}
              alt={item.title}
              className="object-contain w-full max-h-[500px] cursor-pointer mx-auto"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(item);
              }}
            />
          </div>
          {item.description && (
            <p className="text-sm text-gray-600 text-center">{item.description}</p>
          )}
          {selectedImage?.src === item.src && item.children && (
            <div className="pl-4 border-l-2 border-gray-200 w-full">
              {renderImages(item.children)}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <section id="media" className="py-16 animate-fadeIn relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-club-primary mb-12 text-center">
            Fotogalerie
          </h2>

          <div className="mb-13">
            <div className="flex justify-end items-center mb-6">
              <div>
                <Button
                  variant="outline"
                  onClick={() => setIsReversed(!isReversed)}
                  className="flex items-center gap-2"
                >
                  <SortDesc className="h-4 w-4" />
                  {isReversed ? "Älteste ist zuerst" : "Neuste ist zuerst"}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-4">
              {sortedImages.map((image, index) => (
                <Dialog 
                  key={index}
                  onOpenChange={handleDialogOpenChange}
                >
                  <DialogTrigger asChild>
                    <div className="flex flex-col gap-2 cursor-pointer">
                      <div className="aspect-square relative hover:scale-105 transition-transform overflow-hidden rounded-lg">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <p className="text-sm text-center text-gray-600">{image.title}</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                    <DialogHeader className="space-y-2">
                      <DialogTitle>{image.title}</DialogTitle>
                      {image.description && (
                        <DialogDescription>{image.description}</DialogDescription>
                      )}
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-4">
                      {image.children && renderImages(image.children)}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ButtonToTop forceHide={openDialogsCount > 0} />
    </>
  );
};

export default GalerieComponent;