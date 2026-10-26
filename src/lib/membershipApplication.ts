import { PDFDocument } from "pdf-lib";

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

// Same PDF technology as the standalone SC-Laufenburg HTML application:
// load the official blank PDF, render all entered values/signatures to a
// browser canvas at 3x resolution, then composite that canvas onto the PDF.
// No form data is uploaded to the server.
const TEMPLATE_URL = "/docs/aufnahmeantrag.pdf";

const LAYOUT = {
  width: 595.2755905511812,
  height: 841.8897637795277,
  fields: [
    {
      first: [40, 156, 242, 13], last: [310, 156, 245, 13],
      street: [40, 196, 360, 13], zip: [425, 196, 130, 13],
      city: [40, 236, 242, 13], birth: [310, 236, 245, 13],
      birthplace: [40, 276, 242, 13], nationality: [310, 276, 245, 13],
      email: [40, 316, 242, 13], phone: [310, 316, 245, 13],
      previousClub: [40, 420, 515, 13],
      applicationPlaceDate: [40, 636, 242, 13],
      representativeName: [310, 636, 245, 13],
    },
    {
      owner: [40, 270, 515, 13], accountStreet: [40, 313, 515, 13],
      accountZip: [40, 356, 130, 13], accountCity: [195, 356, 360, 13],
      bank: [40, 399, 242, 13], bic: [310, 399, 245, 13],
      iban: [40, 442, 515, 13], creditorID: [40, 485, 242, 13],
      mandateReference: [310, 485, 245, 13],
      bankPlaceDate: [40, 688, 242, 13],
    },
  ],
  checks: [
    {
      active: [40, 386], passive: [210, 386],
      m: [40, 465], w: [200, 465], divers: [365, 465],
      sportM: [365, 489], sportW: [465, 489],
      apply: [40, 556], terms: [40, 575], privacy: [40, 594],
    },
    { debit: [40, 144], mandateConsent: [40, 647] },
  ],
  signatures: {
    applicant: [0, 40, 681, 242, 68],
    representative: [0, 310, 681, 245, 68],
    mandate: [1, 310, 691, 245, 58],
  },
} as const;

const dateDE = (value: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? `${value.slice(8, 10)}.${value.slice(5, 7)}.${value.slice(0, 4)}`
    : value;

export function isMinor(birth: string, on = new Date().toISOString().slice(0, 10)) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birth) || birth > on) return false;
  const [by, bm, bd] = birth.split("-").map(Number);
  const [y, m, d] = on.split("-").map(Number);
  return y - by - (m < bm || (m === bm && d < bd) ? 1 : 0) < 18;
}

function splitPostalCity(value: string) {
  const match = value.trim().match(/^(\d{5})\s+(.+)$/);
  return match ? { zip: match[1], city: match[2] } : { zip: value.trim(), city: "" };
}

function loadImage(dataUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Ein Unterschriftsbild ist nicht lesbar."));
    image.src = dataUrl;
  });
}

function drawText(ctx: CanvasRenderingContext2D, value: unknown, x: number, y: number, width: number, maxSize = 11.1, color = "#193e68") {
  if (value === undefined || value === null || value === "") return;
  let size = maxSize;
  const text = String(value);
  ctx.font = `${size}px "Segoe UI", Arial, sans-serif`;
  const measured = ctx.measureText(text).width;
  if (measured > width) {
    size = Math.max(3.5, size * width / measured);
    ctx.font = `${size}px "Segoe UI", Arial, sans-serif`;
  }
  ctx.fillStyle = color;
  ctx.textBaseline = "top";
  ctx.fillText(text, x, y, width);
}

function snapshot(data: MembershipPdfData) {
  const { zip, city } = splitPostalCity(data.postal_city);
  const minor = isMinor(data.birth_date);
  return {
    first: data.first_name.trim(), last: data.last_name.trim(), street: data.address.trim(), zip, city,
    birth: data.birth_date, birthplace: data.birth_place.trim(), nationality: data.nationality.trim(),
    phone: data.phone.trim(), email: data.email.trim(), gender: data.gender, sportGender: data.sport_gender,
    membership: data.membership_type === "passive" || data.membership_type === "Passivmitglied" ? "passive" : "active",
    previousClub: data.previous_club.trim(), apply: true, terms: true, privacy: true,
    applicationPlace: data.application_place.trim(), applicationDate: data.application_date,
    minor, debit: Boolean(data.direct_debit), paperSign: false,
    owner: data.account_holder.trim(), accountStreet: data.address.trim(), accountZip: zip, accountCity: city,
    iban: data.iban.trim(), bank: data.bank_name.trim(), bic: data.bic.trim(),
    bankPlace: data.application_place.trim(), bankDate: data.application_date,
    creditorID: "", mandateReference: "Wird vom Verein vergeben",
    representativeName: minor ? (data.representative_name || "").trim() : "",
    mandateConsent: Boolean(data.direct_debit),
    signatures: {
      applicant: data.signatures.applicant || null,
      representative: data.signatures.representative || null,
      mandate: data.signatures.mandate || null,
    },
    signedAt: {
      applicant: data.signatures.applicant ? data.created : null,
      representative: data.signatures.representative ? data.created : null,
      mandate: data.signatures.mandate ? data.created : null,
    },
    created: data.created, textVersion: data.text_version,
  };
}

