import { useEffect, useMemo, useState } from "react";
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
} from "@/components/ui/dialog";
import { checkAuth } from "@/utils/authService";

interface ImageItem {
  path: string;
  title: string;
}

const GALLERY_API = "private-gallery.php";

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
  const [isBlocked, setIsBlocked] = useState(false);

  const sortedImages = useMemo(
    () => (isReversed ? [...images].reverse() : images),
    [images, isReversed]
  );

  const createSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[äöü]/g, (char) => ({ ä: "ae", ö: "oe", ü: "ue" }[char] || char))
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const imageUrl = (image: ImageItem) =>
    `${GALLERY_API}?file=${encodeURIComponent(image.path)}`;

  useEffect(() => {
    (async () => {
      setCheckingAuth(true);
      try {
        const authState = await checkAuth();
        setAuthenticated(authState.isAuthenticated);
        setIsBlocked(authState.isBlocked);
        setAuthError(
          authState.isAuthenticated
            ? null
            : "Nicht angemeldet oder Session abgelaufen"
        );
      } catch {
        setAuthenticated(false);
        setAuthError("Verbindungsfehler");
      } finally {
        setCheckingAuth(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!authenticated || isBlocked) return;

    const loadImages = async () => {
      setLoadingImages(true);
      setImageError(null);
      try {
        const response = await fetch(`${GALLERY_API}?action=list`, {
          headers: { Accept: "application/json" },
          credentials: "same-origin",
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setAuthenticated(false);
            setAuthError("Nicht angemeldet oder Session abgelaufen");
          }
          throw new Error("Galerie konnte nicht geladen werden.");
        }

        const data = (await response.json()) as { success: boolean; images?: ImageItem[]; message?: string };
        if (!data.success || !Array.isArray(data.images)) {
          throw new Error(data.message || "Ungültige Galeriedaten.");
        }

        setImages(data.images);
      } catch (error) {
        setImageError(error instanceof Error ? error.message : "Galerie konnte nicht geladen werden.");
      } finally {
        setLoadingImages(false);
      }
    };

    void loadImages();
  }, [authenticated, isBlocked]);

  useEffect(() => {
    if (!authenticated || loadingImages || !title || images.length === 0) return;
    const imageToOpen = images.find((img) => createSlug(img.title) === title);
    if (imageToOpen) {
      setSelectedImage(imageToOpen);
      setOpenDialogsCount(1);
    } else {
      navigate("/archiv/galerie-private", { replace: true });
    }
  }, [authenticated, loadingImages, title, images, navigate]);

  const handleDialogOpenChange = (open: boolean, image: ImageItem) => {
    setOpenDialogsCount((prev) => (open ? prev + 1 : Math.max(prev - 1, 0)));
    if (open) {
      navigate(`/archiv/galerie-private/${createSlug(image.title)}`, { replace: false });
      setSelectedImage(image);
    } else {
      navigate("/archiv/galerie-private", { replace: false });
      setSelectedImage(null);
    }
  };

  if (checkingAuth) {
    return (
      <section className="py-16 animate-fadeIn">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Login-Status wird überprüft…</p>
        </div>
      </section>
    );
  }

  if (isBlocked) {
    return (
      <section className="py-16 animate-fadeIn">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Lock className="w-8 h-8 mx-auto mb-6 text-red-600" />
            <h2 className="text-xl font-semibold mb-3">
              Dein Account wurde gesperrt. Wenn du denkst, dass dies ein Fehler ist, kontaktiere bitte den Vorstand.
            </h2>
            <Link to="/kontakt" className="inline-flex px-6 py-3 bg-club-accent text-white rounded hover:bg-club-dark">
              Kontakt
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!authenticated) {
    return (
      <section className="py-16 animate-fadeIn">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Lock className="w-8 h-8 mx-auto mb-6 text-club-accent" />
            <h2 className="text-xl font-semibold mb-3">
              Tut uns leid, aber dieser Inhalt kann nur mit ausreichender Berechtigung angezeigt werden.
            </h2>
            {authError && <p className="text-sm text-gray-600 mb-4">{authError}</p>}
            <Link to="/login" className="inline-flex px-6 py-3 bg-club-accent text-white rounded hover:bg-club-dark">
              Einloggen
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
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
              <p className="text-yellow-800 text-sm">{imageError}</p>
            </div>
          )}

          <div className="mb-13">
            <div className="flex justify-end items-center mb-6">
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
                {sortedImages.map((image) => (
                  <Dialog
                    key={image.path}
                    open={selectedImage?.path === image.path}
                    onOpenChange={(open) => handleDialogOpenChange(open, image)}
                  >
                    <DialogTrigger asChild>
                      <div className="flex flex-col gap-2 cursor-pointer">
                        <div className="aspect-square relative hover:scale-105 transition-transform overflow-hidden rounded-lg">
                          <img src={imageUrl(image)} alt={image.title} className="object-cover w-full h-full" loading="lazy" />
                        </div>
                        <p className="text-sm text-center text-gray-600">{image.title}</p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{image.title}</DialogTitle>
                      </DialogHeader>
                      <div className="flex justify-center items-center min-h-[60vh]">
                        <img src={imageUrl(image)} alt={image.title} className="max-w-full max-h-[70vh] object-contain" />
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
  );
};

export default GalerieComponent;
