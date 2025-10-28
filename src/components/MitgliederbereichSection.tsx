import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";


const MitgliederbereichSection = () => {
  const venueAnim = useScrollAnimation();
  const boardAnim = useScrollAnimation();
  const feesAnim = useScrollAnimation();
  return (
    <section id="mitgliederbereich" className="py-16 animate-fadeIn">
        <div className="container mx-auto px-4">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-club-primary">Mitgliederbereich</h1>
                <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                Der exklusive Bereich für Vereinsmitglieder: Hier findest du Protokolle, interne Termine, die geschützte Galerie und Funktionen zur Turnieranmeldung.
                </p>
            </header>

            <div className="max-w-3xl mx-auto bg-white border rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-3">Vorteile eines Accounts</h2>
                <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>Zugriff auf geschützte Galerien und Vereinsfotos</li>
                    {/* <li>Persönliche Benachrichtigungen zu Terminen</li> */}
                </ul>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-sm text-gray-500">Bereits Mitglied? Melde dich an, um auf den Mitgliederbereich zuzugreifen.</p>
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="inline-flex px-4 py-2 bg-club-accent text-white rounded hover:bg-club-dark whitespace-nowrap">Zum Login</Link>
                    </div>
                </div>
                <h2 className="text-xl font-semibold mb-3 mt-6">Für Mitglieder des Schachclubs</h2>
                <p className="text-gray-700">
                  Falls du bereits Mitglied in unserem Schachclub bist, aber noch keinen Account besitzt, schreibe uns einfach über die Kontaktseite. Wir legen deinen Account schnell für dich an.
                </p>

                <div className="mt-6 flex items-center gap-3">
                    <Link to="/kontakt" className="inline-flex px-4 py-2 border border-gray-200 rounded hover:bg-gray-50">Kontakt</Link>
                </div>
            </div>
        </div>
    </section>
  );
};

export default MitgliederbereichSection;
