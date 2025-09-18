import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link, useNavigate } from "react-router-dom";

const ContactSection = () => {
  const infoAnimation = useScrollAnimation();
  const formAnimation = useScrollAnimation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'Kontaktanfrage von Website'
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/formmail-80.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
      });

      if (response.ok) {
        navigate('/kontakt-ok');
      } else {
        setError('Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.');
      }
    } catch (err) {
      setError('Ein Verbindungsfehler ist aufgetreten. Bitte überprüfen Sie Ihre Internetverbindung.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-16 container mx-auto px-4 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-12 text-club-primary">
        Kontakt
      </h2>
      <div className="flex flex-col items-center">
        <Card 
          ref={infoAnimation.elementRef}
          className={`p-6 opacity-0 w-full max-w-2xl mb-8 ${infoAnimation.isVisible ? 'animate-slideInLeft' : ''}`}
        >
          <h3 className="text-xl font-semibold mb-6">Kontaktinformationen</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-club-accent" size={20} />
              <Link
                to="mailto:info@sc-laufenburg.de"
                className="hover:text-club-accent underline"
              >
                info@sc-laufenburg.de
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-club-accent" size={20} />
              <span>Bertastraße 6, 79725 Laufenburg</span>
            </div>
          </div>
        </Card>
        <Card 
          ref={formAnimation.elementRef}
          className={`p-6 opacity-0 w-full max-w-2xl ${formAnimation.isVisible ? 'animate-slideInRight' : ''}`}
        >
          <h3 className="text-xl font-semibold mb-6">Schreiben Sie uns</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className='text-sm/5 font-medium pb-1'>Name</p>
              <Input 
                name="name"
                placeholder="Ihr Name" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p className='text-sm/5 font-medium pb-1'>E-Mail</p>
              <Input 
                type="email"
                name="email"
                placeholder="Ihre E-Mailadresse" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p className='text-sm/5 font-medium pb-1'>Betreff</p>
              <Input 
                name="subject"
                placeholder="Betreff" 
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div>
             <p className='text-sm/5 font-medium pb-1'>Ihre Nachricht</p> 
              <Textarea 
                name="message"
                placeholder="Ihre Nachricht" 
                className="min-h-[120px]"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button 
              type="submit"
              className="w-full bg-club-accent hover:bg-club-accent/90"
              disabled={submitting}
            >
              {submitting ? 'Wird gesendet...' : 'Nachricht senden'}
            </Button>
          </form>
          <p className="text-sm mt-4 text-center">
            Mit dem Absenden akzeptieren Sie unsere{' '}
            <Link to="/datenschutz" className="underline hover:text-club-accent">
              Datenschutzerklärung
            </Link>
          </p>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;