type SignatureKey = "applicant" | "representative" | "mandate";

export type MembershipPdfData = {
  first_name: string;
  last_name: string;
  address: string;
  postal_city: string;
  birth_date: string;
  birth_place: string;
  phone: string;
  email: string;
  nationality: string;
  gender: string;
  sport_gender?: string;
  previous_club: string;
  membership_type: string;
  application_place: string;
  application_date: string;
  direct_debit: boolean;
  bank_name: string;
  bic: string;
  iban: string;
  account_holder: string;
  representative_name?: string;
  signatures: Partial<Record<SignatureKey, string>>;
  created: string;
  text_version: string;
};

type PdfLib = {
  PDFDocument: {
    load: (bytes: Uint8Array) => Promise<{
      getPageCount: () => number;
      removePage: (index: number) => void;
      getPages: () => Array<{ drawImage: (image: unknown, options: { x: number; y: number; width: number; height: number }) => void }>;
      embedPng: (dataUri: string) => Promise<unknown>;
      setTitle: (value: string) => void;
      setAuthor: (value: string) => void;
      setSubject: (value: string) => void;
      setProducer: (value: string) => void;
      save: () => Promise<Uint8Array>;
    }>;
  };
};

type OpenPgp = {
  readKey: (options: { armoredKey: string }) => Promise<{ isPrivate: () => boolean; getFingerprint: () => string; getEncryptionKey: () => Promise<unknown> }>;
  createMessage: (options: { binary: Uint8Array; filename: string }) => Promise<unknown>;
  encrypt: (options: { message: unknown; encryptionKeys: unknown; format: "binary" }) => Promise<Uint8Array>;
};

declare global {
  interface Window {
    PDFLib?: PdfLib;
    openpgp?: OpenPgp;
  }
}

const PDF_LIB_URL = "https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js";
const OPENPGP_URL = "https://cdn.jsdelivr.net/npm/openpgp@6.1.1/dist/openpgp.min.js";
const TEMPLATE_URL = "/docs/aufnahmeantrag.pdf";

// The public key is intentionally not embedded here. Configure the production
// public key through VITE_MEMBERSHIP_PGP_PUBLIC_KEY and its fingerprint.
const PUBLIC_KEY = import.meta.env.VITE_MEMBERSHIP_PGP_PUBLIC_KEY?.trim() || "";
const PUBLIC_KEY_FINGERPRINT = (import.meta.env.VITE_MEMBERSHIP_PGP_FINGERPRINT || "").replace(/\s/g, "").toLowerCase();

const LAYOUT = {
  width: 595.2755905511812,
  height: 841.8897637795277,
  fields: [
    {
      first: [40, 156, 242, 13], last: [310, 156, 245, 13], street: [40, 196, 360, 13], zip: [425, 196, 130, 13],
      city: [40, 236, 242, 13], birth: [310, 236, 245, 13], birthplace: [40, 276, 242, 13], nationality: [310, 276, 245, 13],
      email: [40, 316, 242, 13], phone: [310, 316, 245, 13], previousClub: [40, 420, 515, 13],
      applicationPlaceDate: [40, 636, 242, 13], representativeName: [310, 636, 245, 13],
    },
    {
      owner: [40, 270, 515, 13], accountStreet: [40, 313, 515, 13], accountZip: [40, 356, 130, 13], accountCity: [195, 356, 360, 13],
      bank: [40, 399, 242, 13], bic: [310, 399, 245, 13], iban: [40, 442, 515, 13], creditorID: [40, 485, 242, 13],
      mandateReference: [310, 485, 245, 13], bankPlaceDate: [40, 688, 242, 13],
    },
  ],
  checks: [
    { active: [40, 386], passive: [210, 386], m: [40, 465], w: [200, 465], divers: [365, 465], sportM: [365, 489], sportW: [465, 489], apply: [40, 556], terms: [40, 575], privacy: [40, 594] },
    { debit: [40, 144], mandateConsent: [40, 647] },
  ],
  signatures: {
    applicant: [0, 40, 681, 242, 68],
    representative: [0, 310, 681, 245, 68],
    mandate: [1, 310, 691, 245, 58],
  } as Record<SignatureKey, [number, number, number, number, number]>,
};

const scripts = new Map<string, Promise<void>>();

function loadScript(src: string) {
  const existing = scripts.get(src);
  if (existing) return existing;
  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Eine benötigte Formularbibliothek konnte nicht geladen werden."));
    document.head.appendChild(script);
  });
  scripts.set(src, promise);
  return promise;
}

