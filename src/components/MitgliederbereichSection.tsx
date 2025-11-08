import { Link, useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { Lock, Image as ImageIcon, LogOut } from "lucide-react";


const MitgliederbereichSection = () => {
  const navigate = useNavigate();
  const venueAnim = useScrollAnimation();
  const boardAnim = useScrollAnimation();
  const feesAnim = useScrollAnimation();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState<string>('');

  // Capitalize first letter of username for display
  const capitalizeFirst = (s: string) => {
    if (!s) return s;
    const trimmed = s.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_username');
    const storedSession = localStorage.getItem('auth_session_id');
    if (!storedUser || !storedSession) {
      setAuthenticated(false);
      setCheckingAuth(false);
      return;
    }

    (async () => {
      setCheckingAuth(true);
      try {
        const res = await fetch('https://sc-laufenburg.de/api/auth.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'check', username: storedUser, session_id: storedSession })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setAuthenticated(true);
          setUsername(storedUser);
        } else {
          setAuthenticated(false);
          localStorage.removeItem('auth_username');
          localStorage.removeItem('auth_session_id');
        }
      } catch (err: any) {
        setAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    const storedUser = localStorage.getItem('auth_username');
    const storedSession = localStorage.getItem('auth_session_id');
    
    if (storedUser && storedSession) {
      try {
        await fetch('https://sc-laufenburg.de/api/auth.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            action: 'logout', 
            username: storedUser, 
            session_id: storedSession 
          })
        });
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
    
    localStorage.removeItem('auth_username');
    localStorage.removeItem('auth_session_id');
    setAuthenticated(false);
    setUsername('');
    navigate('/login');
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
