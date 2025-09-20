import { Link, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { LAST_MODIFIED as ImpressumLastModified } from "@/pages/Impessum";
import { LAST_MODIFIED as DatenschutzLastModified } from "@/pages/Datenschutz";

const Footer = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const queryPage = searchParams.get("page");

  // Prefer explicit query param, otherwise derive from the pathname so the footer
  // shows on /impressum and /datenschutz without needing ?page=...
  const currentPage = queryPage
    ? queryPage
    : location.pathname.includes("/impressum")
    ? 'impressum'
    : location.pathname.includes("/datenschutz")
    ? 'datenschutz'
    : null;

  const pageLastModified: Record<string, string> = {
    'impressum': ImpressumLastModified,
    'datenschutz': DatenschutzLastModified,
  };

  const lastModifiedDate = currentPage
    ? pageLastModified[currentPage]
    : undefined;

  if (!lastModifiedDate) return null;

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split('.');
    return new Date(`${year}-${month}-${day}`).toLocaleDateString('de-DE');
  };

  return (
    <footer className="mt-auto py-4 bg-gray-100 shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm">
        <div className="flex flex-col mr-6">
          <Link 
            to="/impressum" 
            className="hover:text-club-accent underline"
          >
            Impressum
          </Link>
          <Link 
            to="/datenschutz" 
            className="hover:text-club-accent underline mt-1"
          >
            Datenschutz
          </Link>
        </div>
        <span className="mr-4">Copyright © 2025 SC Laufenburg e.V.</span>
        {lastModifiedDate ? (
          <span className="text-gray-600">
            Letzte Änderung: {formatDate(lastModifiedDate)}
          </span>
        ) : null}
      </div>
    </footer>
  );
};

export default Footer;