async function libraries() {
  await Promise.all([loadScript(PDF_LIB_URL), loadScript(OPENPGP_URL)]);
  if (!window.PDFLib || !window.openpgp) throw new Error("Die Formularbibliotheken sind nicht verfügbar.");
  return { pdfLib: window.PDFLib, openpgp: window.openpgp };
}

function dateDE(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value.slice(8, 10)}.${value.slice(5, 7)}.${value.slice(0, 4)}` : value;
}

function drawText(ctx: CanvasRenderingContext2D, text: unknown, x: number, y: number, width: number, maxSize = 11.1) {
  if (text === undefined || text === null || text === "") return;
  const value = String(text);
  let size = maxSize;
  ctx.font = `${size}px Arial, sans-serif`;
  const measured = ctx.measureText(value).width;
  if (measured > width) {
    size = Math.max(3.5, size * width / measured);
    ctx.font = `${size}px Arial, sans-serif`;
  }
  ctx.fillStyle = "#193e68";
  ctx.textBaseline = "top";
  ctx.fillText(value, x, y);
}

function paintPage(data: MembershipPdfData, pageIndex: number, canvas: HTMLCanvasElement) {
  const scale = 3;
  canvas.width = Math.ceil(LAYOUT.width * scale);
  canvas.height = Math.ceil(LAYOUT.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Die PDF-Vorschau konnte nicht erstellt werden.");
  ctx.scale(scale, scale);

  const values: Record<string, string> = {
    first: data.first_name,
    last: data.last_name,
    street: data.address,
    zip: data.postal_city.match(/^\s*(\d{5})\s+/)?.[1] || data.postal_city,
    city: data.postal_city.replace(/^\s*\d{5}\s+/, ""),
    birth: dateDE(data.birth_date),
    birthplace: data.birth_place,
    nationality: data.nationality,
    email: data.email,
    phone: data.phone,
    previousClub: data.previous_club,
    applicationPlaceDate: [data.application_place, dateDE(data.application_date)].filter(Boolean).join(", "),
    representativeName: data.representative_name || "",
    owner: data.account_holder,
    accountStreet: data.address,
    accountZip: data.postal_city.match(/^\s*(\d{5})\s+/)?.[1] || data.postal_city,
    accountCity: data.postal_city.replace(/^\s*\d{5}\s+/, ""),
    bank: data.bank_name,
    bic: data.bic,
    iban: data.iban.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim(),
    creditorID: "Wird vom Verein vergeben",
    mandateReference: "Wird vom Verein vergeben",
    bankPlaceDate: [data.application_place, dateDE(data.application_date)].filter(Boolean).join(", "),
  };

  for (const [key, box] of Object.entries(LAYOUT.fields[pageIndex] || {})) {
    const [x, y, width, height] = box;
    drawText(ctx, values[key], x, y, width, Math.min(11.1, height - 1));
  }

  const checks = pageIndex === 0
    ? [
        data.membership_type === "Aktivmitglied" ? "active" : data.membership_type === "Passivmitglied" ? "passive" : "",
        data.gender === "männlich" ? "m" : data.gender === "weiblich" ? "w" : data.gender === "divers" ? "divers" : "",
        data.gender === "divers" ? (data.sport_gender === "m" ? "sportM" : data.sport_gender === "w" ? "sportW" : "") : "",
        "apply", "terms", "privacy",
      ]
    : data.direct_debit ? ["debit", "mandateConsent"] : [];

  for (const key of checks) {
    const position = (LAYOUT.checks[pageIndex] as Record<string, [number, number]>)[key];
    if (!position) continue;
    const [x, y] = position;
    ctx.strokeStyle = "#184d68";
    ctx.lineWidth = 1.15;
    ctx.beginPath();
    ctx.moveTo(x + 1.2, y + 1.2); ctx.lineTo(x + 6.8, y + 6.8);
    ctx.moveTo(x + 6.8, y + 1.2); ctx.lineTo(x + 1.2, y + 6.8);
    ctx.stroke();
  }

  const signatures: SignatureKey[] = pageIndex === 0 ? ["applicant", "representative"] : ["mandate"];
  for (const key of signatures) {
    if (key === "representative" && !isMinor(data.birth_date)) continue;
    if (key === "mandate" && !data.direct_debit) continue;
    const image = data.signatures[key];
    if (!image) continue;
    const [, x, y, width, height] = LAYOUT.signatures[key];
    const im = new Image();
    // The caller waits for these images before painting, so this is only used for a
    // synchronous draw after the image has been decoded into the canvas below.
    void im;
    // Signatures are painted by paintSignatureImages(), after this base layer.
    void x; void y; void width; void height;
  }

  drawText(ctx, `Fassung ${data.text_version} · ${pageIndex + 1} / ${data.direct_debit ? 2 : 1}`, 40, 806, 515, 6.5);
  drawText(ctx, `Erklärungen bestätigt · Erstellung ${data.created} · SEPA ${data.direct_debit ? "Ja" : "Nein"}`, 40, 818, 515, 5.9);
}

function isMinor(birth: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birth)) return false;
  const now = new Date();
  const [year, month, day] = birth.split("-").map(Number);
  let age = now.getFullYear() - year;
  if (now.getMonth() + 1 < month || (now.getMonth() + 1 === month && now.getDate() < day)) age -= 1;
  return age < 18;
}

async function paintSignatureImages(data: MembershipPdfData, pageIndex: number, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const scale = 3;
  const entries: SignatureKey[] = pageIndex === 0 ? ["applicant", "representative"] : ["mandate"];
  for (const key of entries) {
    if (key === "representative" && !isMinor(data.birth_date)) continue;
    if (key === "mandate" && !data.direct_debit) continue;
    const src = data.signatures[key];
    if (!src) continue;
    const [, x, y, width, height] = LAYOUT.signatures[key];
    const image = new Image();
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Eine Unterschrift konnte nicht verarbeitet werden."));
      image.src = src;
    });
    const factor = Math.min(width / image.naturalWidth, height / image.naturalHeight);
    ctx.drawImage(image, x * scale, (y + height - image.naturalHeight * factor) * scale, image.naturalWidth * factor * scale, image.naturalHeight * factor * scale);
  }
}

async function createPdf(data: MembershipPdfData) {
  const { pdfLib } = await libraries();
  const response = await fetch(TEMPLATE_URL, { cache: "no-store" });
  if (!response.ok) throw new Error("Die Aufnahmeantrag-Vorlage konnte nicht geladen werden.");
  const template = new Uint8Array(await response.arrayBuffer());
  const pdf = await pdfLib.PDFDocument.load(template);
  if (!data.direct_debit && pdf.getPageCount() > 1) pdf.removePage(1);

  const pages = pdf.getPages();
  for (let i = 0; i < pages.length; i += 1) {
    const canvas = document.createElement("canvas");
    paintPage(data, i, canvas);
    await paintSignatureImages(data, i, canvas);
    const overlay = await pdf.embedPng(canvas.toDataURL("image/png"));
    pages[i].drawImage(overlay, { x: 0, y: 0, width: LAYOUT.width, height: LAYOUT.height });
  }
  pdf.setTitle("Aufnahmeantrag Schachclub Laufenburg");
  pdf.setAuthor("Schachclub Laufenburg e.V.");
  pdf.setSubject(`Fassung ${data.text_version}; lokale Erstellung`);
  pdf.setProducer("SC Laufenburg lokale Formularanwendung");
  return pdf.save();
}

export async function createEncryptedMembershipPdf(data: MembershipPdfData) {
  if (!PUBLIC_KEY || !PUBLIC_KEY_FINGERPRINT) {
    throw new Error("Der Empfängerschlüssel ist noch nicht für den Versand konfiguriert.");
  }
  const { openpgp } = await libraries();
  const pdf = await createPdf(data);
  const key = await openpgp.readKey({ armoredKey: PUBLIC_KEY });
  if (key.isPrivate()) throw new Error("Der konfigurierte Empfängerschlüssel darf kein privater Schlüssel sein.");
  const actualFingerprint = key.getFingerprint().toLowerCase();
  if (actualFingerprint !== PUBLIC_KEY_FINGERPRINT) throw new Error("Der Empfängerschlüssel stimmt nicht mit dem hinterlegten Fingerabdruck überein.");
  await key.getEncryptionKey();
  const token = crypto.randomUUID().slice(0, 8);
  const pdfName = `SC-Aufnahmeantrag-${token}.pdf`;
  const message = await openpgp.createMessage({ binary: pdf, filename: pdfName });
  const encrypted = await openpgp.encrypt({ message, encryptionKeys: key, format: "binary" });
  return {
    file: new File([encrypted], `${pdfName}.pgp`, { type: "application/octet-stream" }),
    pdf,
  };
}

export { isMinor };
