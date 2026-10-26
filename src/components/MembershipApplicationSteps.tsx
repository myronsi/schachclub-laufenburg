import { FileText, Mail, UserRound } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Kontakt",
    text: "Schreib uns und sag uns, was du suchst.",
    icon: Mail,
  },
  {
    number: "2",
    title: "Probetag",
    text: "Kostenlos vorbeikommen, spielen und den Verein kennenlernen.",
    icon: UserRound,
  },
  {
    number: "3",
    title: "Antrag",
    text: "Antrag ausfüllen, unterschreiben und selbst per E-Mail versenden.",
    icon: FileText,
  },
];

export function MembershipApplicationSteps() {
  return (
    <div className="mx-auto mb-10 max-w-5xl rounded-lg border bg-white p-5 shadow-sm md:p-6">
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-club-accent">
          Dein Weg in den Verein
        </p>
        <h3 className="mt-1 text-xl font-bold text-club-primary">
          Einfach Schritt für Schritt
        </h3>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map(({ number, title, text, icon: Icon }) => (
          <div key={number} className="flex gap-3 md:block md:text-center">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-club-accent text-sm font-bold text-white">
              {number}
            </span>
            <div>
              <Icon className="hidden md:mx-auto md:mt-3 md:block md:h-5 md:w-5 md:text-club-accent" />
              <h4 className="font-semibold text-gray-900 md:mt-2">{title}</h4>
              <p className="mt-1 text-sm text-gray-600">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
