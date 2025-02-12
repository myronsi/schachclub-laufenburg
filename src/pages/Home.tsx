
import NewsSlider from "@/components/NewsSlider";

const Home = () => {
  return (
    <div className="min-h-screen">
      <main>
        <section id="home">
          <NewsSlider />
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-club-primary mb-4">
                Willkommen beim Schachclub Laufenburg e.V.
              </h1>
              <h2 className="text-xl text-club-primary mb-6">
                in der Saison 2024 / 25
              </h2>
              
              <div className="space-y-6">
                <div>
                  <p className="font-semibold mb-2">22.11.24:</p>
                  <p>
                    Wir sollten mal wieder Turniere spielen,<br />
                    siehe auch Turnierausschreibungen 2022 / 23
                  </p>
                </div>
                
                <div>
                  <p className="font-semibold">2025 wird "anders" ...</p>
                  <p>Wiederaufnahme des Spielbetriebs Di., 07.01.25</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
