import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useRef, useState } from "react";
import { Eraser, Send, Heart, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API = "https://sc-laufenburg.de/api/membership-applications.php";

type FormState = {
  first_name: string; last_name: string; address: string; postal_city: string;
  birth_date: string; birth_place: string; phone: string; email: string;
  nationality: string; nationality_other: string; gender: string; previous_club: string; membership_type: string;
  application_place: string; application_date: string;
  direct_debit: boolean; bank_name: string; bic: string; iban: string; account_holder: string;
};

const today = new Date().toISOString().slice(0, 10);
const initialForm: FormState = {
  first_name: "", last_name: "", address: "", postal_city: "", birth_date: "", birth_place: "",
  phone: "", email: "", nationality: "", nationality_other: "", gender: "", previous_club: "", membership_type: "Aktivmitglied",
  application_place: "Laufenburg", application_date: today,
  direct_debit: false, bank_name: "", bic: "", iban: "", account_holder: ""
};

const Field = ({label, required, children}: {label: string; required?: boolean; children: React.ReactNode}) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-800">{label}{required && <span className="text-red-600"> *</span>}</label>
    {children}
  </div>
);

const SignaturePad = ({label, hint, valueRef, onSigned, onClear}: {
  label: string; hint: string; valueRef: React.MutableRefObject<HTMLCanvasElement | null>;
  onSigned: () => void; onClear: () => void;
}) => {
  const drawing = useRef(false);
  const hasStroke = useRef(false);
  useEffect(() => {
    const c = valueRef.current;
    if (!c) return;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    c.width = c.clientWidth * ratio;
    c.height = c.clientHeight * ratio;
    const ctx = c.getContext("2d");
    if (ctx) { ctx.scale(ratio, ratio); ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.strokeStyle = "#111827"; }
  }, [valueRef]);
  const point = (e: PointerEvent) => { const r = valueRef.current!.getBoundingClientRect(); return {x: e.clientX-r.left, y: e.clientY-r.top}; };
  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c=valueRef.current, ctx=c?.getContext("2d"); if(!c||!ctx)return;
    drawing.current=true; c.setPointerCapture(e.pointerId); const p=point(e.nativeEvent); ctx.beginPath(); ctx.moveTo(p.x,p.y);
  };
  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if(!drawing.current)return; const ctx=valueRef.current?.getContext("2d"); if(!ctx)return;
    const p=point(e.nativeEvent); ctx.lineTo(p.x,p.y); ctx.stroke(); hasStroke.current=true; onSigned();
  };
  const clear = () => {
    const c=valueRef.current,ctx=c?.getContext("2d"); if(!c||!ctx)return;
    ctx.clearRect(0,0,c.width,c.height); hasStroke.current=false; onClear();
  };
  return <div className="border rounded-lg p-4 bg-gray-50/50">
    <div className="flex items-center justify-between gap-3 mb-2">
      <div><h3 className="font-semibold text-gray-900">{label}</h3><p className="text-xs text-gray-500">{hint}</p></div>
      <Button type="button" variant="outline" size="sm" onClick={clear}><Eraser className="w-4 h-4 mr-1"/>Löschen</Button>
    </div>
    <canvas ref={valueRef} className="w-full h-32 border rounded bg-white touch-none cursor-crosshair" onPointerDown={start} onPointerMove={draw} onPointerUp={()=>{drawing.current=false}} onPointerCancel={()=>{drawing.current=false}} />
  </div>;
};

