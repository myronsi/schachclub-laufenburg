import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { FormEvent, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Clock,
  Eraser,
  FileText,
  Heart,
  Mail,
  PenLine,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { isMinor } from "@/lib/membershipApplication";
import type { MembershipPdfData } from "@/lib/membershipApplication";
import { createMembershipEml, MEMBERSHIP_RECIPIENTS, openMembershipMail, prepareLocalMembershipApplication } from "@/lib/localMembershipMail";

type FormState = {
  first_name: string;
  last_name: string;
  address: string;
  postal_city: string;
  birth_date: string;
  birth_place: string;
  phone: string;
  email: string;
  nationality: string;
  nationality_other: string;
  gender: string;
  sport_gender: string;
  previous_club: string;
  membership_type: string;
  application_place: string;
  application_date: string;
  direct_debit: boolean;
  bank_name: string;
  bic: string;
  iban: string;
  account_holder: string;
  representative_name: string;
};
const today = new Date().toISOString().slice(0, 10);
const initialForm: FormState = {
  first_name: "",
  last_name: "",
  address: "",
  postal_city: "",
  birth_date: "",
  birth_place: "",
  phone: "",
  email: "",
  nationality: "",
  nationality_other: "",
  gender: "",
  sport_gender: "",
  previous_club: "",
  membership_type: "Aktivmitglied",
  application_place: "Laufenburg",
  application_date: today,
  direct_debit: true,
  bank_name: "",
  bic: "",
  iban: "",
  account_holder: "",
  representative_name: "",
};
const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div className="space-y-1">
    <label className="block pb-1 text-sm leading-5 font-medium text-gray-700">
      {label}
      {required && <span className="text-red-600"> *</span>}
    </label>
    {children}
  </div>
);
const SignaturePad = ({ label, hint, valueRef, onSigned, onClear }: { label: string; hint: string; valueRef: React.MutableRefObject<HTMLCanvasElement | null>; onSigned: () => void; onClear: () => void; }) => {
  const drawing=useRef(false), signCanvas=useRef<HTMLCanvasElement|null>(null), fileInput=useRef<HTMLInputElement|null>(null);
  const [open,setOpen]=useState(false);
  const point=(c:HTMLCanvasElement,e:PointerEvent)=>{const r=c.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};};
  const setup=(c:HTMLCanvasElement)=>{const ratio=Math.max(window.devicePixelRatio||1,1);c.width=Math.max(c.clientWidth*ratio,1);c.height=Math.max(c.clientHeight*ratio,1);const x=c.getContext("2d");if(x){x.setTransform(ratio,0,0,ratio,0,0);x.clearRect(0,0,c.clientWidth,c.clientHeight);x.lineWidth=2;x.lineCap="round";x.lineJoin="round";x.strokeStyle="#111827";}};
  const clear=()=>{const c=valueRef.current,x=c?.getContext("2d");if(c&&x)x.clearRect(0,0,c.width,c.height);const c2=signCanvas.current,x2=c2?.getContext("2d");if(c2&&x2)x2.clearRect(0,0,c2.width,c2.height);onClear();};
  const upload=(file:File)=>{if(!file.type.startsWith("image/"))return;const r=new FileReader();r.onload=()=>{const img=new Image();img.onload=()=>{const c=valueRef.current;if(!c)return;const ratio=Math.max(window.devicePixelRatio||1,1);c.width=Math.max(c.clientWidth*ratio,1);c.height=Math.max(c.clientHeight*ratio,1);const x=c.getContext("2d");if(!x)return;x.setTransform(ratio,0,0,ratio,0,0);x.clearRect(0,0,c.clientWidth,c.clientHeight);const scale=Math.min((c.clientWidth-16)/img.width,(c.clientHeight-16)/img.height),w=img.width*scale,h=img.height*scale;x.drawImage(img,(c.clientWidth-w)/2,(c.clientHeight-h)/2,w,h);onSigned();};img.src=String(r.result);};r.readAsDataURL(file);};
  const accept=()=>{const source=signCanvas.current,target=valueRef.current;if(!source||!target)return;const ratio=Math.max(window.devicePixelRatio||1,1);target.width=Math.max(target.clientWidth*ratio,1);target.height=Math.max(target.clientHeight*ratio,1);const x=target.getContext("2d");if(!x)return;x.setTransform(ratio,0,0,ratio,0,0);x.clearRect(0,0,target.clientWidth,target.clientHeight);const scale=Math.min(target.clientWidth/source.clientWidth,target.clientHeight/source.clientHeight),w=source.clientWidth*scale,h=source.clientHeight*scale;x.drawImage(source,(target.clientWidth-w)/2,(target.clientHeight-h)/2,w,h);setOpen(false);onSigned();};
  return <><div className="rounded-lg border bg-gray-50/70 p-4"><div className="mb-2 flex items-center justify-between gap-3"><div><h3 className="font-semibold text-gray-900">{label}</h3><p className="text-xs text-gray-500">{hint}</p></div><Button type="button" variant="outline" size="sm" onClick={clear}><Eraser className="mr-1 h-4 w-4"/>Löschen</Button></div><canvas ref={valueRef} className="h-32 w-full rounded-md border bg-white object-contain"/><div className="mt-3 flex flex-wrap gap-2"><Button type="button" variant="outline" size="sm" onClick={()=>{setOpen(true);setTimeout(()=>{if(signCanvas.current)setup(signCanvas.current);},0);}}><PenLine className="mr-1 h-4 w-4"/>Unterschrift zeichnen</Button><Button type="button" variant="outline" size="sm" onClick={()=>fileInput.current?.click()}><Upload className="mr-1 h-4 w-4"/>Unterschrift hochladen</Button><input ref={fileInput} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)upload(f);e.currentTarget.value="";}}/></div></div>{open&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label={label}><div className="w-full max-w-2xl rounded-xl bg-white p-5 shadow-xl"><div className="mb-3 flex items-center justify-between"><div><h3 className="text-lg font-semibold text-gray-900">{label}</h3><p className="text-sm text-gray-500">Bitte unterschreiben Sie im Feld.</p></div><Button type="button" variant="outline" size="sm" onClick={()=>setOpen(false)}>Schließen</Button></div><canvas ref={signCanvas} className="h-48 w-full cursor-crosshair touch-none rounded-md border bg-white" onPointerDown={e=>{const c=signCanvas.current,x=c?.getContext("2d");if(!c||!x)return;drawing.current=true;c.setPointerCapture(e.pointerId);const q=point(c,e.nativeEvent);x.beginPath();x.moveTo(q.x,q.y);}} onPointerMove={e=>{if(!drawing.current)return;const c=signCanvas.current,x=c?.getContext("2d");if(!c||!x)return;const q=point(c,e.nativeEvent);x.lineTo(q.x,q.y);x.stroke();}} onPointerUp={()=>{drawing.current=false}} onPointerCancel={()=>{drawing.current=false}}/><div className="mt-3 flex justify-between gap-2"><Button type="button" variant="outline" onClick={()=>{const c=signCanvas.current,x=c?.getContext("2d");if(c&&x)x.clearRect(0,0,c.width,c.height)}}><Eraser className="mr-1 h-4 w-4"/>Löschen</Button><Button type="button" onClick={accept} className="bg-club-accent hover:bg-club-accent/90">Unterschrift übernehmen</Button></div></div></div>}</>;
};
function ibanOkay(value: string) {
  const s = value.replace(/\s/g, "").toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(s)) return false;
  const known: Record<string, number> = {
    DE: 22,
    AT: 20,
    CH: 21,
    FR: 27,
    GB: 22,
    NL: 18,
    BE: 16,
    IT: 27,
    ES: 24,
    LU: 20,
  };
  if (known[s.slice(0, 2)] && s.length !== known[s.slice(0, 2)]) return false;
  let n = 0;
  for (const c of s.slice(4) + s.slice(0, 4)) {
    const v = /[A-Z]/.test(c) ? String(c.charCodeAt(0) - 55) : c;
    for (const d of v) n = (n * 10 + Number(d)) % 97;
  }
  return n === 1;
}
const MitgliedwerdenSection = () => {
  const intro = useScrollAnimation(),
    info = useScrollAnimation(),
    formAnim = useScrollAnimation();
  const applicant = useRef<HTMLCanvasElement | null>(null),
    guardian = useRef<HTMLCanvasElement | null>(null),
    mandate = useRef<HTMLCanvasElement | null>(null);
  const [form, setForm] = useState(initialForm),
    [applicantSigned, setApplicantSigned] = useState(false),
    [guardianSigned, setGuardianSigned] = useState(false),
    [mandateSigned, setMandateSigned] = useState(false),
    [terms, setTerms] = useState(false),
    [privacy, setPrivacy] = useState(false),
    [busy, setBusy] = useState(false),
    [prepared, setPrepared] = useState<{ file: File; name: string } | null>(null),
    [message, setMessage] = useState("");
  const minor = isMinor(form.birth_date);
  const set = (k: keyof FormState, v: string | boolean) => {
    setForm((x) => ({ ...x, [k]: v }));
    setPrepared(null);
    setMessage("");
  };
  const reset = () => {
    setForm({
      ...initialForm,
      application_date: new Date().toISOString().slice(0, 10),
    });
    setApplicantSigned(false);
    setGuardianSigned(false);
    setMandateSigned(false);
    setTerms(false);
    setPrivacy(false);
    setPrepared(null);
    setMessage("");
  };
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    const formElement = e.currentTarget as HTMLFormElement;
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }
    if (!terms || !privacy) {
      setMessage("Bitte bestätigen Sie Satzung und Datenschutzhinweise.");
      return;
    }
    if (!applicantSigned) {
      setMessage("Bitte unterschreiben Sie den Antrag.");
      return;
    }
    if (minor && (!form.representative_name.trim() || !guardianSigned)) {
      setMessage(
        "Für Minderjährige werden Name und Unterschrift der gesetzlichen Vertretung benötigt.",
      );
      return;
    }
    if (
      form.direct_debit &&
      (!ibanOkay(form.iban) ||
        (form.bic.trim() &&
          !/^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/.test(form.bic)) ||
        !mandateSigned)
    ) {
      setMessage(
        !ibanOkay(form.iban)
          ? "Bitte prüfen Sie die IBAN."
          : form.bic.trim() &&
              !/^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/.test(form.bic)
            ? "Bitte prüfen Sie die BIC."
            : "Bitte prüfen Sie die Unterschrift der Einzugsermächtigung.",
      );
      return;
    }
    setBusy(true);
    try {
      const data: MembershipPdfData = {
        ...form,
        nationality: form.nationality === "Sonstige" ? `Sonstige: ${form.nationality_other.trim()}` : form.nationality,
        representative_name: minor ? form.representative_name.trim() : "",
        signatures: { applicant: applicant.current?.toDataURL("image/png") || "", representative: minor ? guardian.current?.toDataURL("image/png") || "" : "", mandate: form.direct_debit ? mandate.current?.toDataURL("image/png") || "" : "" },
        created: new Date().toISOString(),
        text_version: "2026-10-24-final",
      };
      const result = await prepareLocalMembershipApplication(data);
      setPrepared(result);
      setMessage("Die PDF wurde ausschließlich in Ihrem Browser erstellt. Sie wurde noch nicht versendet.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Die PDF konnte nicht erstellt werden.");
    } finally {
      setBusy(false);
    }
  };
  const download = () => { if (!prepared) return; const url=URL.createObjectURL(prepared.file); const a=document.createElement("a"); a.href=url; a.download=prepared.name; a.click(); setTimeout(()=>URL.revokeObjectURL(url),30000); };
  const mail = () => { if (prepared) openMembershipMail(MEMBERSHIP_RECIPIENTS, prepared.name); };
  const eml = async () => { if (!prepared) return; const text=await createMembershipEml(prepared.file,MEMBERSHIP_RECIPIENTS); const blob=new Blob([text],{type:"message/rfc822"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="SC-Aufnahmeantrag.eml"; a.click(); setTimeout(()=>URL.revokeObjectURL(url),30000); };
  return (
    <section id="mitgliedwerden" className="animate-fadeIn py-16">
      <div className="container mx-auto px-4">
        <header ref={intro.elementRef} className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-club-primary">
            Mitglied werden
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Schach spielen, neue Leute kennenlernen und Teil unseres Vereins
            werden. Du entscheidest selbst, wie du den ersten Schritt machst.
          </p>
        </header>
        <div className="mx-auto mb-10 grid max-w-4xl gap-4 md:grid-cols-2">
          <a
            href="#digital-antrag"
            className="group rounded-lg border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:p-6"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <FileText className="h-5 w-5 text-club-accent" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Direkt Mitglied werden
            </p>
            <h3 className="mt-1 text-lg font-bold text-club-primary">
              Online-Mitgliedsantrag
            </h3>
            <p className="mt-2 text-sm leading-5 text-gray-600">
              Den vollständigen Aufnahmeantrag online ausfüllen, digital
              unterschreiben und direkt an den Vorstand übermitteln.
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-club-primary">
              Antrag starten{" "}
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
          <a
            href="#kontakt"
            className="group rounded-lg border border-club-accent/25 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-club-accent/50 hover:shadow-md md:p-6"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-club-accent/10">
              <Mail className="h-5 w-5 text-club-accent" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Erst ausprobieren
            </p>
            <h3 className="mt-1 text-lg font-bold text-club-primary">
              Probetag oder Fragen
            </h3>
            <p className="mt-2 text-sm leading-5 text-gray-600">
              Kostenlosen Probetag vereinbaren oder uns über das Kontaktformular
              eine Nachricht schicken.
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-club-accent">
              Kontaktformular{" "}
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </div>
        <div
          ref={info.elementRef}
          className={`mx-auto mb-10 max-w-5xl ${info.isVisible ? "animate-slideInUp" : "opacity-0"}`}
        >
          <div className="grid overflow-hidden rounded-lg border bg-white shadow-sm md:grid-cols-3">
            <div className="border-b p-5 md:border-b-0 md:border-r">
              <Heart className="mb-3 h-5 w-5 text-club-accent" />
              <h3 className="font-bold text-club-primary">Warum Mitglied?</h3>
              <p className="mt-2 text-sm leading-5 text-gray-600">
                Regelmäßige Spielabende, Training, Turniere und Austausch mit
                anderen Schachbegeisterten.
              </p>
            </div>
            <div className="border-b p-5 md:border-b-0 md:border-r">
              <Check className="mb-3 h-5 w-5 text-club-accent" />
              <h3 className="font-bold text-club-primary">So läuft es ab</h3>
              <p className="mt-2 text-sm leading-5 text-gray-600">
                Kontakt aufnehmen, kostenlos zum Probetag kommen und
                anschließend den Aufnahmeantrag einreichen.
              </p>
            </div>
            <div className="p-5">
              <Clock className="mb-3 h-5 w-5 text-club-accent" />
              <h3 className="font-bold text-club-primary">Probetag</h3>
              <p className="mt-2 text-sm leading-5 text-gray-600">
                Dienstags kannst du zwischen{" "}
                <strong>17:00 und 19:00 Uhr</strong> zu einer passenden Zeit
                vorbeikommen.
              </p>
            </div>
          </div>
        </div>
        <div
          id="digital-antrag"
          ref={formAnim.elementRef}
          className={`mx-auto mb-10 max-w-5xl ${formAnim.isVisible ? "animate-slideInUp" : "opacity-0"}`}
        >
          <details
            open
            className="overflow-hidden rounded-lg border bg-white shadow-sm"
          >
            <summary className="flex list-none items-center justify-between p-5 md:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-club-accent">
                  Digitaler Aufnahmeantrag
                </p>
                <h2 className="mt-1 text-2xl font-bold text-club-primary">
                  Aufnahmeantrag
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Schachclub Laufenburg e.V. – gegründet 1969 –
                </p>
              </div>
            </summary>
            <div className="border-t p-5 md:p-7">
              <form onSubmit={(e) => { submit(e); }} className="space-y-7">
                <div className="space-y-6 rounded-lg border-2 border-gray-800 p-5 md:p-7">
                  <p className="leading-relaxed text-gray-800">
                    Ich möchte Mitglied beim Schachclub Laufenburg e.V. und im
                    Badischen Schachverband e.V. werden. Die Satzung des
                    Schachclubs Laufenburg e.V. erkenne ich an. Über die
                    momentan gültigen Mitgliedsbeiträge habe ich mich
                    informiert.
                  </p>
                  <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                    <Field label="Vorname" required>
                      <Input
                        required
                        value={form.first_name}
                        onChange={(e) => set("first_name", e.target.value)}
                      />
                    </Field>
                    <Field label="Name" required>
                      <Input
                        required
                        value={form.last_name}
                        onChange={(e) => set("last_name", e.target.value)}
                      />
                    </Field>
                    <Field label="PLZ, Wohnort" required>
                      <Input
                        required
                        value={form.postal_city}
                        onChange={(e) => set("postal_city", e.target.value)}
                        placeholder="z. B. 79725 Laufenburg"
                      />
                    </Field>
                    <Field label="Straße" required>
                      <Input
                        required
                        value={form.address}
                        onChange={(e) => set("address", e.target.value)}
                      />
                    </Field>
                    <Field label="Geboren am" required>
                      <Input
                        required
                        type="date"
                        max={today}
                        value={form.birth_date}
                        onChange={(e) => set("birth_date", e.target.value)}
                      />
                    </Field>
                    <Field label="Geburtsort" required>
                      <Input
                        required
                        value={form.birth_place}
                        onChange={(e) => set("birth_place", e.target.value)}
                      />
                    </Field>
                    <Field label="Telefon">
                      <Input
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                      />
                    </Field>
                    <Field label="E-Mail" required>
                      <Input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Field label="Staatsangehörigkeit" required>
                      <div className="flex flex-wrap gap-4 pt-2 text-sm">
                        {[
                          ["Deutsch", "Deutsch"],
                          ["EU-Angehöriger", "EU-Angehöriger"],
                          ["Sonstige", "Sonstige"],
                        ].map(([v, l]) => (
                          <label
                            key={v}
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="radio"
                              name="nationality"
                              required
                              checked={form.nationality === v}
                              onChange={() => set("nationality", v)}
                            />
                            {l}
                          </label>
                        ))}
                      </div>
                    </Field>
                    <Field label="Geschlecht" required>
                      <div className="flex flex-wrap gap-4 pt-2 text-sm">
                        {[
                          ["männlich", "männlich"],
                          ["weiblich", "weiblich"],
                          ["divers", "divers"],
                        ].map(([v, l]) => (
                          <label
                            key={v}
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="radio"
                              name="gender"
                              required
                              checked={form.gender === v}
                              onChange={() => set("gender", v)}
                            />
                            {l}
                          </label>
                        ))}
                      </div>
                    </Field>
                  </div>
                  {form.nationality === "Sonstige" && (
                    <Field label="Sonstige Staatsangehörigkeit" required>
                      <Input
                        required
                        value={form.nationality_other}
                        onChange={(e) =>
                          set("nationality_other", e.target.value)
                        }
                      />
                    </Field>
                  )}
                  {form.gender === "divers" && (
                    <Field label="Geschlecht für den Spielbetrieb" required>
                      <div className="flex gap-5 pt-2 text-sm">
                        <label>
                          <input
                            type="radio"
                            name="sport_gender"
                            required
                            checked={form.sport_gender === "m"}
                            onChange={() => set("sport_gender", "m")}
                          />{" "}
                          männlich
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="sport_gender"
                            required
                            checked={form.sport_gender === "w"}
                            onChange={() => set("sport_gender", "w")}
                          />{" "}
                          weiblich
                        </label>
                      </div>
                    </Field>
                  )}
                  <Field label="Früherer Verein">
                    <Input
                      value={form.previous_club}
                      onChange={(e) => set("previous_club", e.target.value)}
                    />
                  </Field>
                  <Field label="Art der Mitgliedschaft" required>
                    <div className="flex flex-wrap gap-6 pt-2 text-sm">
                      {["Aktivmitglied", "Passivmitglied"].map((v) => (
                        <label key={v}>
                          <input
                            type="radio"
                            name="membership_type"
                            required
                            checked={form.membership_type === v}
                            onChange={() => set("membership_type", v)}
                          />{" "}
                          {v}
                        </label>
                      ))}
                    </div>
                  </Field>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Ort" required>
                      <Input
                        required
                        value={form.application_place}
                        onChange={(e) =>
                          set("application_place", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Datum" required>
                      <Input
                        required
                        type="date"
                        value={form.application_date}
                        onChange={(e) =>
                          set("application_date", e.target.value)
                        }
                      />
                    </Field>
                  </div>
                  <label className="flex items-start gap-2 text-sm leading-relaxed">
                    <input
                      required
                      type="checkbox"
                      checked={terms}
                      onChange={(e) => setTerms(e.target.checked)}
                      className="mt-1"
                    />
                    <span>
                      Ich erkenne die Satzung des Schachclubs Laufenburg e.V. an
                      und habe mich über die aktuell gültigen Mitgliedsbeiträge
                      informiert.
                    </span>
                  </label>
                  <label className="flex items-start gap-2 text-sm leading-relaxed">
                    <input
                      required
                      type="checkbox"
                      checked={privacy}
                      onChange={(e) => setPrivacy(e.target.checked)}
                      className="mt-1"
                    />
                    <span>
                      Ich habe die Datenschutzhinweise des Badischen
                      Schachverbandes zur Kenntnis genommen.
                    </span>
                  </label>
                  {minor && (
                    <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
                      <Field label="Name der gesetzlichen Vertretung" required>
                        <Input
                          required
                          value={form.representative_name}
                          onChange={(e) =>
                            set("representative_name", e.target.value)
                          }
                        />
                      </Field>
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <SignaturePad
                      label="Der Antragsteller"
                      hint="Bitte hier digital unterschreiben."
                      valueRef={applicant}
                      onSigned={() => setApplicantSigned(true)}
                      onClear={() => setApplicantSigned(false)}
                    />
                    {minor && (
                      <SignaturePad
                        label="Gesetzlicher Vertreter"
                        hint="Bei Minderjährigen erforderlich."
                        valueRef={guardian}
                        onSigned={() => setGuardianSigned(true)}
                        onClear={() => setGuardianSigned(false)}
                      />
                    )}
                  </div>
                </div>
                <div className="space-y-5 rounded-lg border-2 border-gray-800 p-5 md:p-7">
                  <div>
                    <p className="mb-1 text-sm text-gray-700">
                      SEPA-Basislastschrift
                    </p>
                    <h3 className="text-xl font-bold underline">
                      Einzugsermächtigung
                    </h3>
                  </div>
                  <p className="leading-relaxed text-gray-800">
                    Nach meiner Aufnahme im Schachclub Laufenburg e.V.
                    ermächtige ich den Verein bis auf Widerruf, den jeweiligen
                    Jahresbeitrag zu Beginn des Jahres von meinem Konto
                    abzubuchen.
                  </p>
                  <label className="flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.direct_debit}
                      onChange={(e) => set("direct_debit", e.target.checked)}
                      className="mt-1"
                    />
                    <span>Ich möchte die Einzugsermächtigung erteilen.</span>
                  </label>
                  {form.direct_debit && (
                    <>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="Kontoinhaber" required>
                          <Input
                            required
                            value={form.account_holder}
                            onChange={(e) =>
                              set("account_holder", e.target.value)
                            }
                          />
                        </Field>
                        <Field label="Bank">
                          <Input
                            value={form.bank_name}
                            onChange={(e) => set("bank_name", e.target.value)}
                          />
                        </Field>
                        <Field label="IBAN" required>
                          <Input
                            required
                            value={form.iban}
                            onChange={(e) => set("iban", e.target.value)}
                          />
                        </Field>
                        <Field label="BIC">
                          <Input
                            value={form.bic}
                            onChange={(e) => set("bic", e.target.value)}
                          />
                        </Field>
                      </div>
                      <SignaturePad
                        label="Unterschrift Einzugsermächtigung"
                        hint="Erforderlich bei erteilter Einzugsermächtigung."
                        valueRef={mandate}
                        onSigned={() => setMandateSigned(true)}
                        onClear={() => setMandateSigned(false)}
                      />
                    </>
                  )}
                </div>
                {message && (
                  <div
                    className="rounded-lg border bg-gray-50 p-4 text-sm text-gray-700"
                    role="status"
                  >
                    {message}
                  </div>
                )}
                <div className="flex flex-col gap-3 rounded-lg border bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xl text-xs leading-5 text-gray-500">Die PDF wird vollständig in Ihrem Browser erstellt. Sie wird nicht an den Webserver hochgeladen. Danach können Sie sie speichern, in Ihrem E-Mail-Programm als Anhang verwenden oder einen lokalen E-Mail-Entwurf erzeugen.</p>
                  <div className="flex flex-wrap gap-2 sm:justify-end"><Button type="submit" disabled={busy} className="bg-club-accent hover:bg-club-accent/90">{busy ? <><Clock className="mr-2 h-4 w-4 animate-spin" />PDF wird erstellt...</> : <><FileText className="mr-2 h-4 w-4" />PDF vorbereiten</>}</Button>{prepared&&<><Button type="button" variant="outline" onClick={download}>PDF speichern</Button><Button type="button" variant="outline" onClick={mail}><Mail className="mr-2 h-4 w-4"/>E-Mail öffnen</Button><Button type="button" variant="outline" onClick={eml}>E-Mail-Entwurf (.eml)</Button></>}</div>
                </div>
              </form>
            </div>
          </details>
        </div>
        <div id="kontakt" className="mx-auto max-w-5xl pb-10">
          <Card>
            <CardHeader>
              <CardTitle>Probetag oder Fragen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                Du möchtest erst einmal vorbeikommen oder hast eine Frage? Nutze
                unser Kontaktformular.
              </p>
              <Link to="/kontakt">
                <Button variant="outline">
                  Zum Kontaktformular <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default MitgliedwerdenSection;
