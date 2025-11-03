import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, FormEvent, useEffect, useRef } from "react";
import { Mail, Heart, BookOpen, Calendar, Clock, Check, ChevronsUpDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const MitgliedwerdenSection = () => {
  const introAnim = useScrollAnimation();
  const stepsAnim = useScrollAnimation();
  const newcomerAnim = useScrollAnimation();
  const navigate = useNavigate();

  const [newcomerData, setNewcomerData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    message: "",
    subject: ""
  });
  const [submittingNewcomer, setSubmittingNewcomer] = useState(false);
  const [newcomerError, setNewcomerError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const MAX_FILES = 2;
  const MAX_TOTAL_SIZE = 5 * 1024 * 1024;
  const formRef = useRef<HTMLFormElement | null>(null);
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const [recaptchaWidgetId, setRecaptchaWidgetId] = useState<number | null>(null);

  const RECAPTCHA_SITE_KEY = '6Lez6-YrAAAAAGry5l1Uvpt7GMD8u0AZJ0meBxQP';

  const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);

  const filesTotalSize = selectedFiles.reduce((s, f) => s + f.size, 0);
  const filesWithinLimits = selectedFiles.length <= MAX_FILES && filesTotalSize <= MAX_TOTAL_SIZE;

  const basicFieldsFilled = !!(newcomerData.name && newcomerData.email && newcomerData.subject && newcomerData.message && isEmailValid(newcomerData.email));
  const formIsValid = formRef.current ? formRef.current.checkValidity() : basicFieldsFilled;
  const canSubmit = formIsValid && filesWithinLimits && !submittingNewcomer && !!recaptchaToken;

  const handleNewcomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewcomerData({ ...newcomerData, [e.target.name]: e.target.value });
  };

  const handleNewcomerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmittingNewcomer(true);
    setNewcomerError("");

    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      setNewcomerError('Bitte füllen Sie alle Pflichtfelder korrekt aus.');
      setSubmittingNewcomer(false);
      return;
    }

    if (!newcomerData.subject) {
      setNewcomerError('Bitte Betreff auswählen.');
      setSubmittingNewcomer(false);
      return;
    }
    if (!filesWithinLimits) {
      if (selectedFiles.length > MAX_FILES) {
        setNewcomerError(`Maximal ${MAX_FILES} Dateien erlaubt.`);
      } else {
        setNewcomerError('Die Gesamtgröße der Dateien darf 5 MB nicht überschreiten.');
      }
      setSubmittingNewcomer(false);
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(newcomerData).forEach(([k, v]) => {
        formData.append(k, String(v ?? ""));
      });
      selectedFiles.forEach((file, i) => {
        formData.append('files[]', file);
      });
        if (recaptchaToken) {
          formData.append('g-recaptcha-response', recaptchaToken);
        }

      const response = await fetch('/formmail-80.php', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        navigate('/kontakt-ok');
      } else {
        setNewcomerError('Fehler beim Senden. Bitte später erneut versuchen.');
      }
    } catch (err) {
      setNewcomerError('Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung.');
    } finally {
      setSubmittingNewcomer(false);
    }
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewcomerError("");
    const files = e.target.files;
    if (!files) return;
    const arr = Array.from(files);
    const totalSize = arr.reduce((s, f) => s + f.size, 0) + selectedFiles.reduce((s, f) => s + f.size, 0);
    if (selectedFiles.length + arr.length > MAX_FILES) {
      setNewcomerError(`Maximal ${MAX_FILES} Dateien erlaubt.`);
      return;
    }
    if (totalSize > MAX_TOTAL_SIZE) {
      setNewcomerError('Die Gesamtgröße der Dateien darf 5 MB nicht überschreiten.');
      return;
    }
    setSelectedFiles((prev) => [...prev, ...arr].slice(0, MAX_FILES));
    e.currentTarget.value = "";
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const betreffOptions = [
    { value: 'Probetag absolvieren', label: 'Probetag absolvieren' },
    { value: 'Anmeldung', label: 'Anmeldung' },
  ];
  const [betreffOpen, setBetreffOpen] = useState(false);
  const [betreffValue, setBetreffValue] = useState('');

  const setBetreff = (val: string) => {
    setBetreffValue(val);
    setNewcomerData({ ...newcomerData, subject: val });
  };

  useEffect(() => {
    if (!betreffValue && newcomerData.subject) {
      setBetreffValue(newcomerData.subject);
    }
  }, []);

  useEffect(() => {
    const win = window as any;
    let mounted = true;
    let attempts = 0;
    const maxAttempts = 20;
    const intervalMs = 300;

    const tryRender = () => {
      if (!mounted || !recaptchaRef.current) return;
      if (recaptchaRef.current.getAttribute('data-recaptcha-rendered') === '1') return;

      if (win.grecaptcha && typeof win.grecaptcha.render === 'function') {
        try {
          const id = win.grecaptcha.render(recaptchaRef.current, {
            sitekey: RECAPTCHA_SITE_KEY,
            callback: (token: string) => setRecaptchaToken(token),
            'expired-callback': () => setRecaptchaToken(''),
          });
          if (recaptchaRef.current) recaptchaRef.current.setAttribute('data-recaptcha-rendered', '1');
          setRecaptchaWidgetId(id);
          return;
        } catch (err) {
        }
      }

      attempts += 1;
      if (attempts < maxAttempts) {
        setTimeout(tryRender, intervalMs);
      }
    };

    if (!win.grecaptcha) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?hl=de';
      script.async = true;
      script.defer = true;
      script.onload = () => tryRender();
      script.onerror = () => {
      };
      document.body.appendChild(script);
      setTimeout(tryRender, 500);
    } else {
      tryRender();
    }

    return () => {
      mounted = false;
      try {
        if (win.grecaptcha && recaptchaWidgetId !== null && typeof win.grecaptcha.reset === 'function') {
          win.grecaptcha.reset(recaptchaWidgetId);
        }
      } catch (err) {
      }
    };
  }, []);

  return (
    <section id="mitgliedwerden" className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <header className="text-center mb-10" ref={introAnim.elementRef}>
          <h2 className="text-3xl font-bold text-club-primary">Mitglied werden</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Schön, dass du Interesse an einer Mitgliedschaft hast. Hier stehen alle
            Informationen zum Ablauf, den Beiträgen und dem Aufnahmeantrag.
          </p>
        </header>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 ${stepsAnim.isVisible ? "animate-slideInUp" : "opacity-0"}`} ref={stepsAnim.elementRef}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="text-club-accent" /> Warum Mitglied?
              </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-700">
                Als Mitglied unterstützt du den Verein und profitierst von regelmäßigen Spielabenden, Trainings und Vereinsaktivitäten. Du hast die Möglichkeit, dich mit anderen Schachbegeisterten auszutauschen, an Turnieren teilzunehmen und dich aktiv in das Vereinsleben einzubringen. Außerdem förderst du die Entwicklung des Vereins und trägst dazu bei, dass Schach in unserer Region lebendig bleibt.
                </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="text-club-accent" /> Ablauf
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
                <li>Kontakt per E-Mail aufnehmen.</li>
                <li>Probetag (kostenlos).</li>
                <li>Aufnahmeantrag ausfüllen — Vorstand entscheidet kurzfristig.</li>
              </ol>
              <p className="pt-8 text-sm text-gray-700">Wenn du die Aufnahme beschleunigen möchtest, schicke uns den ausgefüllten Aufnahmeantrag direkt über das Formular unten.</p>
              <a href="/docs/aufnahmeantrag.pdf" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm px-3 py-1 rounded bg-club-accent hover:bg-club-dark text-white w-max">
                Aufnahmeantrag (PDF)
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="text-club-accent" /> Probetag
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-3">
                Du kannst dienstags zu einer für dich passenden Zeit zwischen <strong>17:00</strong> und <strong>19:00</strong> Uhr vorbeikommen.
              </p>
              <p className="text-sm text-gray-700">
                Bitte sag uns Bescheid im Mail-Formular unten, damit wir besser planen können.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Card
            ref={newcomerAnim.elementRef}
            className={`opacity-0 max-w-2xl mx-auto ${newcomerAnim.isVisible ? 'animate-slideInUp' : ''}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="text-club-accent" /> Mitgliedschaft werden
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form ref={formRef} onSubmit={handleNewcomerSubmit} className="space-y-4" noValidate>
                <input type="text" name="subject" value={newcomerData.subject} readOnly required className="sr-only" />
                <div>
                  <p className='text-sm/5 font-medium pb-1'>Name <span className="text-red-500">*</span></p>
                  <Input name="name" placeholder="Ihr Name" value={newcomerData.name} onChange={handleNewcomerChange} required />
                </div>

                <div>
                  <p className='text-sm/5 font-medium pb-1'>E-Mail <span className="text-red-500">*</span></p>
                  <Input type="email" name="email" placeholder="Ihre E-Mailadresse" value={newcomerData.email} onChange={handleNewcomerChange} required />
                </div>

                <div>
                  <p className='text-sm/5 font-medium pb-1'>Telefonnummer (optional)</p>
                  <Input name="phone" placeholder="Ihre Telefonnummer" value={newcomerData.phone} onChange={handleNewcomerChange} />
                </div>

                <div>
                  <p className='text-sm/5 font-medium pb-1'>Betreff <span className="text-red-500">*</span></p>
                  <Popover open={betreffOpen} onOpenChange={setBetreffOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        role="combobox"
                        aria-expanded={betreffOpen}
                        aria-required={true}
                        className="w-full flex items-center justify-between px-3 py-2 border rounded bg-white text-left"
                      >
                          {betreffValue
                            ? betreffOptions.find((o) => o.value === betreffValue)?.label
                            : <span className="text-gray-400">Klicke um Betreff auszuwählen...</span>}
                        <ChevronsUpDown className="opacity-50 ml-2" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandList>
                          <CommandEmpty>Keine Treffer.</CommandEmpty>
                          <CommandGroup>
                            {betreffOptions.map((opt) => (
                              <CommandItem
                                key={opt.value}
                                value={opt.value}
                                onSelect={(currentValue) => {
                                  const val = currentValue as string;
                                  setBetreff(val);
                                  setBetreffOpen(false);
                                }}
                              >
                                {opt.label}
                                <Check className={cn('ml-auto', betreffValue === opt.value ? 'opacity-100' : 'opacity-0')} />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <p className='text-sm/5 font-medium pb-1'>Alter (optional)</p>
                  <Input name="age" placeholder="Ihr Alter" value={newcomerData.age} onChange={handleNewcomerChange} />
                </div>

                <div>
                  <p className='text-sm/5 font-medium pb-1'>Mitteilung <span className="text-red-500">*</span></p>
                  <Textarea name="message" placeholder="Stellen Sie sich kurz vor" className="min-h-[120px]" value={newcomerData.message} onChange={handleNewcomerChange} required />
                </div>

                <div>
                  <p className='text-sm/5 font-medium pb-1'>Dateien (optional, max. 2, gesamt 5 MB)</p>
                  <Input
                    type="file"
                    multiple
                    onChange={handleFilesChange}
                    className="block w-full text-sm text-gray-700 cursor-pointer"
                    accept="application/pdf,image/*"
                  />

                  {selectedFiles.length > 0 && (
                    <ul className="mt-2 space-y-2">
                      {selectedFiles.map((f, i) => (
                        <li key={i} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                          <span className="text-sm text-gray-800">{f.name} <span className="text-xs text-gray-500">({Math.round(f.size / 1024)} KB)</span></span>
                          <button type="button" onClick={() => removeFile(i)} className="text-sm text-red-600 hover:underline">Entfernen</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {newcomerError && <div className="text-red-500 text-sm">{newcomerError}</div>}
                <div aria-live="polite" className="sr-only" />

                <div ref={recaptchaRef} className="mt-2"></div>

                <Button type="submit" className="w-full bg-club-accent hover:bg-club-accent/90" disabled={!canSubmit} aria-disabled={!canSubmit}>
                  {submittingNewcomer ? 'Wird gesendet...' : 'Senden'}
                </Button>
              </form>
              <p className="text-sm mt-4 text-center">
                Mit dem Absenden akzeptieren Sie unsere{' '}
                <Link to="/datenschutz" className="underline hover:text-club-accent">Datenschutzerklärung</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MitgliedwerdenSection;
