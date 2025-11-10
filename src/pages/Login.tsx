import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { 
  login, 
  logout, 
  checkAuth, 
  setPassword as changePassword, 
  startAutoRenewal, 
  stopAutoRenewal 
} from "@/utils/authService";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [needsPasswordChange, setNeedsPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [settingPassword, setSettingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const authState = await checkAuth();
        if (authState.isAuthenticated) {
          if (authState.isBlocked) {
            setMessage('Dein Account wurde gesperrt. Bitte kontaktiere den Vereinsvorstand.');
            setSuccess(false);
          } else if (authState.mustChangePassword) {
            setNeedsPasswordChange(true);
            setUsername(authState.username || '');
            setMessage('Bitte neues Passwort setzen');
          } else {
            startAutoRenewal();
            navigate('/mitgliederbereich');
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      stopAutoRenewal();
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setSuccess(false);

    try {
      const data = await login(username, password);
      
      if (data.success) {
        const authState = await checkAuth();
        
        if (authState.isBlocked) {
          setMessage('Dein Account wurde gesperrt. Bitte kontaktiere den Vereinsvorstand für weitere Informationen.');
          setSuccess(false);
        } else if (data.must_change_password) {
          setNeedsPasswordChange(true);
          setMessage(data.message || 'Bitte neues Passwort setzen');
        } else {
          startAutoRenewal();
          navigate('/mitgliederbereich');
        }
      } else {
        setMessage(data.message || 'Anmeldung fehlgeschlagen');
      }
    } catch (err: any) {
      setMessage('Verbindungsfehler: ' + String(err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      stopAutoRenewal();
      await logout();
      setSuccess(false);
      setUsername('');
      setPassword('');
      setMessage('Abgemeldet');
    } catch (err) {
      console.error('Logout error:', err);
      setMessage('Fehler beim Abmelden');
    }
  };

  return (
    <section className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          {success ? (
            <>
              <h2 className="text-3xl font-bold text-club-primary">Erfolgreich angemeldet als {username}</h2>
              <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Willkommen zurück.</p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-club-primary">Login</h2>
              <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                Melde dich mit deinem Benutzernamen und Passwort an, um auf den
                geschützten Bereich zuzugreifen.
              </p>
            </>
          )}
        </header>

        {success ? (
          <div className="max-w-md mx-auto flex justify-center">
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </Button>
          </div>
        ) : (
          needsPasswordChange ? (
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-lg">Neues Passwort setzen</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={async (ev) => {
                  ev.preventDefault();
                  if (newPassword.length < 6) { 
                    setMessage('Passwort muss mindestens 6 Zeichen lang sein'); 
                    return; 
                  }
                  if (newPassword !== confirmNewPassword) { 
                    setMessage('Passwörter stimmen nicht überein'); 
                    return; 
                  }
                  
                  setSettingPassword(true);
                  try {
                    const data = await changePassword(newPassword);
                    if (data.success) {
                      setMessage('Passwort erfolgreich geändert');
                      startAutoRenewal();
                      setTimeout(() => navigate('/mitgliederbereich'), 1000);
                    } else {
                      setMessage(data.message || 'Fehler beim Setzen des Passworts');
                    }
                  } catch (err: any) {
                    setMessage('Verbindungsfehler: ' + String(err?.message || err));
                  } finally {
                    setSettingPassword(false);
                  }
                }}>
                  <div>
                    <label className="text-sm/5 font-medium pb-1 block">Neues Passwort</label>
                    <div className="relative">
                      <Input 
                        name="new_password" 
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Neues Passwort" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required 
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
                      >
                        {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm/5 font-medium pb-1 block">Passwort wiederholen</label>
                    <Input 
                      name="confirm_new_password" 
                      type="password"
                      placeholder="Passwort wiederholen" 
                      value={confirmNewPassword} 
                      onChange={(e) => setConfirmNewPassword(e.target.value)} 
                      required 
                      className="pr-10"
                    />
                  </div>

                  {message && (
                    <div className={`${success ? 'text-green-600' : 'text-red-600'} text-sm`}>{message}</div>
                  )}

                  <Button type="submit" className="w-full bg-club-accent hover:bg-club-accent/90" disabled={settingPassword}>{settingPassword ? 'Bitte warten...' : 'Passwort setzen'}</Button>

                </form>
              </CardContent>
            </Card>
          ) : (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">Anmelden</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm/5 font-medium pb-1 block">Benutzername</label>
                  <Input 
                    name="username" 
                    placeholder="Benutzername" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required />
                </div>
                <div>
                  <label className="text-sm/5 font-medium pb-1 block">Passwort</label>
                  <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
                  >
                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  </div>
                </div>

                {message && (
                  <div className={`${success ? 'text-green-600' : 'text-red-600'} text-sm`}>{message}</div>
                )}

                <Button type="submit" className="w-full bg-club-accent hover:bg-club-accent/90" disabled={loading}>{loading ? 'Bitte warten...' : 'Anmelden'}</Button>

                <div className="text-sm text-center">
                  <Link to="/kontakt" className="underline">Passwort vergessen?</Link>
                </div>
              </form>
            </CardContent>
          </Card>
          )
        )}
      </div>
    </section>
  );
};

export default Login;
