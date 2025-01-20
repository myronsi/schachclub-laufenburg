import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-club-primary">
        Kontakt
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Kontaktinformationen</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-club-accent" size={20} />
              <span>info@sportverein.de</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-club-accent" size={20} />
              <span>+49 123 456789</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-club-accent" size={20} />
              <span>Sportplatz 1, 12345 Sportstadt</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
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