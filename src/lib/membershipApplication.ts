import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

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

const OFFICIAL_PDF_BASE64 =
  'JVBERi0xLjQKJcTl8uXrpOqD...';

function dateDE(v:string){return /^\d{4}-\d{2}-\d{2}$/.test(v)?`${v.slice(8,10)}.${v.slice(5,7)}.${v.slice(0,4)}`:v;}
export function isMinor(birth:string){if(!/^\d{4}-\d{2}-\d{2}$/.test(birth))return false;const now=new Date(),p=birth.split("-").map(Number);let age=now.getFullYear()-p[0];if(now.getMonth()+1<p[1]||(now.getMonth()+1===p[1]&&now.getDate()<p[2]))age--;return age<18;}
function drawText(page:any,font:any,value:unknown,x:number,y:number,maxWidth:number,size=10.5){const text=String(value??"").trim();if(!text)return;let s=size;while(s>6&&font.widthOfTextAtSize(text,s)>maxWidth)s-=.25;page.drawText(text,{x,y,size:s,font,color:rgb(.08,.08,.08)});}
function drawCheck(page:any,x:number,y:number){page.drawLine({start:{x,y},end:{x:x+6,y:y+6},thickness:1.2,color:rgb(.05,.05,.05)});page.drawLine({start:{x:x+6,y},end:{x,y:y+6},thickness:1.2,color:rgb(.05,.05,.05)});}
async function drawSignature(page:any,pdf:PDFDocument,source:string|undefined,x:number,y:number,width:number,height:number){if(!source)return;const comma=source.indexOf(","),base64=comma>=0?source.slice(comma+1):source,bytes=Uint8Array.from(atob(base64),c=>c.charCodeAt(0));const image=source.startsWith("data:image/jpeg")?await pdf.embedJpg(bytes):await pdf.embedPng(bytes);const scale=Math.min(width/image.width,height/image.height),w=image.width*scale,h=image.height*scale;page.drawImage(image,{x:x+(width-w)/2,y:y+(height-h)/2,width:w,height:h});}
async function createPdf(data:MembershipPdfData){const bytes=Uint8Array.from(atob(OFFICIAL_PDF_BASE64),c=>c.charCodeAt(0));const pdf=await PDFDocument.load(bytes),page=pdf.getPage(0),font=await pdf.embedFont(StandardFonts.Helvetica),postal=data.postal_city.match(/^(\d{5})\s+(.+)$/),zip=postal?.[1]??data.postal_city,city=postal?.[2]??"",date=dateDE(data.application_date);
drawText(page,font,data.first_name,148,557,150);drawText(page,font,data.last_name,389,557,168);drawText(page,font,zip,148,531,150);drawText(page,font,city,148,531,150);drawText(page,font,data.address,389,531,168);drawText(page,font,dateDE(data.birth_date),154,505,145);drawText(page,font,data.birth_place,389,505,168);drawText(page,font,data.phone,148,479,150);drawText(page,font,data.email,389,479,168);drawText(page,font,data.previous_club,410,428,145);
if(data.nationality==="Deutsch")drawCheck(page,185,453);else if(data.nationality==="EU-Angehöriger")drawCheck(page,249,453);else{drawCheck(page,347,453);drawText(page,font,data.nationality.replace(/^Sonstige:\s*/i,""),415,454,140);}if(data.gender==="männlich")drawCheck(page,185,427);else if(data.gender==="weiblich")drawCheck(page,249,427);if(data.membership_type==="Aktivmitglied")drawCheck(page,184,401);else if(data.membership_type==="Passivmitglied")drawCheck(page,298,401);drawCheck(page,73,374);drawText(page,font,`${data.application_place}, den ${date}`,148,347,300);
await drawSignature(page,pdf,data.signatures.representative,70,282,205,55);await drawSignature(page,pdf,data.signatures.applicant,330,282,220,55);if(data.direct_debit){drawText(page,font,data.bank_name,157,166,145);drawText(page,font,data.bic,389,166,168);drawText(page,font,data.iban.replace(/\s/g,"").replace(/(.{4})/g,"$1 ").trim(),155,137,395);drawText(page,font,data.account_holder||`${data.first_name} ${data.last_name}`,230,108,320);drawText(page,font,`${data.application_place}, ${date}`,145,50,210);await drawSignature(page,pdf,data.signatures.mandate,330,43,220,42);}
pdf.setTitle("Aufnahmeantrag Schachclub Laufenburg");pdf.setAuthor("Schachclub Laufenburg e.V.");pdf.setSubject("Ausgefüllter Aufnahmeantrag");pdf.setProducer("SC Laufenburg lokale Formularanwendung");return pdf.save();}
export async function createMembershipPdf(data:MembershipPdfData){const pdf=await createPdf(data);const random=typeof crypto!=="undefined"&&crypto.getRandomValues?(()=>{const values=new Uint32Array(2);crypto.getRandomValues(values);return `${values[0].toString(36)}-${values[1].toString(36)}`;})():`${Date.now().toString(36)}-${Math.floor(Math.random()*0xffffff).toString(36)}`;const name=`SC-Aufnahmeantrag-${random}.pdf`;return{file:new File([pdf],name,{type:"application/pdf"}),pdf};}
export const createEncryptedMembershipPdf=createMembershipPdf;
