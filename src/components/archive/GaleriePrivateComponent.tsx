import { useState, useEffect } from "react";
import { Image, SortAsc, SortDesc, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonToTop } from "@/components/ui/arrowToTop";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { checkAuth } from "@/utils/authService";
import { mediaImages } from "./mediaImages";

interface ImageItem {
  id?: number;
  src: string;
  title: string;
  description?: string;
  children?: ImageItem[];
}

const GalerieComponent = () => {
  const navigate = useNavigate();
  const { title } = useParams<{ title?: string }>();
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [openDialogsCount, setOpenDialogsCount] = useState(0);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [isBlocked, setIsBlocked] = useState(false);

  const sortedImages = isReversed ? [...images].reverse() : images;

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[äöü]/g, (char) => ({ ä: 'ae', ö: 'oe', ü: 'ue' }[char] || char))
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const findImageBySlug = (slug: string): ImageItem | null => {
    return images.find(img => createSlug(img.title) === slug) || null;
  };

  const handleDialogOpenChange = (open: boolean, image?: ImageItem) => {
    setOpenDialogsCount(prev => open ? prev + 1 : Math.max(prev - 1, 0));
    if (open && image) {
      const slug = createSlug(image.title);
      navigate(`/archiv/galerie-private/${slug}`, { replace: false });
      setSelectedImage(image);
    } else {
      navigate('/archiv/galerie-private', { replace: false });
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    (async () => {
      setCheckingAuth(true);
      try {
        const authState = await checkAuth();
        setAuthenticated(authState.isAuthenticated);
        setUsername(authState.username || '');
        setIsBlocked(authState.isBlocked);
        
        if (!authState.isAuthenticated) {
          setAuthError('Nicht angemeldet oder Session abgelaufen');
        } else if (authState.isBlocked) {
          setAuthError('Zugriff gesperrt');
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
    if (isBlocked) return;

    // Use static images from mediaImages.ts instead of fetching from API
    setLoadingImages(true);
    try {
      setImages(mediaImages as ImageItem[]);
      setImageError(null);
    } catch (err) {
      console.error('Error setting images from mediaImages:', err);
      setImageError(err instanceof Error ? err.message : 'Failed to load images');
    } finally {
      setLoadingImages(false);
    }
  }, [authenticated]);

  useEffect(() => {
    if (!authenticated || loadingImages || !title || images.length === 0) return;

    const imageToOpen = findImageBySlug(title);
    if (imageToOpen && (!selectedImage || createSlug(selectedImage.title) !== title)) {
      setSelectedImage(imageToOpen);
      setOpenDialogsCount(1);
    } else if (!imageToOpen && title) {
      navigate('/archiv/galerie-private', { replace: true });
    }
  }, [authenticated, loadingImages, title, images]);

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
      ) : isBlocked ? (
        <section className="py-16 animate-fadeIn">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <div className="rounded-full bg-red-600/10 p-4">
                    <Lock className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-3 text-center">Dein Account wurde gesperrt. Wenn du denkst, dass dies ein Fehler ist, kontaktiere bitte den Vorstand.</h2>
                
                <div className="mt-6 flex justify-center">
                  <Link to="/kontakt" className="inline-flex px-6 py-3 bg-club-accent text-white rounded hover:bg-club-dark">
                    Kontakt
                  </Link>
                </div>
            </div>
          </div>
        </section>
  ) : !authenticated ? (
        <section className="py-16 animate-fadeIn">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <div className="rounded-full bg-club-accent/10 p-4">
                    <Lock className="w-8 h-8 text-club-accent" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-3 text-center">Tut uns leid, aber dieser Inhalt kann nur mit ausreichender Berechtigung angezeigt werden.</h2>
                
                <div className="mt-6 flex justify-center">
                  <Link to="/login" className="inline-flex px-6 py-3 bg-club-accent text-white rounded hover:bg-club-dark">
                    Einloggen
                  </Link>
                </div>
            </div>
          </div>
        </section>
  ) : (
  <>
  <section id="media" className="py-16 animate-fadeIn relative">
        <div className="container mx-auto px-4">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-bold text-club-primary">Bildergalerie</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Eindrücke aus dem Vereinsleben — Turniere, Training und Events.
            </p>
          </header>
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
                  {isReversed ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
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
                  open={selectedImage?.title === image.title}
                  onOpenChange={(open) => handleDialogOpenChange(open, image)}
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
