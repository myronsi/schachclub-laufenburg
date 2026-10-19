import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Mail, Heart, Calendar, Clock, Eraser, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const API = "https://sc-laufenburg.de/api/membership-applications.php";
const RECAPTCHA_SITE_KEY = "6Lez6-YrAAAAAGry5l1Uvpt7GMD8u0AZJ0meBxQP";

type FormState = {
  first_name: string; last_name: string; address: string; postal_city: string;
  birth_date: string; birth_place: string; phone: string; email: string;
  nationality: string; nationality_other: string; gender: string; previous_club: string; membership_type: string;
  application_place: string; application_date: string;
  direct_debit: boolean; bank_name: string; bic: string; iban: string; account_holder: string;
};

type RecaptchaApi = {
  render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void }) => number;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window { grecaptcha?: RecaptchaApi; }
}

const today = new Date().toISOString().slice(0, 10);
const initialForm: FormState = {
  first_name: "", last_name: "", address: "", postal_city: "", birth_date: "", birth_place: "",
  phone: "", email: "", nationality: "", nationality_other: "", gender: "", previous_club: "", membership_type: "Aktivmitglied",
  application_place: "Laufenburg", application_date: today,
  direct_debit: false, bank_name: "", bic: "", iban: "", account_holder: ""
};

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-800">{label}{required && <span className="text-red-600"> *</span>}</label>
    {children}
  </div>
);

const SignaturePad = ({ label, hint, valueRef, onSigned, onClear }: {
  label: string; hint: string; valueRef: React.MutableRefObject<HTMLCanvasElement | null>;
  onSigned: () => void; onClear: () => void;
}) => {
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = valueRef.current;
    if (!canvas) return;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(ratio, ratio);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#111827";
    }
  }, [valueRef]);

  const point = (event: PointerEvent) => {
    const rect = valueRef.current!.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = valueRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    drawing.current = true;
    canvas.setPointerCapture(event.pointerId);
    const p = point(event.nativeEvent);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };

  const draw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = valueRef.current?.getContext("2d");
    if (!ctx) return;
    const p = point(event.nativeEvent);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    onSigned();
  };

  const clear = () => {
    const canvas = valueRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onClear();
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50/50">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div><h3 className="font-semibold text-gray-900">{label}</h3><p className="text-xs text-gray-500">{hint}</p></div>
        <Button type="button" variant="outline" size="sm" onClick={clear}><Eraser className="w-4 h-4 mr-1" />Löschen</Button>
      </div>
      <canvas ref={valueRef} className="w-full h-32 border rounded bg-white touch-none cursor-crosshair" onPointerDown={start} onPointerMove={draw} onPointerUp={() => { drawing.current = false; }} onPointerCancel={() => { drawing.current = false; }} />
    </div>
  );
};

