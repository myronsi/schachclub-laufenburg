import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ContactSection = () => {
  const infoAnimation = useScrollAnimation();
  const formAnimation = useScrollAnimation();

  return (
    <section id="contact" className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-club-primary">
        Kontakt
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <Card 
          ref={infoAnimation.elementRef}
          className={`p-6 opacity-0 ${infoAnimation.isVisible ? 'animate-slideInLeft' : ''}`}
        >
          <h3 className="text-xl font-semibold mb-6">Kontaktinformationen</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-club-accent" size={20} />
              <span>info@sc-laufenburg.de</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-club-accent" size={20} />
              <span>+49 000 000000</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-club-accent" size={20} />
              <span>Bertastraße 6, 79725 Laufenburg</span>
            </div>
          </div>
        </Card>

        <Card 
          ref={formAnimation.elementRef}
          className={`p-6 opacity-0 ${formAnimation.isVisible ? 'animate-slideInRight' : ''}`}
        >
          <h3 className="text-xl font-semibold mb-6">Schreiben Sie uns</h3>
          <form className="space-y-4">
            <div>
              <Input placeholder="Name" />
            </div>
            <div>
              <Input type="email" placeholder="E-Mail" />
            </div>
            <div>
              <Textarea placeholder="Ihre Nachricht" className="min-h-[120px]" />
            </div>
            <Button className="w-full bg-club-accent hover:bg-club-accent/90">
              Nachricht senden
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;