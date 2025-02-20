
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-club-primary text-white py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Desktop Link */}
          <Link 
            to="/" 
            className="hidden lg:inline-block text-2xl font-bold"
          >
            Schachclub Laufenburg e. V.
          </Link>
          
          {/* Mobile Link */}
          <Link 
            to="/" 
            className="lg:hidden text-2xl font-bold"
          >
            Schachclub Laufenburg
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8">
            {[
              { path: "/", label: "Home" },
              { path: "/ueberuns", label: "Über uns" },
              { path: "/mannschaften", label: "Mannschaften" },
              { path: "/jugend", label: "Jugend" },
              { path: "/turniere", label: "Turniere" },
              { path: "/archiv", label: "Archiv" },
              { path: "/kontakt", label: "Kontakt" },
            ].map((item) => (
              <Link
                key={item.path}
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

          {/* Mobile Navigation mit Animation */}
          <div 
            className={`fixed inset-x-0 top-[64px] bg-club-primary lg:hidden transition-all duration-300 ease-in-out transform ${
              isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}
          >
            <nav className="flex flex-col items-center py-4 gap-4">
              {[
                { path: "/", label: "Home" },
                { path: "/ueberuns", label: "Über uns" },
                { path: "/mannschaften", label: "Mannschaften" },
                { path: "/jugend", label: "Jugend" },
                { path: "/turniere", label: "Turniere" },
                { path: "/archiv", label: "Archiv" },
                { path: "/kontakt", label: "Kontakt" },
              ].map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative group py-2 transition-all duration-300 delay-[${index * 50}ms] transform ${
                    isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                  } ${isActive(item.path) ? "text-club-accent" : "text-white"}`}
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
