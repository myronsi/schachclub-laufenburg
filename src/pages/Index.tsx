import Header from "@/components/Header";
import NewsSlider from "@/components/NewsSlider";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import YouthSection from "@/components/YouthSection";
import TournamentSection from "@/components/TournamentSection";
import MediaSection from "@/components/MediaSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section id="home">
          <NewsSlider />
        </section>
        <AboutSection />
        <TeamSection />
        <YouthSection />
        <TournamentSection />
        <MediaSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;