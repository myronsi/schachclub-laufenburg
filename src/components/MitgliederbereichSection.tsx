import { Link, useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { Lock, Image as ImageIcon, LogOut } from "lucide-react";
import { checkAuth, logout, startAutoRenewal, stopAutoRenewal } from "@/utils/authService";
import { Button } from "./ui/button";


const MitgliederbereichSection = () => {
  const navigate = useNavigate();
  const venueAnim = useScrollAnimation();
  const boardAnim = useScrollAnimation();
  const feesAnim = useScrollAnimation();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [isBlocked, setIsBlocked] = useState(false);

  const capitalizeFirst = (s: string) => {
    if (!s) return s;
    const trimmed = s.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  };

  useEffect(() => {
    (async () => {
      setCheckingAuth(true);
      try {
        const authState = await checkAuth();
        setAuthenticated(authState.isAuthenticated);
        setUsername(authState.username || '');
        setIsBlocked(authState.isBlocked);
        
        if (authState.isAuthenticated && !authState.isBlocked) {
          startAutoRenewal();
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    })();

    return () => {
      stopAutoRenewal();
    };
  }, []);

  const handleLogout = async () => {
    try {
      stopAutoRenewal();
      await logout();
      setAuthenticated(false);
      setUsername('');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <section id="mitgliederbereich" className="py-16 animate-fadeIn">
        <div className="container mx-auto px-4">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-club-primary">Mitgliederbereich</h1>
                <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                Der exklusive Bereich für Vereinsmitglieder: Hier findest du Protokolle, interne Termine, die geschützte Galerie und Funktionen zur Turnieranmeldung.
                </p>
            </header>

            {checkingAuth ? (
              <div className="max-w-3xl mx-auto bg-white border rounded-lg shadow p-6 text-center">
                <p className="text-gray-600">Login-Status wird überprüft…</p>
              </div>
            ) : isBlocked ? (
            <section className="py-16 animate-fadeIn">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto bg-white border rounded-lg shadow p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                  <div className="rounded-full bg-red-50 p-4">
                    <Lock className="w-8 h-8 text-red-600" />
                  </div>
                  </div>

                  <h2 className="text-xl font-semibold text-red-700 mb-2">Dein Account wurde gesperrt</h2>
                  <p className="text-sm text-gray-600 mb-6">
                  Dein Account wurde gesperrt. Wenn du denkst, dass dies ein Fehler ist, kontaktiere bitte den Vorstand.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/kontakt"
                    className="inline-flex items-center justify-center px-5 py-2 bg-club-accent text-white rounded hover:bg-club-dark"
                  >
                    Kontakt
                  </Link>

                    <button
                    onClick={handleLogout}
                    className="group text-sm p-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-all duration-300 ease-in-out whitespace-nowrap flex items-center overflow-hidden hover:px-4"
                    >
                    <LogOut className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden md:block max-w-0 opacity-0 translate-x-2 group-hover:max-w-xs group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-300 ease-in-out overflow-hidden">
                      Abmelden
                    </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ) : authenticated ? (
              <div className="max-w-3xl mx-auto bg-white border rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Willkommen zurück, {capitalizeFirst(username)}!</h2>
                    <p className="text-sm text-gray-600 mt-1">Du bist angemeldet und hast Zugriff auf alle Mitgliederbereiche.</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Abmelden
                  </button>
                </div>

                <h3 className="text-lg font-semibold mb-4">Verfügbare Bereiche</h3>
                <div className="grid gap-4">
                  <Link 
                    to="/archiv/galerie" 
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="rounded-full bg-club-accent/10 p-3">
                      <ImageIcon className="h-6 w-6 text-club-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-club-primary">Fotogalerie</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Exklusive Turnier- und Vereinsfotos aus unserer umfangreichen Sammlung
                      </p>
                    </div>
                  </Link>

                  {/* Future member areas can be added here */}
                  {/* <Link 
                    to="/mitgliederbereich/protokolle" 
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors opacity-50 pointer-events-none"
                  >
                    <div className="rounded-full bg-club-accent/10 p-3">
                      <FileText className="h-6 w-6 text-club-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-club-primary">Protokolle</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Vereinsprotokolle und wichtige Dokumente (Demnächst verfügbar)
                      </p>
                    </div>
                  </Link> */}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto bg-white border rounded-lg shadow p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="rounded-full bg-club-accent/10 p-4">
                    <Lock className="w-8 h-8 text-club-accent" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-3 text-center">Tut uns leid, aber dieser Inhalt kann nur mit ausreichender Berechtigung angezeigt werden.</h2>
                
                <div className="mt-6 flex justify-center">
                  <Link to="/login" className="inline-flex px-6 py-3 bg-club-accent text-white rounded hover:bg-club-dark">
                    Einloggen
                  </Link>
                </div>

                <hr className="my-8" />

                <h2 className="text-xl font-semibold mb-3">Für Mitglieder des Schachclubs die keinen Account besitzen</h2>
                <p className="text-gray-700">
                  Falls du bereits Mitglied in unserem Schachclub bist, aber noch keinen Account besitzt, schreibe uns einfach über die Kontaktseite. Wir legen deinen Account schnell für dich an.
                </p>

                <div className="mt-6 flex items-center gap-3">
                    <Link to="/kontakt" className="inline-flex px-4 py-2 border border-gray-200 rounded hover:bg-gray-50">Kontakt</Link>
                </div>
              </div>
            )}
        </div>
    </section>
  );
};

export default MitgliederbereichSection;