function displayValues(s: ReturnType<typeof snapshot>) {
  return {
    ...s,
    birth: dateDE(s.birth),
    applicationPlaceDate: [s.applicationPlace, dateDE(s.applicationDate)].filter(Boolean).join(", "),
    bankPlaceDate: s.debit ? [s.bankPlace, dateDE(s.bankDate)].filter(Boolean).join(", ") : "",
    creditorID: s.debit ? (s.creditorID || "IM TEST NICHT HINTERLEGT") : "",
    mandateReference: s.debit ? s.mandateReference : "",
  };
}

function tickKeys(s: ReturnType<typeof snapshot>, page: number) {
  if (page === 0) return [
    s.membership,
    s.gender,
    s.gender === "divers" ? (s.sportGender === "m" ? "sportM" : s.sportGender === "w" ? "sportW" : "") : "",
    ...(s.apply ? ["apply"] : []), ...(s.terms ? ["terms"] : []), ...(s.privacy ? ["privacy"] : []),
  ].filter(Boolean);
  return s.debit ? ["debit", ...(s.mandateConsent ? ["mandateConsent"] : [])] : [];
}

async function paintPage(s: ReturnType<typeof snapshot>, page: number, images: Partial<Record<SignatureKey, HTMLImageElement>>) {
  const scale = 3;
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(LAYOUT.width * scale);
  canvas.height = Math.ceil(LAYOUT.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas wird von diesem Browser nicht unterstützt.");
  ctx.scale(scale, scale);

  const values = displayValues(s) as Record<string, unknown>;
  for (const [key, [x, y, w, h]] of Object.entries(LAYOUT.fields[page]) as Array<[string, readonly [number, number, number, number]]>) {
    drawText(ctx, values[key], x, y, w, Math.min(11.1, h - 1));
  }

  if (page === 0 && !s.minor) {
    const [x, y, w] = LAYOUT.fields[0].representativeName;
    drawText(ctx, "entfällt – volljährig", x, y, w, 10.5, "#6a747a");
    const [, sx, sy, sw, sh] = LAYOUT.signatures.representative;
    drawText(ctx, "entfällt – volljährig", sx, sy + sh - 12, sw, 10.5, "#6a747a");
  }

  for (const key of tickKeys(s, page)) {
    const pos = (LAYOUT.checks[page] as Record<string, readonly [number, number]>)[key];
    if (!pos) continue;
    const [x, y] = pos;
    ctx.strokeStyle = "#184d68";
    ctx.lineWidth = 1.15;
    ctx.beginPath();
    ctx.moveTo(x + 1.2, y + 1.2); ctx.lineTo(x + 6.8, y + 6.8);
    ctx.moveTo(x + 6.8, y + 1.2); ctx.lineTo(x + 1.2, y + 6.8);
    ctx.stroke();
  }

  for (const [key, [targetPage, x, y, w, h]] of Object.entries(LAYOUT.signatures) as Array<[SignatureKey, readonly [number, number, number, number, number]]>) {
    if (targetPage !== page || (key === "representative" && !s.minor) || (key === "mandate" && !s.debit)) continue;
    const image = images[key];
    if (!image) continue;
    const factor = Math.min(w / image.naturalWidth, h / image.naturalHeight);
    ctx.drawImage(image, x, y + h - image.naturalHeight * factor, image.naturalWidth * factor, image.naturalHeight * factor);
  }

  return canvas;
}

export async function createMembershipPdf(data: MembershipPdfData) {
  const s = snapshot(data);
  const images: Partial<Record<SignatureKey, HTMLImageElement>> = {};
  for (const [key, value] of Object.entries(s.signatures) as Array<[SignatureKey, string | null]>) {
    if (value) images[key] = await loadImage(value);
  }

  // This is the same PDFDocument.load + canvas overlay sequence used by the
  // supplied HTML application. The template is static; no form values are sent.
  const response = await fetch(TEMPLATE_URL, { cache: "no-store" });
  if (!response.ok) throw new Error(`Das offizielle Antragsformular konnte nicht geladen werden (${response.status}).`);
  const template = await response.arrayBuffer();
  const pdf = await PDFDocument.load(template);
  if (!s.debit && pdf.getPageCount() > 1) pdf.removePage(1);

  for (let i = 0; i < pdf.getPageCount(); i++) {
    const canvas = await paintPage(s, i, images);
    const overlay = await pdf.embedPng(canvas.toDataURL("image/png"));
    pdf.getPages()[i].drawImage(overlay, { x: 0, y: 0, width: LAYOUT.width, height: LAYOUT.height });
  }

  pdf.setTitle("Aufnahmeantrag Schachclub Laufenburg");
  pdf.setAuthor("");
  pdf.setSubject(`Fassung ${data.text_version}; lokale Erstellung`);
  pdf.setProducer("SC Laufenburg lokale Formularanwendung");
  const output = await pdf.save();
  return { file: new File([output], "SC-Laufenburg-Aufnahmeantrag.pdf", { type: "application/pdf" }) };
}
