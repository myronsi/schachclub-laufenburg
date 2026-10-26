import { PDFDocument } from "pdf-lib";

type SignatureKey = "applicant" | "representative" | "mandate";
export type MembershipPdfData = {
  first_name: string; last_name: string; address: string; postal_city: string;
  birth_date: string; birth_place: string; phone: string; email: string;
  nationality: string; gender: string; sport_gender?: string; previous_club: string;
  membership_type: string; application_place: string; application_date: string;
  direct_debit: boolean; bank_name: string; bic: string; iban: string;
  account_holder: string; representative_name?: string;
  signatures: Partial<Record<SignatureKey, string>>; created: string; text_version: string;
};

const PAGE_WIDTH = 595.32;
const PAGE_HEIGHT = 842.04;

// The supplied official SC Laufenburg PDF is the actual page artwork. We only
// paint the user's values/signatures on a browser canvas and place that canvas
// over the original PDF. This is the same client-side technique used by the
// supplied standalone HTML application.
const OFFICIAL_PDF_BASE64 =
  'JVBERi0xLjQKJcTl8uXrp/Og0MTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVo=';

const today = () => new Date().toISOString().slice(0, 10);

export function isMinor(value: string, on = today()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value > on) return false;
  const [by, bm, bd] = value.split("-").map(Number);
  const [y, m, d] = on.split("-").map(Number);
  return y - by - (m < bm || (m === bm && d < bd) ? 1 : 0) < 18;
}

function dateDE(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value || "";
  const [y, m, d] = value.split("-");
  return `${d}.${m}.${y}`;
}

function loadImage(data: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Ein Unterschriftsbild ist nicht lesbar."));
    image.src = data;
  });
}

function drawText(ctx: CanvasRenderingContext2D, value: unknown, x: number, y: number, width: number, maxSize = 11.1) {
  if (value === undefined || value === null || value === "") return;
  const text = String(value).replace(/\u25a1/g, "").trim();
  if (!text) return;
  let size = maxSize;
  ctx.font = `${size}px "Segoe UI", Arial, sans-serif`;
  const measured = ctx.measureText(text).width;
  if (measured > width) {
    size = Math.max(5.5, size * width / measured);
    ctx.font = `${size}px "Segoe UI", Arial, sans-serif`;
  }
  ctx.fillStyle = "#193e68";
  ctx.textBaseline = "top";
  ctx.fillText(text, x, y, width);
}

function drawTick(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.strokeStyle = "#184d68";
  ctx.lineWidth = 1.15;
  ctx.beginPath();
  ctx.moveTo(x + 1.2, y + 1.2);
  ctx.lineTo(x + 8.2, y + 8.2);
  ctx.moveTo(x + 8.2, y + 1.2);
  ctx.lineTo(x + 1.2, y + 8.2);
  ctx.stroke();
}

function drawSignature(ctx: CanvasRenderingContext2D, image: HTMLImageElement | undefined, x: number, y: number, width: number, height: number) {
  if (!image?.naturalWidth || !image.naturalHeight) return;
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const w = image.naturalWidth * scale;
  const h = image.naturalHeight * scale;
  ctx.drawImage(image, x + (width - w) / 2, y + height - h, w, h);
}

function paintOfficialPage(data: MembershipPdfData, canvas: HTMLCanvasElement, images: Partial<Record<SignatureKey, HTMLImageElement>>) {
  const scale = 3;
  canvas.width = Math.ceil(PAGE_WIDTH * scale);
  canvas.height = Math.ceil(PAGE_HEIGHT * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas konnte nicht initialisiert werden.");
  ctx.scale(scale, scale);

  // Coordinates measured from the supplied official PDF (595.32 × 842.04 pt).
  drawText(ctx, data.first_name, 156, 272, 138);
  drawText(ctx, data.last_name, 390, 272, 168);
  drawText(ctx, data.postal_city, 156, 298, 138);
  drawText(ctx, data.address, 390, 298, 168);
  drawText(ctx, dateDE(data.birth_date), 156, 324, 138);
  drawText(ctx, data.birth_place, 390, 324, 168);
  drawText(ctx, data.phone, 156, 350, 138);
  drawText(ctx, data.email, 366, 350, 192);

  if (data.nationality === "Deutsch") drawTick(ctx, 184.34, 375.30);
  else if (data.nationality === "EU-Angehöriger") drawTick(ctx, 248.21, 375.30);
  else {
    drawTick(ctx, 347.47, 375.30);
    drawText(ctx, data.nationality.replace(/^Sonstige:\s*/i, ""), 414, 375, 144, 10.5);
  }

  if (data.gender === "m") drawTick(ctx, 184.34, 401.10);
  if (data.gender === "w") drawTick(ctx, 248.21, 401.10);
  drawText(ctx, data.previous_club, 414, 401, 144, 10.5);

  if (data.membership_type === "Aktivmitglied") drawTick(ctx, 184.34, 426.92);
  if (data.membership_type === "Passivmitglied") drawTick(ctx, 297.77, 426.92);

  drawTick(ctx, 70.94, 452.72);
  drawText(ctx, `${data.application_place}, den ${dateDE(data.application_date)}`, 156, 478, 138, 10.5);

  if (isMinor(data.birth_date)) {
    drawText(ctx, data.representative_name || "", 71, 518, 222, 10.2);
    drawSignature(ctx, images.representative, 71, 505, 222, 42);
  }
  drawSignature(ctx, images.applicant, 329, 505, 229, 42);

  if (data.direct_debit) {
    drawText(ctx, data.bank_name, 156, 667, 168, 10.5);
    drawText(ctx, data.bic, 346, 667, 212, 10.5);
    drawText(ctx, data.iban, 156, 696, 402, 10.5);
    drawText(ctx, data.account_holder, 300, 724, 258, 10.5);
    drawText(ctx, `${data.application_place}, den ${dateDE(data.application_date)}`, 156, 752, 220, 10.2);
    drawSignature(ctx, images.mandate, 329, 741, 229, 42);
  }
}

export async function createMembershipPdf(data: MembershipPdfData) {
  const images: Partial<Record<SignatureKey, HTMLImageElement>> = {};
  await Promise.all(
    Object.entries(data.signatures)
      .filter((entry): entry is [SignatureKey, string] => Boolean(entry[1]))
      .map(async ([key, value]) => {
        images[key] = await loadImage(value);
      }),
  );

  const pdfBytes = Uint8Array.from(atob(OFFICIAL_PDF_BASE64), char => char.charCodeAt(0));
  const pdf = await PDFDocument.load(pdfBytes);
  const page = pdf.getPage(0);
  const overlay = document.createElement("canvas");
  paintOfficialPage(data, overlay, images);
  const png = await pdf.embedPng(overlay.toDataURL("image/png"));
  page.drawImage(png, { x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT });

  pdf.setTitle("Aufnahmeantrag Schachclub Laufenburg");
  pdf.setAuthor("");
  pdf.setSubject(`Fassung ${data.text_version}; lokale Erstellung`);
  pdf.setProducer("SC Laufenburg lokale Formularanwendung");

  const bytes = await pdf.save();
  return { file: new Blob([bytes], { type: "application/pdf" }) };
}
