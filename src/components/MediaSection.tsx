import { useState } from "react";
import { Image } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

type ImageItem = {
  src: string;
  title: string;
  description?: string;
  children?: ImageItem[];
};

const MediaSection = () => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  
  const images: ImageItem[] = [
    {
      src: "/lovable-uploads/e98db37a-c4c3-4a84-9476-ca90b1ecc551.png",
      title: "Lakiso 2012",
      description: "Lakiso 2012",
      children: [
        {
          src: "/lovable-uploads/e98db37a-c4c3-4a84-9476-ca90b1ecc551.png",
          title: "Child Image 1",
          description: "Child Description 1"
        },
        {
          src: "/lovable-uploads/08258dc4-dd15-4e8a-bb58-693660380a28.png",
          title: "Child Image 2",
        },
        {
          src: "/lovable-uploads/4b84a145-14b8-4cde-9462-5e35cefe985c.png",
          title: "Child Image 2",
        }
      ]
    },
    {
      src: "/lovable-uploads/381cb2a6-79e2-46c2-a6c5-5d23fea193ed.png",
      title: "BSH-JGP Laufenburg 12",
      children: [
        {
          src: "/lovable-uploads/381cb2a6-79e2-46c2-a6c5-5d23fea193ed.png",
          title: "BSH-JGP Laufenburg 12",
        },
      ]
    },
    {
      src: "/lovable-uploads/7ada8408-4612-4a55-ab4a-7775da6cfa30.png",
      title: "BSH-JGP Laufenburg 11",
      children: [
        {
          src: "/lovable-uploads/7ada8408-4612-4a55-ab4a-7775da6cfa30.png",
          title: "BSH-JGP Laufenburg 11",
        },
      ]
    },
    {
      src: "/lovable-uploads/4a01e21d-c4fc-4741-8ded-af302cda3890.png",
      title: "BSH-JGP Brombach 11",
      children: [
        {
          src: "/lovable-uploads/4a01e21d-c4fc-4741-8ded-af302cda3890.png",
          title: "BSH-JGP Brombach 11",
        },
      ]
    },
    {
      src: "/lovable-uploads/90a7447d-c815-4fba-9222-4055017292b0.png",
      title: "Challenge Murg-Mehun 2011",
      children: [
        {
          src: "/lovable-uploads/90a7447d-c815-4fba-9222-4055017292b0.png",
          title: "Challenge Murg-Mehun 2011",
        },
      ]
    },
    {
      src: "/lovable-uploads/4b84a145-14b8-4cde-9462-5e35cefe985c.png",
      title: "Nikolausblitz 2010",
      children: [
        {
          src: "/lovable-uploads/4b84a145-14b8-4cde-9462-5e35cefe985c.png",
          title: "Nikolausblitz 2010",
        },
      ]
    },
    {
      src: "/lovable-uploads/57add343-4fac-4d9c-b1b2-e668cf368e59.png",
      title: "BSH-JGP Laufenburg 10",
      children: [
        {
          src: "/lovable-uploads/57add343-4fac-4d9c-b1b2-e668cf368e59.png",
          title: "BSH-JGP Laufenburg 10",
        },
      ]
    },
    {
      src: "/lovable-uploads/a5155d07-0daa-4dd2-b74c-af197ad7dee9.png",
      title: "JHV 2010",
      children: [
        {
          src: "/lovable-uploads/a5155d07-0daa-4dd2-b74c-af197ad7dee9.png",
          title: "JHV 2010",
        },
      ]
    },
    {
      src: "/lovable-uploads/bfb0f5d2-4997-4c8f-b40e-e4151417e55b.png",
      title: "Lakiso 2010",
      children: [
        {
          src: "/lovable-uploads/bfb0f5d2-4997-4c8f-b40e-e4151417e55b.png",
          title: "Lakiso 2010",
        },
      ]
    },
    {
      src: "/lovable-uploads/08258dc4-dd15-4e8a-bb58-693660380a28.png",
      title: "Nikolausblitz 2009",
      children: [
        {
          src: "/lovable-uploads/08258dc4-dd15-4e8a-bb58-693660380a28.png",
          title: "Nikolausblitz 2009",
        },
      ]
    },
  ];

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
        <h2 className="text-3xl font-bold text-club-primary mb-12 text-center">
          Archiv
        </h2>

        <div className="mb-13">
          <h3 className="text-2xl font-semibold mb-6 text-club-primary flex items-center gap-2">
            <Image className="text-club-accent" />
            Fotogalerie
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-4">
            {images.map((image, index) => (
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
