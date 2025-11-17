import { Card } from "@/components/ui/card";
import { Mail, MapPin, Users, Landmark, Scale } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const ImpressumSection = () => {
  const animations = [
    useScrollAnimation(),
    useScrollAnimation(),
    useScrollAnimation(),
    useScrollAnimation()
  ];

  return (
  <>
    <section id="impressum" className="py-16 container mx-auto px-4 md:pb-20 animate-fadeIn">
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h2 className="text-3xl font-bold text-club-primary">Impressum</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Informationen zu unserem Verein, den Verantwortlichen, Registereinträgen und rechtlichen Hinweisen.
          </p>
        </header>
        <div className="grid md:grid-cols-2 gap-8 justify-items-center">
          {/* Registergericht */}
          <Card 
            ref={animations[0].elementRef}
            className={`p-6 opacity-0 w-full max-w-md ${animations[0].isVisible ? 'animate-slideInLeft' : ''}`}
          >
            <h3 className="text-xl font-semibold mb-6">Registergericht</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Landmark className="text-club-accent" size={20} />
                <span>Amtsgericht Freiburg</span>
              </div>
              <div className="flex items-center gap-3">
                <Scale className="text-club-accent" size={20} />
                <span>Vereinsregisternummer: VR 630592</span>
              </div>
            </div>
          </Card>

          {/* Vorsitzender */}
          <Card 
            ref={animations[1].elementRef}
            className={`p-6 opacity-0 w-full max-w-md ${animations[1].isVisible ? 'animate-slideInRight' : ''}`}
          >
            <h3 className="text-xl font-semibold mb-6">Vorsitzender</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="text-club-accent" size={20} />
                <span>Benno Moser</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-club-accent" size={20} />
                <span>Schillerstraße 6, 79725 Laufenburg</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-club-accent" size={20} />
                <a href="mailto:1.Vorsitzender@sc-laufenburg.de" className="underline hover:text-club-accent">1.Vorsitzender@sc-laufenburg.de</a>
              </div>
            </div>
          </Card>

          {/* Webmaster */}
          <Card 
            ref={animations[2].elementRef}
            className={`p-6 opacity-0 w-full max-w-md ${animations[2].isVisible ? 'animate-slideInLeft' : ''}`}
          >
            <h3 className="text-xl font-semibold mb-6">Webmaster</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="text-club-accent" size={20} />
                <span>Myron Ilchenko</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-club-accent" size={20} />
                <a href="mailto:myron.ilchenko@gmail.com" className="underline hover:text-club-accent">myron.ilchenko@gmail.com</a>
              </div>
            </div>
          </Card>

          {/* Haftungshinweis */}
          <Card 
            ref={animations[3].elementRef}
            className={`p-6 opacity-0 w-full max-w-md ${animations[3].isVisible ? 'animate-slideInRight' : ''}`}
          >
            <h3 className="text-xl font-semibold mb-6">Haftungshinweis</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm">Auf der Seite <a href="https://sc-laufenburg.de" className="underline hover:text-club-accent">sc-laufenburg.de</a> sind Links zu anderen Seiten im Internet gelegt. Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
    <div className="mt-auto py-4 bg-gray-100 shadow-[0_-2px_8px_rgba(0,0,0,0.1)] md:fixed md:bottom-0 md:left-0 md:right-0 md:z-40 md:mt-0">
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
          <span className="text-center sm:text-right">Copyright © 2000 - {new Date().getFullYear()} SC Laufenburg e.V.</span>
          <span className="text-gray-600">
            Letzte Änderung: 18.09.2025
          </span>
        </div>
    </div>
  </>
  );
};

export default ImpressumSection;
