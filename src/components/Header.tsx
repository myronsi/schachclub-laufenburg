import { useState, useCallback } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {  Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileArchivOpen, setMobileArchivOpen] = useState(false);
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
    <header className="sticky top-0 bg-club-primary text-white py-4 w-full z-50" style={{ boxShadow: '0 -12px 24px rgba(0,0,0,0.24), 0 6px 12px rgba(0,0,0,0.06)' }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          {/* Desktop Link */}

          
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
            {navItems.map((item) =>
              item.path === "/archiv" ? (
                <div key={item.label} className="relative group">
                  <Link
                    to={item.path}
                    className={`relative inline-block py-2 ${
                      isActive(item.path) ? "text-club-accent" : "text-white"
                    }`}
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {item.label}
                  </Link>
                  {/* improved desktop dropdown animation: translate + opacity for smooth slide */}
                  <div className="absolute left-0 top-full w-44 bg-club-primary text-white rounded shadow-lg opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transform transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto origin-top">
                    <Link to="/archiv/chronik" className="block px-4 py-2 hover:bg-club-accent/10" role="menuitem">Chronik</Link>
                    <Link to="/archiv/galerie" className="block px-4 py-2 hover:bg-club-accent/10" role="menuitem">Galerie</Link>
                    <Link to="/archiv/dokumente" className="block px-4 py-2 hover:bg-club-accent/10" role="menuitem">Dokumente</Link>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`relative group py-2 ${
                    isActive(item.path) ? "text-club-accent" : "text-white"
                  }`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-club-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </Link>
              )
            )}
          </nav>

          {/* Mobile Navigation */}
          <div
            className={`absolute left-0 right-0 top-full w-full bg-club-primary lg:hidden overflow-hidden transition-all duration-300 ease-in-out transform shadow-lg z-[100] ${
              isMenuOpen ? "max-h-[600px]" : "max-h-0"
            }`}
          >
            <nav className="flex flex-col items-center py-4 gap-2 px-4">
              {navItems.map((item, index) =>
                item.path === "/archiv" ? (
                  <div
                    key={item.label}
                    className="w-full"
                    style={{
                      transitionDelay: `${index * 50}ms`,
                      opacity: isMenuOpen ? 1 : 0,
                      transform: isMenuOpen ? "translateY(0)" : "translateY(-10px)",
                    }}
                  >
                    <button
                      onClick={() => setMobileArchivOpen((s) => !s)}
                      className={`w-full flex items-center justify-center gap-1 py-2 px-2 transition-all ${isActive(item.path) ? "" : ""}`}
                      aria-expanded={mobileArchivOpen}
                      aria-haspopup="true"
                      style={{
                        transitionDelay: `${index * 50}ms`,
                        opacity: isMenuOpen ? 1 : 0,
                        transform: isMenuOpen ? "translateY(0)" : "translateY(-10px)",
                      }}
                    >
                      <span className={isActive(item.path) ? "text-club-accent" : "text-white"}>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileArchivOpen ? "rotate-180" : ""}`} />
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 ease-in-out transform origin-top ${mobileArchivOpen ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}>
                      <div className="flex flex-col items-center gap-1 py-2">
                        <Link
                          to="/archiv/chronik"
                          className="inline-block py-2 px-4 text-center transition-all"
                          style={{
                            transitionDelay: `${index * 50 + 100}ms`,
                            opacity: mobileArchivOpen ? 1 : 0,
                            transform: mobileArchivOpen ? "translateY(0)" : "translateY(-6px)",
                          }}
                          onClick={() => { setIsMenuOpen(false); setMobileArchivOpen(false); }}
                        >
                          Chronik
                        </Link>
                        <Link
                          to="/archiv/galerie"
                          className="inline-block py-2 px-4 text-center transition-all"
                          style={{
                            transitionDelay: `${index * 50 + 140}ms`,
                            opacity: mobileArchivOpen ? 1 : 0,
                            transform: mobileArchivOpen ? "translateY(0)" : "translateY(-6px)",
                          }}
                          onClick={() => { setIsMenuOpen(false); setMobileArchivOpen(false); }}
                        >
                          Galerie
                        </Link>
                        <Link
                          to="/archiv/dokumente"
                          className="inline-block py-2 px-4 text-center transition-all"
                          style={{
                            transitionDelay: `${index * 50 + 140}ms`,
                            opacity: mobileArchivOpen ? 1 : 0,
                            transform: mobileArchivOpen ? "translateY(0)" : "translateY(-6px)",
                          }}
                          onClick={() => { setIsMenuOpen(false); setMobileArchivOpen(false); }}
                        >
                          Dokumente
                        </Link>
                      </div>
                     </div>
                   </div>
                 ) : (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`relative group py-2 transition-all duration-300 w-full text-center ${
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
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;