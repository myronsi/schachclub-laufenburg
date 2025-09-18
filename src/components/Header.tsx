import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Aktuelles" },
    { path: "/ueberuns", label: "Über uns" },
    { path: "/mannschaften", label: "Mannschaften" },
    { path: "/jugend", label: "Jugend" },
    { path: "/turniere", label: "Turniere" },
    { path: "/archiv", label: "Archiv" },
    { path: "/kontakt", label: "Kontakt" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleMenuClick = useCallback(() => {
    setIsMenuOpen((prevState) => !prevState);
  }, []);

  return (
    <header className="sticky top-0 bg-club-primary text-white py-4 w-full shadow-md z-50">
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
                to={item.path}
                className={`relative group py-2 ${
                  isActive(item.path) ? "text-club-accent" : "text-white"
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-club-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div
            className={`absolute left-0 right-0 top-full w-full bg-club-primary lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out shadow-lg z-[100] ${
              isMenuOpen ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            <nav className="flex flex-col items-center py-4 gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`relative group py-2 transition-all duration-300 ${
                    isActive(item.path) ? "text-club-accent" : "text-white"
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