import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [needsPasswordChange, setNeedsPasswordChange] = useState(false);
  const [tempSessionId, setTempSessionId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [settingPassword, setSettingPassword] = useState(false);

  useState(() => {
    const storedUser = localStorage.getItem('auth_username');
    const storedSession = localStorage.getItem('auth_session_id');
    if (storedUser && storedSession) {
      (async () => {
        setLoading(true);
        try {
          const res = await fetch('https://sc-laufenburg.de/api/auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'check', username: storedUser, session_id: storedSession })
          });
          const data = await res.json();
          if (res.ok && data.success) {
            if (data.must_change_password) {
              setNeedsPasswordChange(true);
              setTempSessionId(storedSession);
              setUsername(storedUser);
              setMessage('Bitte neues Passwort setzen');
            } else {
              setSuccess(true);
              setUsername(storedUser);
              setMessage('Angemeldet als ' + storedUser);
            }
          } else {
            localStorage.removeItem('auth_username');
            localStorage.removeItem('auth_session_id');
          }
        } catch (err) {
        } finally {
          setLoading(false);
        }
      })();
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setSuccess(false);

    try {
      const res = await fetch('https://sc-laufenburg.de/api/auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // If server requires a password change (initial plaintext password), prompt for it
        if (data.must_change_password) {
          setNeedsPasswordChange(true);
          setTempSessionId(data.session_id || null);
          setMessage(data.message || 'Bitte neues Passwort setzen');
        } else {
          setSuccess(true);
          setMessage(data.message || 'Erfolgreich angemeldet');
          if (data.session_id) {
            localStorage.setItem('auth_username', username);
            localStorage.setItem('auth_session_id', data.session_id);
          }
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
              onClick={() => {
                localStorage.removeItem('auth_username');
                localStorage.removeItem('auth_session_id');
                setSuccess(false);
                setUsername('');
                setPassword('');
                setMessage('Abgemeldet');
              }}
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
                  if (newPassword.length < 6) { setMessage('Passwort muss mindestens 6 Zeichen lang sein'); return; }
                  if (newPassword !== confirmNewPassword) { setMessage('Passwörter stimmen nicht überein'); return; }
                  if (!tempSessionId) { setMessage('Session ungültig'); return; }
                  setSettingPassword(true);
                  try {
                    const res = await fetch('https://sc-laufenburg.de/api/auth.php', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ action: 'set_password', username, session_id: tempSessionId, new_password: newPassword })
                    });
                    const data = await res.json();
                    if (res.ok && data.success) {
                      // store session and mark success
                      localStorage.setItem('auth_username', username);
                      if (tempSessionId) localStorage.setItem('auth_session_id', tempSessionId);
                      setSuccess(true);
                      setNeedsPasswordChange(false);
                      setMessage('Passwort gesetzt. Eingeloggt.');
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
                    <Input name="new_password" type="password" placeholder="Neues Passwort" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                  </div>
                  <div>
                    <label className="text-sm/5 font-medium pb-1 block">Passwort wiederholen</label>
                    <Input name="confirm_new_password" type="password" placeholder="Passwort wiederholen" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
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
                  <Input name="username" placeholder="Benutzername" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                  <label className="text-sm/5 font-medium pb-1 block">Passwort</label>
                  <Input name="password" type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
