import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const ContactSection = () => {
  const infoAnimation = useScrollAnimation();
  const formAnimation = useScrollAnimation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name ist erforderlich';
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }
    if (!formData.message.trim()) newErrors.message = 'Nachricht ist erforderlich';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
        const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
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
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                E-Mail
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="E-Mail"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Ihre Nachricht
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Ihre Nachricht"
                className="min-h-[120px]"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            
            {submitStatus === 'success' && (
              <p className="text-green-500 text-center animate-fadeInOut">
                Nachricht erfolgreich gesendet!
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-500 text-center">
                Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.
              </p>
            )}

            <Button 
              type="submit"
              className="w-full bg-club-accent hover:bg-club-accent/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;