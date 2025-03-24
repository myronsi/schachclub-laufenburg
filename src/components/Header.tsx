import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Массив с меню-элементами. Для 'Aktuelles' указываем два пути.
  const navItems = [
    { paths: ["/", "/index.html"], label: "Aktuelles" },
    { paths: "/ueberuns", label: "Über uns" },
    { paths: "/mannschaften", label: "Mannschaften" },
    { paths: "/jugend", label: "Jugend" },
    { paths: "/turniere", label: "Turniere" },
    { paths: "/archiv", label: "Archiv" },
    { paths: "/kontakt", label: "Kontakt" },
  ];

  // Keepalive-Funktion, die entweder einen String oder ein Array von Strings akzeptiert
  const isActive = (paths: string | string[]) => {
    if (Array.isArray(paths)) {
      return paths.includes(location.pathname);
    }
    return location.pathname === paths;
  };

  // Funktionen zur Sperrung mobiler Menüs
  const handleMenuClick = useCallback(() => {
    setIsMenuOpen((prevState) => !prevState);
  }, []);

  return (
    <header className="bg-club-primary text-white py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Desktop Link */}
          <Link to="/" className="hidden lg:inline-block text-2xl font-bold">
            Schachclub Laufenburg e. V.
          </Link>
          
          {/* Mobile Link */}
          <Link to="/" className="lg:hidden text-2xl font-bold">
            Schachclub Laufenburg
          </Link>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={handleMenuClick}
              className="p-3 hover:text-club-accent transition-colors"
              aria-label="Menü öffnen"
            >
              {isMenuOpen ? (
                <X size={24} className="w-6 h-6" />
              ) : (
                <Menu size={24} className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={Array.isArray(item.paths) ? item.paths[0] : item.paths}
                className={`relative group py-2 ${
                  isActive(item.paths) ? "text-club-accent" : "text-white"
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-club-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div
            className={`fixed left-0 right-0 top-[64px] bg-club-primary lg:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
            }`}
          >
            <nav className="flex flex-col items-center py-4 gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={Array.isArray(item.paths) ? item.paths[0] : item.paths}
                  className={`relative group py-2 transition-all duration-300 ${
                    isActive(item.paths) ? "text-club-accent" : "text-white"
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? "translateY(0)" : "translateY(-10px)",
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-club-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;