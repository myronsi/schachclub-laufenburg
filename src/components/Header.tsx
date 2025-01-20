import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-club-primary text-white py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Schachclub Laufenburg</div>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8">
            <a href="#home" className="hover:text-club-accent transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-club-accent transition-colors">
              Über uns
            </a>
            <a href="#teams" className="hover:text-club-accent transition-colors">
              Teams
            </a>
            <a href="#youth" className="hover:text-club-accent transition-colors">
              Jugend
            </a>
            <a href="#tournaments" className="hover:text-club-accent transition-colors">
              Turniere
            </a>
            <a href="#media" className="hover:text-club-accent transition-colors">
              Medien
            </a>
            <a href="#contact" className="hover:text-club-accent transition-colors">
              Kontakt
            </a>
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="absolute top-full left-0 w-full bg-club-primary lg:hidden">
              <div className="flex flex-col items-center py-4 gap-4">
                <a
                  href="#home"
                  className="hover:text-club-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="hover:text-club-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Über uns
                </a>
                <a
                  href="#teams"
                  className="hover:text-club-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Teams
                </a>
                <a
                  href="#youth"
                  className="hover:text-club-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Jugend
                </a>
                <a
                  href="#tournaments"
                  className="hover:text-club-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Turniere
                </a>
                <a
                  href="#media"
                  className="hover:text-club-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Medien
                </a>
                <a
                  href="#contact"
                  className="hover:text-club-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kontakt
                </a>
              </div>
            </nav>
          )}

          <Button
            className="hidden lg:block bg-club-accent hover:bg-club-accent/90"
          >
            Mitglied werden
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;