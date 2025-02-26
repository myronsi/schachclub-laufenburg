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
        <Link 
          to="/impressum" 
          className="hover:text-club-accent underline"
        >
          Impressum
        </Link>
        <span className="ml-6 mr-6">Copyright © 2025 SC Laufenburg e.V.</span>
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