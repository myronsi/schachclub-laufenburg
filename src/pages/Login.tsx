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

  useState(() => {
    const storedUser = localStorage.getItem('auth_username');
    const storedSession = localStorage.getItem('auth_session_id');
    if (storedUser && storedSession) {
      (async () => {
        setLoading(true);
        try {
          const res = await fetch('https://viserix.com/auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'check', username: storedUser, session_id: storedSession })
          });
          const data = await res.json();
          if (res.ok && data.success) {
            setSuccess(true);
            setUsername(storedUser);
            setMessage('Angemeldet als ' + storedUser);
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
      const res = await fetch('https://viserix.com/auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setMessage(data.message || 'Erfolgreich angemeldet');
        if (data.session_id) {
          localStorage.setItem('auth_username', username);
          localStorage.setItem('auth_session_id', data.session_id);
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
        )}
      </div>
    </section>
  );
};

export default Login;