const MitgliedwerdenSection = () => {
  const introAnim=useScrollAnimation(), stepsAnim=useScrollAnimation(), formAnim=useScrollAnimation();
  const applicantCanvas=useRef<HTMLCanvasElement|null>(null), guardianCanvas=useRef<HTMLCanvasElement|null>(null), debitCanvas=useRef<HTMLCanvasElement|null>(null);
  const [form,setForm]=useState<FormState>(initialForm);
  const [applicantSigned,setApplicantSigned]=useState(false), [guardianSigned,setGuardianSigned]=useState(false), [debitSigned,setDebitSigned]=useState(false);
  const [submitting,setSubmitting]=useState(false), [message,setMessage]=useState("");
  const set=(k:keyof FormState,v:string|boolean)=>setForm(x=>({...x,[k]:v}));
  const canvasData=(ref: React.MutableRefObject<HTMLCanvasElement|null>) => ref.current?.toDataURL("image/png") || "";
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault(); setMessage("");
    if(!applicantSigned){setMessage("Bitte unterschreiben Sie den Antrag.");return;}
    if(form.direct_debit && !debitSigned){setMessage("Bitte unterschreiben Sie auch die Einzugsermächtigung.");return;}
    setSubmitting(true);
    try{
      const payload={...form, nationality:form.nationality === "Sonstige" ? `Sonstige: ${form.nationality_other.trim()}` : form.nationality, signature:canvasData(applicantCanvas), guardian_signature:guardianSigned?canvasData(guardianCanvas):"", debit_signature:form.direct_debit?canvasData(debitCanvas):"", signed_at:new Date().toISOString()};
      const r=await fetch(API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const d=await r.json(); if(!r.ok||d.success===false)throw new Error(d.message||"Der Antrag konnte nicht gesendet werden.");
      setForm({...initialForm, application_date:new Date().toISOString().slice(0,10)}); setApplicantSigned(false);setGuardianSigned(false);setDebitSigned(false);setMessage("Ihr Mitgliedsantrag wurde erfolgreich an den geschäftsführenden Vorstand zur Prüfung übermittelt.");
    }catch(e){setMessage(e instanceof Error?e.message:"Fehler beim Senden.");}finally{setSubmitting(false);}
  };

  return <section id="mitgliedwerden" className="py-16 animate-fadeIn"><div className="container mx-auto px-4">
    <header className="text-center mb-10" ref={introAnim.elementRef}>
      <h2 className="text-3xl font-bold text-club-primary">Mitglied werden</h2>
      <p className="mt-3 text-gray-600 max-w-3xl mx-auto">Füllen Sie den Aufnahmeantrag vollständig online aus. Die Angaben entsprechen dem bisherigen Aufnahmeantrag des Schachclub Laufenburg e.V. Anschließend können Sie den Antrag digital unterschreiben und zur Prüfung einreichen.</p>
    </header>
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 ${stepsAnim.isVisible?"animate-slideInUp":"opacity-0"}`} ref={stepsAnim.elementRef}>
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Heart/> Mitgliedschaft</CardTitle></CardHeader><CardContent><p className="text-sm text-gray-700">Ich möchte Mitglied beim Schachclub Laufenburg e.V. und im Badischen Schachverband e.V. werden.</p></CardContent></Card>
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Calendar/> Ablauf</CardTitle></CardHeader><CardContent><ol className="text-sm text-gray-700 list-decimal list-inside space-y-2"><li>Angaben wie im Aufnahmeantrag eintragen.</li><li>Digital unterschreiben.</li><li>Elektronisch zur Prüfung einreichen.</li></ol><a href="/docs/aufnahmeantrag.pdf" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex text-sm underline">Originalen Aufnahmeantrag als PDF ansehen</a></CardContent></Card>
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Clock/> Hinweis</CardTitle></CardHeader><CardContent><p className="text-sm text-gray-700">Die eingereichten Anträge sind ausschließlich für den geschäftsführenden Vorstand bestimmt.</p></CardContent></Card>
    </div>

    <Card ref={formAnim.elementRef} className={`max-w-5xl mx-auto ${formAnim.isVisible?"animate-slideInUp":"opacity-0"}`}>
      <CardHeader className="border-b"><CardTitle className="text-2xl">Aufnahmeantrag</CardTitle><p className="text-sm text-gray-600">Schachclub Laufenburg e.V. – gegründet 1969 –</p></CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={submit} className="space-y-7">
          <div className="rounded-lg border-2 border-gray-800 p-5 md:p-7 space-y-6">
            <p className="text-gray-800 leading-relaxed">Ich möchte Mitglied beim Schachclub Laufenburg e.V. und im Badischen Schachverband e.V. werden. Die Satzung des Schachclubs Laufenburg e.V. erkenne ich an. Über die momentan gültigen Mitgliedsbeiträge habe ich mich informiert.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <Field label="Vorname" required><Input required value={form.first_name} onChange={e=>set("first_name",e.target.value)} /></Field>
              <Field label="Name" required><Input required value={form.last_name} onChange={e=>set("last_name",e.target.value)} /></Field>
              <Field label="PLZ, Wohnort" required><Input required value={form.postal_city} onChange={e=>set("postal_city",e.target.value)} placeholder="z. B. 79725 Laufenburg" /></Field>
              <Field label="Strasse" required><Input required value={form.address} onChange={e=>set("address",e.target.value)} /></Field>
              <Field label="geboren am" required><Input required type="date" value={form.birth_date} onChange={e=>set("birth_date",e.target.value)} /></Field>
              <Field label="Geburtsort"><Input value={form.birth_place} onChange={e=>set("birth_place",e.target.value)} /></Field>
              <Field label="Telefon"><Input value={form.phone} onChange={e=>set("phone",e.target.value)} /></Field>
              <Field label="Email" required><Input required type="email" value={form.email} onChange={e=>set("email",e.target.value)} /></Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Staatsangehörigkeit" required>
                <div className="flex flex-wrap gap-4 pt-2 text-sm">
                  {[["Deutsch","Deutsch"],["EU-Angehöriger","EU-Angehöriger"],["Sonstige","Sonstige"]].map(([value,label])=><label key={value} className="inline-flex items-center gap-2"><input type="radio" name="nationality" required checked={form.nationality===value} onChange={()=>set("nationality",value)} />{label}</label>)}
                </div>
              </Field>
              <Field label="Geschlecht" required>
                <div className="flex flex-wrap gap-4 pt-2 text-sm">
                  {[["männlich","männlich"],["weiblich","weiblich"]].map(([value,label])=><label key={value} className="inline-flex items-center gap-2"><input type="radio" name="gender" required checked={form.gender===value} onChange={()=>set("gender",value)} />{label}</label>)}
                </div>
              </Field>
            </div>
            {form.nationality === "Sonstige" && <Field label="Sonstige Staatsangehörigkeit" required><Input required value={form.nationality_other} onChange={e=>set("nationality_other",e.target.value)} placeholder="Bitte angeben" /></Field>}
            <Field label="Früherer Verein"><Input value={form.previous_club} onChange={e=>set("previous_club",e.target.value)} /></Field>
            <Field label="Art der Mitgliedschaft" required>
              <div className="flex flex-wrap gap-6 pt-2 text-sm">
                {["Aktivmitglied","Passivmitglied"].map(value=><label key={value} className="inline-flex items-center gap-2"><input type="radio" name="membership_type" required checked={form.membership_type===value} onChange={()=>set("membership_type",value)} />{value}</label>)}
              </div>
            </Field>
            <label className="flex items-start gap-2 text-sm leading-relaxed"><input required type="checkbox" className="mt-1"/><span>Ich habe die Datenschutzerklärung des badischen Schachverbandes zur Kenntnis genommen.</span></label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Field label="Ort"><Input required value={form.application_place} onChange={e=>set("application_place",e.target.value)} /></Field>
              <Field label="Datum"><Input required type="date" value={form.application_date} onChange={e=>set("application_date",e.target.value)} /></Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <SignaturePad label="Gesetzlicher Vertreter" hint="Nur bei Jugendlichen erforderlich." valueRef={guardianCanvas} onSigned={()=>setGuardianSigned(true)} onClear={()=>setGuardianSigned(false)} />
              <SignaturePad label="Der Antragsteller" hint="Bitte hier digital unterschreiben." valueRef={applicantCanvas} onSigned={()=>setApplicantSigned(true)} onClear={()=>setApplicantSigned(false)} />
            </div>
          </div>

          <div className="rounded-lg border-2 border-gray-800 p-5 md:p-7 space-y-5">
            <div><p className="text-sm text-gray-700 mb-1">Falls Sie möchten, machen Sie unserem Kassier das Leben leichter:</p><h3 className="text-xl font-bold underline">Einzugsermächtigung</h3></div>
            <p className="text-gray-800 leading-relaxed">Nach meiner Aufnahme im Schachclub Laufenburg e.V. ermächtige ich den Verein bis auf Widerruf, den jeweiligen Jahresbeitrag zu Beginn des Jahres von meinem Konto abzubuchen.</p>
            <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={form.direct_debit} onChange={e=>set("direct_debit",e.target.checked)} className="mt-1"/><span>Ich möchte die Einzugsermächtigung erteilen.</span></label>
            {form.direct_debit && <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Kreditinstitut" required><Input required value={form.bank_name} onChange={e=>set("bank_name",e.target.value)} /></Field>
                <Field label="BIC" required><Input required value={form.bic} onChange={e=>set("bic",e.target.value)} /></Field>
                <Field label="IBAN" required><Input required value={form.iban} onChange={e=>set("iban",e.target.value)} className="md:col-span-2" /></Field>
                <Field label="Name des Kontoinhabers (falls abweichend)"><Input value={form.account_holder} onChange={e=>set("account_holder",e.target.value)} className="md:col-span-2" /></Field>
              </div>
              <SignaturePad label="Unterschrift" hint="Bestätigt die Einzugsermächtigung." valueRef={debitCanvas} onSigned={()=>setDebitSigned(true)} onClear={()=>setDebitSigned(false)} />
            </>}
            <div className="text-xs text-gray-500">Die Antragsdaten und die Unterschriften werden zur Prüfung elektronisch an den geschäftsführenden Vorstand übermittelt.</div>
          </div>

          {message&&<div className="rounded-md border p-3 text-sm bg-gray-50" role="status">{message}</div>}
          <Button type="submit" disabled={submitting} className="w-full bg-club-accent hover:bg-club-accent/90"><Send className="w-4 h-4 mr-2"/>{submitting?"Wird zur Prüfung gesendet...":"Aufnahmeantrag elektronisch einreichen"}</Button>
        </form>
      </CardContent>
    </Card>
  </div></section>;
};

export default MitgliedwerdenSection;
