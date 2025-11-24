import { Link, useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useCallback } from "react";
import { Lock, Image as ImageIcon, LogOut, Bell, Mail as MailIcon, Check, X } from "lucide-react";
import { checkAuth, logout, startAutoRenewal, stopAutoRenewal, getToken } from "@/utils/authService";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";


const MitgliederbereichSection = () => {
  const navigate = useNavigate();
  const venueAnim = useScrollAnimation();
  const boardAnim = useScrollAnimation();
  const feesAnim = useScrollAnimation();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [profileEmail, setProfileEmail] = useState('');
  const [notifyEvents, setNotifyEvents] = useState(false);
  const [initialEmail, setInitialEmail] = useState('');
  const [initialNotifyEvents, setInitialNotifyEvents] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  const capitalizeFirst = (s: string) => {
    if (!s) return s;
    const trimmed = s.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  };

  const isValidEmail = (email: string): boolean => {
    if (!email) return false;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
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
        if (authState.isAuthenticated) {
          loadProfile();
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

  const loadProfile = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    setProfileLoading(true);
    try {
      const res = await fetch('https://sc-laufenburg.de/api/user_profile.php', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      const email = data.email || '';
      const notify = Boolean(data.notify_events);
      setProfileEmail(email);
      setNotifyEvents(notify);
      setInitialEmail(email);
      setInitialNotifyEvents(notify);
    } catch (err) {
      console.error('Failed to load profile', err);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  const saveProfile = async () => {
    const token = getToken();
    if (!token) return;
    setProfileMessage(null);
    setProfileLoading(true);
    try {
      const res = await fetch('https://sc-laufenburg.de/api/user_profile.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: profileEmail, notify_events: notifyEvents ? 1 : 0 })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProfileMessage('Einstellungen gespeichert');
        setInitialEmail(profileEmail);
        setInitialNotifyEvents(notifyEvents);
        setTimeout(() => setProfileMessage(null), 3000);
      } else {
        setProfileMessage(data.message || 'Fehler beim Speichern');
      }
    } catch (err: any) {
      console.error('Save profile failed', err);
      setProfileMessage('Netzwerkfehler');
    } finally {
      setProfileLoading(false);
    }
  };

  const hasChanges = profileEmail !== initialEmail || notifyEvents !== initialNotifyEvents;
  const canSave = hasChanges && (!profileEmail || isValidEmail(profileEmail));

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
                  <Card className="hover:shadow-md transition-shadow">
                    <Link 
                      to="/archiv/galerie" 
                      className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="rounded-full bg-club-accent/10 p-3">
                        <ImageIcon className="h-6 w-6 text-club-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-club-primary">Bildergalerie</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Exklusive Turnier- und Vereinsbilder aus unserer umfangreichen Sammlung
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
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-club-accent" />
                        <CardTitle className="text-base">Benachrichtigungen</CardTitle>
                      </div>
                      <CardDescription>
                        Möchtest du E-Mail-Benachrichtigungen über zukünftige Ereignisse erhalten?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="notifyEvents"
                          checked={notifyEvents}
                          onCheckedChange={(checked) => setNotifyEvents(!!checked)}
                        />
                        <Label htmlFor="notifyEvents" className="text-sm font-normal cursor-pointer">
                          E-Mail-Benachrichtigungen erhalten
                        </Label>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="profileEmail" className="flex items-center gap-2">
                          <MailIcon className="h-4 w-4" />
                          E-Mail-Adresse
                        </Label>
                        <div className="relative">
                          <Input
                            id="profileEmail"
                            type="email"
                            value={profileEmail}
                            onChange={(e) => setProfileEmail(e.target.value)}
                            placeholder="deine@email.de"
                            disabled={profileLoading}
                            className="pr-10"
                          />
                          {profileEmail && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              {isValidEmail(profileEmail) ? (
                                <Check className="h-5 w-5 text-green-600" />
                              ) : (
                                <X className="h-5 w-5 text-red-600" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {hasChanges && (
                        <Button
                          onClick={saveProfile}
                          disabled={profileLoading || !canSave}
                          className="w-full sm:w-auto bg-club-accent hover:bg-club-dark disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {profileLoading ? 'Speichern...' : 'Änderungen speichern'}
                        </Button>
                      )}

                      {profileMessage && (
                        <Alert className={profileMessage.includes('gespeichert') ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}>
                          <AlertDescription className={profileMessage.includes('gespeichert') ? 'text-green-800' : 'text-yellow-800'}>
                            {profileMessage}
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
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
