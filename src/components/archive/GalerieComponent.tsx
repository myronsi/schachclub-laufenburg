import { useState, useEffect } from "react";
import { Image, SortDesc, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonToTop } from "@/components/ui/arrowToTop";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

interface ImageItem {
  id?: number;
  src: string;
  title: string;
  description?: string;
  children?: ImageItem[];
}

const GalerieComponent = () => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [openDialogsCount, setOpenDialogsCount] = useState(0);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const sortedImages = isReversed ? [...images].reverse() : images;

  const handleDialogOpenChange = (open: boolean) => {
    setOpenDialogsCount(prev => open ? prev + 1 : Math.max(prev - 1, 0));
    if (!open) setSelectedImage(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_username');
    const storedSession = localStorage.getItem('auth_session_id');
    if (!storedUser || !storedSession) {
      setAuthenticated(false);
      setCheckingAuth(false);
      return;
    }

    (async () => {
      setCheckingAuth(true);
      try {
        const res = await fetch('https://sc-laufenburg.de/api/auth.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'check', username: storedUser, session_id: storedSession })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          setAuthError(data.message || 'Ungültige Session');
          localStorage.removeItem('auth_username');
          localStorage.removeItem('auth_session_id');
        }
      } catch (err: any) {
        setAuthenticated(false);
        setAuthError('Verbindungsfehler');
      } finally {
        setCheckingAuth(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!authenticated) return;

    const fetchImages = async () => {
      setLoadingImages(true);
      try {
        const response = await fetch('https://sc-laufenburg.de/api/media.php');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform API response
        const transformedImages = data.map((item: any) => ({
          id: item.id,
          src: `https://sc-laufenburg.de/${item.src}`,
          title: item.title,
          description: item.description || undefined,
          children: item.children ? JSON.parse(item.children).map((child: any) => ({
            ...child,
            src: `https://sc-laufenburg.de/${child.src}`
          })) : undefined
        }));
        
        setImages(transformedImages);
        setImageError(null);
      } catch (err) {
        console.error('Error fetching images:', err);
        setImageError(err instanceof Error ? err.message : 'Failed to fetch images');
      } finally {
        setLoadingImages(false);
      }
    };

    fetchImages();
  }, [authenticated]);

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
      {checkingAuth ? (
        <section className="py-16 animate-fadeIn">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600">Login-Status wird überprüft…</p>
          </div>
        </section>
      ) : !authenticated ? (
        <section className="py-16 animate-fadeIn">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="p-8 bg-white shadow-lg rounded-xl border border-gray-100 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="rounded-full bg-club-accent/10 p-4">
                    <Lock className="w-8 h-8 text-club-accent" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-2">Mitgliederbereich - Zutritt geschützt</h3>
                <p className="text-sm text-gray-600 mb-4">Unsere Fotogalerie ist exklusiv für Vereinsmitglieder verfügbar. Bitte melde dich an, um die vollständige Sammlung zu sehen.</p>
                {authError && <p className="text-red-600 text-sm mb-4">{authError}</p>}

                <ul className="text-sm text-gray-700 mb-6 space-y-2 list-inside list-disc text-left max-w-md mx-auto">
                  <li>Exklusive Turnier- und Vereinsfotos</li>
                  <li>Ergebnisse & Protokolle (für Mitglieder)</li>
                </ul>

                <div className="flex items-center justify-center gap-3">
                  <a href="/login" className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded bg-club-accent hover:bg-club-dark text-white">Zum Login</a>
                  <a href="/kontakt" className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded border border-gray-200 hover:bg-gray-50">Kontakt</a>
                </div>
              </div>
            </div>
          </div>
        </section>
  ) : (
  <>
  <section id="media" className="py-16 animate-fadeIn relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-club-primary mb-12 text-center">
            Fotogalerie
          </h2>

          {imageError && (
            <div className="text-center py-4 mb-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-800 text-sm">
                Fehler beim Laden der Bilder. Bitte versuchen Sie es später erneut.
              </p>
            </div>
          )}

          <div className="mb-13">
            <div className="flex justify-end items-center mb-6">
              <div>
                <Button
                  variant="outline"
                  onClick={() => setIsReversed(!isReversed)}
                  className="flex items-center gap-2"
                  disabled={loadingImages}
                >
                  <SortDesc className="h-4 w-4" />
                  {isReversed ? "Älteste ist zuerst" : "Neuste ist zuerst"}
                </Button>
              </div>
            </div>
            
            {loadingImages ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <Skeleton className="aspect-square rounded-lg" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                  </div>
                ))}
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </section>

  <ButtonToTop forceHide={openDialogsCount > 0} />
  </>
  )}
  </>
  );
};

export default GalerieComponent;