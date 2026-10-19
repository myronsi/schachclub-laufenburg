import MitgliedwerdenSection from "@/components/Mitgliedwerden";

const Mitgliedwerden = () => {
  return (
    <div>
      <main>
        <section className="container mx-auto px-4 pt-8 pb-2">
          <div className="mx-auto max-w-4xl rounded-xl border border-club-accent/30 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-club-accent">Direkt Mitglied werden</p>
                <h1 className="mt-1 text-2xl font-bold text-club-primary md:text-3xl">Mitgliedsantrag komplett online ausfüllen</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                  Du kannst den vollständigen Aufnahmeantrag digital ausfüllen, direkt online unterschreiben und an den Vorstand übermitteln. Du musst dafür nicht erst das PDF ausdrucken.
                </p>
              </div>
              <a
                href="#digital-antrag"
                className="inline-flex shrink-0 items-center justify-center rounded-md bg-club-accent px-5 py-3 font-medium text-white transition hover:bg-club-dark"
              >
                Online-Mitgliedsantrag
              </a>
            </div>
          </div>
        </section>
        <MitgliedwerdenSection />
      </main>
    </div>
  );
};

export default Mitgliedwerden;
