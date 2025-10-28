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
    subject: ''
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
    <section id="contact" className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h2 className="text-3xl font-bold text-club-primary">Kontakt</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Wir freuen uns auf Ihre Nachricht — ob Frage, Anregung oder Hinweis. Nutzen Sie dafür einfach das Formular. Wir melden uns in der Regel innerhalb von zwei Werktagen.
            </p>
        </header>

        <div className="grid grid-cols-1 gap-8 items-start">

          <Card
            ref={formAnimation.elementRef}
            className={`p-6 opacity-0 max-w-2xl mx-auto w-full ${formAnimation.isVisible ? 'animate-fadeIn' : ''}`}
          >
            <h3 className="text-xl font-semibold mb-4">Schreiben Sie uns</h3>
            <p className="text-sm text-gray-600 mb-4">Bitte füllen Sie das Formular aus. Pflichtfelder sind mit einem Stern gekennzeichnet.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className='text-sm/5 font-medium pb-1'>Name <span className="text-red-500">*</span></p>
                <Input
                  name="name"
                  placeholder="Ihr Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <p className='text-sm/5 font-medium pb-1'>E-Mail <span className="text-red-500">*</span></p>
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
                <p className='text-sm/5 font-medium pb-1'>Betreff <span className="text-red-500">*</span></p>
                <Input
                  name="subject"
                  placeholder="Ihr Betreff"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
               <p className='text-sm/5 font-medium pb-1'>Ihre Nachricht <span className="text-red-500">*</span></p>
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
      </div>
    </section>
  );
};

export default ContactSection;