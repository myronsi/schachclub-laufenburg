import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FileText, Mail, UserRound } from "lucide-react";

const steps = [
  { number: "1", title: "Kontakt", text: "Schreib uns und sag uns, was du suchst.", icon: Mail },
  { number: "2", title: "Probetag", text: "Kostenlos vorbeikommen, spielen und den Verein kennenlernen.", icon: UserRound },
  { number: "3", title: "Antrag", text: "Antrag ausfüllen, unterschreiben und selbst per E-Mail versenden.", icon: FileText },
];

export function MembershipApplicationSteps() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const section = document.getElementById("mitgliedwerden");
    const container = section?.firstElementChild as HTMLElement | null;
    const header = container?.firstElementChild as HTMLElement | null;
    if (!container || !header) return;

    const originalDisplay = container.style.display;
    const originalFlexDirection = container.style.flexDirection;
    const originalOrders = Array.from(container.children).map((child) => ({
      child: child as HTMLElement,
      order: (child as HTMLElement).style.order,
    }));

    container.style.display = "flex";
    container.style.flexDirection = "column";
    const children = Array.from(container.children) as HTMLElement[];
    children.forEach((child, index) => { child.style.order = String(index + 1); });

    // Header, steps, information cards, CTA cards, application form, contact.
    if (children[1]) children[1].style.order = "4";
    if (children[2]) children[2].style.order = "3";
    if (children[3]) children[3].style.order = "5";
    if (children[4]) children[4].style.order = "6";

    const slot = document.createElement("div");
    slot.setAttribute("data-membership-steps-slot", "true");
    slot.style.order = "2";
    header.insertAdjacentElement("afterend", slot);
    setTarget(slot);

    return () => {
      setTarget(null);
      slot.remove();
      container.style.display = originalDisplay;
      container.style.flexDirection = originalFlexDirection;
      originalOrders.forEach(({ child, order }) => { child.style.order = order; });
    };
  }, []);

  if (!target) return null;

  return createPortal(
    <div className="mx-auto mb-10 w-full max-w-5xl rounded-lg border bg-white p-5 shadow-sm md:p-6">
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-club-accent">Dein Weg in den Verein</p>
        <h3 className="mt-1 text-xl font-bold text-club-primary">Einfach Schritt für Schritt</h3>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map(({ number, title, text, icon: Icon }) => (
          <div key={number} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-club-accent text-sm font-bold text-white">{number}</span>
            <div className="min-w-0 text-left">
              <Icon className="hidden md:mt-3 md:block md:h-5 md:w-5 md:text-club-accent" />
              <h4 className="font-semibold text-gray-900 md:mt-2">{title}</h4>
              <p className="mt-1 text-sm text-gray-600">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>,
    target,
  );
}

export default MembershipApplicationSteps;
