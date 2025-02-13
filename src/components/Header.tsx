import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-club-primary text-white py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Schachclub Laufenburg e. V.
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
            <Link to="/" className="hover:text-club-accent transition-colors">
              Home
            </Link>
            <Link to="/ueberuns" className="hover:text-club-accent transition-colors">
              Über uns
            </Link>
            <Link to="/mannschaften" className="hover:text-club-accent transition-colors">
              Mannschaften
            </Link>
            <Link to="/jugend" className="hover:text-club-accent transition-colors">
              Jugend
            </Link>
            <Link to="/turniere" className="hover:text-club-accent transition-colors">
              Turniere
            </Link>
            <Link to="/archiv" className="hover:text-club-accent transition-colors">
              Archiv
            </Link>
            <Link to="/kontakt" className="hover:text-club-accent transition-colors">
              Kontakt
            </Link>
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="absolute top-full left-0 w-full bg-club-primary lg:hidden">
              <div className="flex flex-col items-center py-4 gap-4">
                <Link
                  to="/"
                  className="hover:text-club-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/ueberuns"
                  className="hover:text-club-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Über uns
                </Link>
                <Link
                  to="/mannschaften"
                  className="hover:text-club-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mannschaften
                </Link>
                <Link
                  to="/jugend"
                  className="hover:text-club-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Jugend
                </Link>
                <Link
                  to="/turniere"
                  className="hover:text-club-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Turniere
                </Link>
                <Link
                  to="/archiv"
                  className="hover:text-club-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Archiv
                </Link>
                <Link
                  to="/kontakt"
                  className="hover:text-club-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kontakt
                </Link>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;