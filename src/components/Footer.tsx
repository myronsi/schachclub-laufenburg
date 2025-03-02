import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  
  const pathLastModified: Record<string, string> = {
    '/': HomeLastModified,
    '/ueberuns': AboutLastModified,
    '/mannschaften': MannschaftenLastModified,
    '/jugend': YouthLastModified,
    '/turniere': TournamentsLastModified,
    '/archiv': MediaLastModified,
    '/kontakt': ContactLastModified,
    '/impressum': ImpressumLastModified,
    '/datenschutz': DatenschutzLastModified,
  };

  const lastModifiedDate = pathLastModified[location.pathname];
  
  let formattedDate = '';
  if (lastModifiedDate) {
    const date = new Date(lastModifiedDate.split('.').reverse().join('-'));
    formattedDate = date.toLocaleDateString('de-DE');
  }

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
      {formattedDate && (
        <span className="text-gray-600">
          Letzte Änderung: {formattedDate}
        </span>
      )}
    </div>
  </footer>
  );
};

export default Footer;