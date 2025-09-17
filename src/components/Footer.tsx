import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { LAST_MODIFIED as ContactLastModified } from "@/pages/Contact";
import { LAST_MODIFIED as AboutLastModified } from "@/pages/About";
import { LAST_MODIFIED as TournamentsLastModified } from "@/pages/Tournaments";
import { LAST_MODIFIED as MannschaftenLastModified } from "@/pages/Mannschaften";
import { LAST_MODIFIED as MediaLastModified } from "@/pages/Media";
import { LAST_MODIFIED as YouthLastModified } from "@/pages/Youth";
import { LAST_MODIFIED as HomeLastModified } from "@/pages/Home";
import { LAST_MODIFIED as ImpressumLastModified } from "@/pages/Impessum";
import { LAST_MODIFIED as DatenschutzLastModified } from "@/pages/Datenschutz";

const Footer = () => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page");

  const pageLastModified: Record<string, string> = {
    'ueberuns': AboutLastModified,
    'mannschaften': MannschaftenLastModified,
    'jugend': YouthLastModified,
    'turniere': TournamentsLastModified,
    'archiv': MediaLastModified,
    'kontakt': ContactLastModified,
    'impressum': ImpressumLastModified,
    'datenschutz': DatenschutzLastModified,
    'home': HomeLastModified,
  };

  const lastModifiedDate = currentPage 
    ? pageLastModified[currentPage]
    : HomeLastModified;

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split('.');
    return new Date(`${year}-${month}-${day}`).toLocaleDateString('de-DE');
  };

  return (
    <footer className="mt-auto py-4 bg-gray-100 shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm">
        <div className="flex flex-col mr-6">
          <Link 
            to="/?page=impressum" 
            className="hover:text-club-accent underline"
          >
            Impressum
          </Link>
          <Link 
            to="/?page=datenschutz" 
            className="hover:text-club-accent underline mt-1"
          >
            Datenschutz
          </Link>
        </div>
        <span className="mr-4">Copyright © 2025 SC Laufenburg e.V.</span>
        {lastModifiedDate && (
          <span className="text-gray-600">
            Letzte Änderung: {formatDate(lastModifiedDate)}
          </span>
        )}
      </div>
    </footer>
  );
};

export default Footer;