const MitgliedwerdenSection = () => {
  const introAnim = useScrollAnimation();
  const stepsAnim = useScrollAnimation();
  const contactAnim = useScrollAnimation();
  const formAnim = useScrollAnimation();

  const [contactData, setContactData] = useState({ name: "", email: "", phone: "", age: "", message: "", subject: "" });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactError, setContactError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const recaptchaWidgetId = useRef<number | null>(null);
  const contactFormRef = useRef<HTMLFormElement | null>(null);

  const applicantCanvas = useRef<HTMLCanvasElement | null>(null);
  const guardianCanvas = useRef<HTMLCanvasElement | null>(null);
  const debitCanvas = useRef<HTMLCanvasElement | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [applicantSigned, setApplicantSigned] = useState(false);
  const [guardianSigned, setGuardianSigned] = useState(false);
  const [debitSigned, setDebitSigned] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const maxFiles = 2;
  const maxTotalSize = 5 * 1024 * 1024;
  const filesTotalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
  const filesWithinLimits = selectedFiles.length <= maxFiles && filesTotalSize <= maxTotalSize;

  useEffect(() => {
    let mounted = true;
    let attempts = 0;
    const maxAttempts = 20;

    const renderCaptcha = () => {
      if (!mounted || !recaptchaRef.current || !window.grecaptcha) return;
      if (recaptchaWidgetId.current !== null) return;
      try {
        recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          callback: (token) => setRecaptchaToken(token),
          "expired-callback": () => setRecaptchaToken("")
        });
      } catch {
        // The script can finish loading while the widget is still initializing.
      }
    };

    const retry = () => {
      if (!mounted || recaptchaWidgetId.current !== null) return;
      renderCaptcha();
      attempts += 1;
      if (attempts < maxAttempts) window.setTimeout(retry, 300);
    };

    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?hl=de";
      script.async = true;
      script.defer = true;
      script.onload = retry;
      document.body.appendChild(script);
    } else {
      retry();
    }

    return () => {
      mounted = false;
      if (recaptchaWidgetId.current !== null && window.grecaptcha) window.grecaptcha.reset(recaptchaWidgetId.current);
      recaptchaWidgetId.current = null;
    };
  }, []);

  const handleContactSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setContactError("");
    if (!contactFormRef.current?.checkValidity()) {
      contactFormRef.current?.reportValidity();
      return;
    }
    if (!recaptchaToken) {
      setContactError("Bitte bestätigen Sie, dass Sie kein Roboter sind.");
      return;
    }
    if (!filesWithinLimits) {
      setContactError(selectedFiles.length > maxFiles ? `Maximal ${maxFiles} Dateien erlaubt.` : "Die Gesamtgröße der Dateien darf 5 MB nicht überschreiten.");
      return;
    }

    setContactSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(contactData).forEach(([key, value]) => data.append(key, value));
      selectedFiles.forEach((file) => data.append("files[]", file));
      data.append("g-recaptcha-response", recaptchaToken);

      const response = await fetch("/formmail-80.php", { method: "POST", body: data });
      if (response.ok || response.redirected) {
        window.location.href = "/kontakt-ok";
        return;
      }
      console.error("Contact form error:", response.status, await response.text());
      setContactError("Fehler beim Senden. Bitte später erneut versuchen.");
    } catch (error) {
      console.error("Contact form network error:", error);
      setContactError("Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung.");
    } finally {
      setContactSubmitting(false);
    }
  };

  const setFormValue = (key: keyof FormState, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));

  const submitMembership = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");
    if (!applicantSigned) { setMessage("Bitte unterschreiben Sie den Antrag."); return; }
    if (form.direct_debit && !debitSigned) { setMessage("Bitte unterschreiben Sie auch die Einzugsermächtigung."); return; }
    setSubmitting(true);

    try {
      const payload = {
        ...form,
        nationality: form.nationality === "Sonstige" ? `Sonstige: ${form.nationality_other.trim()}` : form.nationality,
        signature: applicantCanvas.current?.toDataURL("image/png") || "",
        guardian_signature: guardianSigned ? guardianCanvas.current?.toDataURL("image/png") || "" : "",
        debit_signature: form.direct_debit ? debitCanvas.current?.toDataURL("image/png") || "" : "",
        signed_at: new Date().toISOString()
      };
      const response = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok || data.success === false) throw new Error(data.message || "Der Antrag konnte nicht gesendet werden.");
      setForm({ ...initialForm, application_date: new Date().toISOString().slice(0, 10) });
      setApplicantSigned(false); setGuardianSigned(false); setDebitSigned(false);
      setMessage("Ihr Mitgliedsantrag wurde erfolgreich an den geschäftsführenden Vorstand zur Prüfung übermittelt.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Fehler beim Senden.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactError("");
    const files = event.target.files;
    if (!files) return;
    const incoming = Array.from(files);
    if (selectedFiles.length + incoming.length > maxFiles) { setContactError(`Maximal ${maxFiles} Dateien erlaubt.`); return; }
    const total = filesTotalSize + incoming.reduce((sum, file) => sum + file.size, 0);
    if (total > maxTotalSize) { setContactError("Die Gesamtgröße der Dateien darf 5 MB nicht überschreiten."); return; }
    setSelectedFiles((current) => [...current, ...incoming]);
    event.currentTarget.value = "";
  };

  return (
    <section id="mitgliedwerden" className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <header className="text-center mb-10" ref={introAnim.elementRef}>
          <h2 className="text-3xl font-bold text-club-primary">Mitglied werden</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Schön, dass du Interesse an einer Mitgliedschaft hast. Hier stehen alle Informationen zum Ablauf, den Beiträgen und dem Aufnahmeantrag.</p>
        </header>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 ${stepsAnim.isVisible ? "animate-slideInUp" : "opacity-0"}`} ref={stepsAnim.elementRef}>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Heart className="text-club-accent" />Warum Mitglied?</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-gray-700">Als Mitglied unterstützt du den Verein und profitierst von regelmäßigen Spielabenden, Trainings und Vereinsaktivitäten. Du hast die Möglichkeit, dich mit anderen Schachbegeisterten auszutauschen, an Turnieren teilzunehmen und dich aktiv in das Vereinsleben einzubringen.</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="text-club-accent" />Ablauf</CardTitle></CardHeader>
            <CardContent>
              <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2"><li>Kontakt per E-Mail aufnehmen.</li><li>Probetag (kostenlos).</li><li>Aufnahmeantrag ausfüllen — Vorstand entscheidet kurzfristig.</li></ol>
              <p className="pt-5 text-sm text-gray-700">Wenn du die Aufnahme beschleunigen möchtest, kannst du den Aufnahmeantrag direkt online ausfüllen.</p>
              <a href="/docs/statuten/aufnahmeantrag_neu_1770041370.pdf" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm px-3 py-1 rounded bg-club-accent hover:bg-club-dark text-white w-max">Aufnahmeantrag (PDF)</a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="text-club-accent" />Probetag</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-gray-700 mb-3">Du kannst dienstags zu einer für dich passenden Zeit zwischen <strong>17:00</strong> und <strong>19:00</strong> Uhr vorbeikommen.</p><p className="text-sm text-gray-700">Bitte sag uns über das Mail-Formular unten Bescheid, damit wir besser planen können.</p></CardContent>
          </Card>
        </div>

        <Card ref={contactAnim.elementRef} className={`max-w-2xl mx-auto mb-8 ${contactAnim.isVisible ? "animate-slideInUp" : "opacity-0"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mail className="text-club-accent" />Erst ausprobieren oder Fragen zur Mitgliedschaft?</CardTitle>
            <p className="text-sm text-gray-600">Du möchtest einen kostenlosen Probetag vereinbaren oder direkt mit uns über eine Mitgliedschaft sprechen? Schreib uns kurz.</p>
          </CardHeader>
          <CardContent>
            <form ref={contactFormRef} onSubmit={handleContactSubmit} className="space-y-4">
              <div><p className="text-sm/5 font-medium pb-1">Name <span className="text-red-500">*</span></p><Input name="name" placeholder="Ihr Name" value={contactData.name} onChange={(e) => setContactData({ ...contactData, name: e.target.value })} required /></div>
              <div><p className="text-sm/5 font-medium pb-1">E-Mail <span className="text-red-500">*</span></p><Input type="email" name="email" placeholder="Ihre E-Mailadresse" value={contactData.email} onChange={(e) => setContactData({ ...contactData, email: e.target.value })} required /></div>
              <div><p className="text-sm/5 font-medium pb-1">Telefonnummer (optional)</p><Input name="phone" placeholder="Ihre Telefonnummer" value={contactData.phone} onChange={(e) => setContactData({ ...contactData, phone: e.target.value })} /></div>
              <div><p className="text-sm/5 font-medium pb-1">Betreff <span className="text-red-500">*</span></p>
                <div className="relative"><select name="subject" value={contactData.subject} onChange={(e) => setContactData({ ...contactData, subject: e.target.value })} required className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm"><option value="">Klicke um Betreff auszuwählen...</option><option value="Probetag absolvieren">Probetag absolvieren</option><option value="Anmeldung">Anmeldung</option></select><ChevronDown className="absolute right-3 top-2.5 h-4 w-4 pointer-events-none text-gray-500" /></div>
              </div>
              <div><p className="text-sm/5 font-medium pb-1">Alter (optional)</p><Input name="age" placeholder="Ihr Alter" value={contactData.age} onChange={(e) => setContactData({ ...contactData, age: e.target.value })} /></div>
              <div><p className="text-sm/5 font-medium pb-1">Mitteilung <span className="text-red-500">*</span></p><Textarea name="message" placeholder="Stellen Sie sich kurz vor" className="min-h-[120px]" value={contactData.message} onChange={(e) => setContactData({ ...contactData, message: e.target.value })} required /></div>
              <div><p className="text-sm/5 font-medium pb-1">Dateien (optional, max. 2, gesamt 5 MB)</p><Input type="file" multiple onChange={handleFilesChange} className="block w-full text-sm text-gray-700 cursor-pointer" accept="application/pdf,image/*" />{selectedFiles.length > 0 && <ul className="mt-2 space-y-2">{selectedFiles.map((file, index) => <li key={`${file.name}-${index}`} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"><span className="text-sm text-gray-800">{file.name} <span className="text-xs text-gray-500">({Math.round(file.size / 1024)} KB)</span></span><button type="button" onClick={() => setSelectedFiles((current) => current.filter((_, i) => i !== index))} className="text-sm text-red-600 hover:underline">Entfernen</button></li>)}</ul>}</div>
              {contactError && <div className="text-red-500 text-sm">{contactError}</div>}
              <div ref={recaptchaRef} className="mt-2 min-h-[78px]" />
              <Button type="submit" className="w-full bg-club-accent hover:bg-club-accent/90" disabled={contactSubmitting || !recaptchaToken}>{contactSubmitting ? "Wird gesendet..." : "Senden"}</Button>
            </form>
            <p className="text-sm mt-4 text-center">Mit dem Absenden akzeptieren Sie unsere <Link to="/datenschutz" className="underline hover:text-club-accent">Datenschutzerklärung</Link></p>
          </CardContent>
        </Card>

        <div className="max-w-5xl mx-auto" ref={formAnim.elementRef}>
          <details className="group rounded-xl border bg-white shadow-sm">
            <summary className="list-none cursor-pointer p-5 md:p-6 flex items-center justify-between gap-4">
              <div><h3 className="text-xl md:text-2xl font-semibold text-club-primary">Direkt Mitglied werden</h3><p className="text-sm text-gray-600 mt-1">Aufnahmeantrag online ausfüllen und digital unterschreiben.</p></div>
              <ChevronDown className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <div className="border-t p-5 md:p-7">
              <form onSubmit={submitMembership} className="space-y-7">
                <div className="rounded-lg border-2 border-gray-800 p-5 md:p-7 space-y-6">
                  <p className="text-gray-800 leading-relaxed">Ich möchte Mitglied beim Schachclub Laufenburg e.V. und im Badischen Schachverband e.V. werden. Die Satzung des Schachclubs Laufenburg e.V. erkenne ich an. Über die momentan gültigen Mitgliedsbeiträge habe ich mich informiert.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <Field label="Vorname" required><Input required value={form.first_name} onChange={(e) => setFormValue("first_name", e.target.value)} /></Field>
                    <Field label="Name" required><Input required value={form.last_name} onChange={(e) => setFormValue("last_name", e.target.value)} /></Field>
                    <Field label="PLZ, Wohnort" required><Input required value={form.postal_city} onChange={(e) => setFormValue("postal_city", e.target.value)} placeholder="z. B. 79725 Laufenburg" /></Field>
                    <Field label="Strasse" required><Input required value={form.address} onChange={(e) => setFormValue("address", e.target.value)} /></Field>
                    <Field label="geboren am" required><Input required type="date" value={form.birth_date} onChange={(e) => setFormValue("birth_date", e.target.value)} /></Field>
                    <Field label="Geburtsort"><Input value={form.birth_place} onChange={(e) => setFormValue("birth_place", e.target.value)} /></Field>
                    <Field label="Telefon"><Input value={form.phone} onChange={(e) => setFormValue("phone", e.target.value)} /></Field>
                    <Field label="Email" required><Input required type="email" value={form.email} onChange={(e) => setFormValue("email", e.target.value)} /></Field>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Staatsangehörigkeit" required><div className="flex flex-wrap gap-4 pt-2 text-sm">{["Deutsch", "EU-Angehöriger", "Sonstige"].map((value) => <label key={value} className="inline-flex items-center gap-2"><input type="radio" name="nationality" required checked={form.nationality === value} onChange={() => setFormValue("nationality", value)} />{value}</label>)}</div></Field>
                    <Field label="Geschlecht" required><div className="flex flex-wrap gap-4 pt-2 text-sm">{["männlich", "weiblich"].map((value) => <label key={value} className="inline-flex items-center gap-2"><input type="radio" name="gender" required checked={form.gender === value} onChange={() => setFormValue("gender", value)} />{value}</label>)}</div></Field>
                  </div>
                  {form.nationality === "Sonstige" && <Field label="Sonstige Staatsangehörigkeit" required><Input required value={form.nationality_other} onChange={(e) => setFormValue("nationality_other", e.target.value)} /></Field>}
                  <Field label="Früherer Verein"><Input value={form.previous_club} onChange={(e) => setFormValue("previous_club", e.target.value)} /></Field>
                  <Field label="Art der Mitgliedschaft" required><div className="flex flex-wrap gap-6 pt-2 text-sm">{["Aktivmitglied", "Passivmitglied"].map((value) => <label key={value} className="inline-flex items-center gap-2"><input type="radio" name="membership_type" required checked={form.membership_type === value} onChange={() => setFormValue("membership_type", value)} />{value}</label>)}</div></Field>
                  <label className="flex items-start gap-2 text-sm leading-relaxed"><input required type="checkbox" className="mt-1" /><span>Ich habe die Datenschutzerklärung des badischen Schachverbandes zur Kenntnis genommen.</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><Field label="Ort"><Input required value={form.application_place} onChange={(e) => setFormValue("application_place", e.target.value)} /></Field><Field label="Datum"><Input required type="date" value={form.application_date} onChange={(e) => setFormValue("application_date", e.target.value)} /></Field></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5"><SignaturePad label="Gesetzlicher Vertreter" hint="Nur bei Jugendlichen erforderlich." valueRef={guardianCanvas} onSigned={() => setGuardianSigned(true)} onClear={() => setGuardianSigned(false)} /><SignaturePad label="Der Antragsteller" hint="Bitte hier digital unterschreiben." valueRef={applicantCanvas} onSigned={() => setApplicantSigned(true)} onClear={() => setApplicantSigned(false)} /></div>
                </div>
                <div className="rounded-lg border-2 border-gray-800 p-5 md:p-7 space-y-5">
                  <div><p className="text-sm text-gray-700 mb-1">Falls Sie möchten, machen Sie unserem Kassier das Leben leichter:</p><h3 className="text-xl font-bold underline">Einzugsermächtigung</h3></div>
                  <p className="text-gray-800 leading-relaxed">Nach meiner Aufnahme im Schachclub Laufenburg e.V. ermächtige ich den Verein bis auf Widerruf, den jeweiligen Jahresbeitrag zu Beginn des Jahres von meinem Konto abzubuchen.</p>
                  <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={form.direct_debit} onChange={(e) => setFormValue("direct_debit", e.target.checked)} className="mt-1" /><span>Ich möchte die Einzugsermächtigung erteilen.</span></label>
                  {form.direct_debit && <><div className="grid grid-cols-1 md:grid-cols-2 gap-5"><Field label="Kreditinstitut" required><Input required value={form.bank_name} onChange={(e) => setFormValue("bank_name", e.target.value)} /></Field><Field label="BIC" required><Input required value={form.bic} onChange={(e) => setFormValue("bic", e.target.value)} /></Field><Field label="IBAN" required><Input required value={form.iban} onChange={(e) => setFormValue("iban", e.target.value)} className="md:col-span-2" /></Field><Field label="Name des Kontoinhabers (falls abweichend)"><Input value={form.account_holder} onChange={(e) => setFormValue("account_holder", e.target.value)} className="md:col-span-2" /></Field></div><SignaturePad label="Unterschrift" hint="Bestätigt die Einzugsermächtigung." valueRef={debitCanvas} onSigned={() => setDebitSigned(true)} onClear={() => setDebitSigned(false)} /></>}
                </div>
                {message && <div className={message.startsWith("Ihr Mitgliedsantrag") ? "rounded-md bg-green-50 p-3 text-sm text-green-800" : "rounded-md bg-red-50 p-3 text-sm text-red-700"}>{message}</div>}
                <Button type="submit" className="w-full bg-club-accent hover:bg-club-accent/90" disabled={submitting}>{submitting ? "Wird gesendet..." : "Mitgliedsantrag einreichen"}</Button>
              </form>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};

export default MitgliedwerdenSection;
