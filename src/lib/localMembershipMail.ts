import { createMembershipPdf } from "@/lib/membershipApplication";
import type { MembershipPdfData } from "@/lib/membershipApplication";

export const MEMBERSHIP_RECIPIENTS = [
  "jochen@bahner.de",
  "daniel@bahner.de",
] as const;

export async function prepareLocalMembershipApplication(data: MembershipPdfData) {
  const { file } = await createMembershipPdf(data);
  const token = crypto.randomUUID().slice(0, 8);
  const name = `SC-Aufnahmeantrag-${token}.pdf`;
  return { file: new File([file], name, { type: "application/pdf" }), name };
}

export function openMembershipMail(recipientList: readonly string[], fileName: string) {
  const subject = "SC Laufenburg – Aufnahmeantrag";
  const body = `Anbei mein Aufnahmeantrag.\n\nBitte die vorbereitete PDF-Datei „${fileName}“ als Anhang hinzufügen und den Versand in Ihrem E-Mail-Programm selbst bestätigen.`;
  window.location.href = `mailto:${recipientList.join(",")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function base64Lines(bytes: Uint8Array) {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 32768) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 32768));
  }
  return btoa(binary).match(/.{1,76}/g)?.join("\r\n") ?? "";
}

export async function createMembershipEml(file: File, recipientList: readonly string[]) {
  const boundary = `SC-${crypto.randomUUID()}`;
  const data = new Uint8Array(await file.arrayBuffer());
  const body = "Anbei mein Aufnahmeantrag.";
  return [
    `To: ${recipientList.join(", ")}`,
    "Subject: SC Laufenburg - Aufnahmeantrag",
    "X-Unsent: 1",
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    base64Lines(new TextEncoder().encode(body)),
    `--${boundary}`,
    `Content-Type: ${file.type}; name="${file.name}"`,
    `Content-Disposition: attachment; filename="${file.name}"`,
    "Content-Transfer-Encoding: base64",
    "",
    base64Lines(data),
    `--${boundary}--`,
    "",
  ].join("\r\n");
}
