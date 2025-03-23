import React from 'react';

const ContactOkSection = () => {
  return (
    <section className="contact-ok-section flex flex-col items-center justify-center py-16">
      <div className="message text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 mt-36 px-1 text-club-primary">
          Ihre E-Mail wurde erfolgreich abgesendet!
        </h2>
        <p className="text-lg px-4">
          Vielen Dank für Ihre Nachricht, Wir werden uns bald bei Ihnen melden.
        </p>
      </div>
      <div className="animation-container">
        <svg className="checkmark" viewBox="0 0 52 52">
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
          <path className="checkmark__check" fill="none" d="M14 27l7 7 16-16" />
        </svg>
      </div>
      <style>{`
        .checkmark {
          width: 100px;
          height: 100px;
          display: block;
          stroke: #4caf50;
          stroke-width: 2;
          stroke-miterlimit: 10;
          margin: 0 auto;
        }
        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .checkmark__check {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactOkSection;
