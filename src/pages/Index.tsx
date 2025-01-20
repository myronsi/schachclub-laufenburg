import Header from "@/components/Header";
import NewsSlider from "@/components/NewsSlider";
import TeamSection from "@/components/TeamSection";
import TournamentSection from "@/components/TournamentSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section id="home">
          <NewsSlider />
        </section>
        <TeamSection />
        <TournamentSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;