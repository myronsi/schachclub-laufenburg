import MitgliedwerdenSection from "@/components/Mitgliedwerden";

const Mitgliedwerden = () => {
  return (
    <main>
      <style>{`
        #mitgliedwerden > div {
          display: flex;
          flex-direction: column;
        }

        #mitgliedwerden > div > header { order: 0; }
        #mitgliedwerden > div > div:nth-of-type(2) { order: 1; }
        #mitgliedwerden > div > div:nth-of-type(3) { order: 2; }
        #mitgliedwerden > div > div:nth-of-type(1) { order: 3; }
        #mitgliedwerden > div > div:nth-of-type(4) { order: 4; }
        #mitgliedwerden > div > div:nth-of-type(5) { order: 5; }

        #mitgliedwerden > div > div:nth-of-type(1) {
          margin-bottom: 2.5rem;
          max-width: 56rem;
          width: 100%;
        }

        #mitgliedwerden > div > div:nth-of-type(1) > a {
          padding: 1rem;
          min-height: 0;
        }

        #mitgliedwerden > div > div:nth-of-type(1) > a > div:first-child {
          width: 2rem;
          height: 2rem;
          margin-bottom: 0.5rem;
        }

        #mitgliedwerden > div > div:nth-of-type(1) > a h3 {
          font-size: 1rem;
          line-height: 1.5rem;
        }

        #mitgliedwerden > div > div:nth-of-type(1) > a p:not(.text-xs) {
          margin-top: 0.25rem;
          font-size: 0.8125rem;
          line-height: 1.25rem;
        }

        #mitgliedwerden > div > div:nth-of-type(1) > a span {
          margin-top: 0.5rem;
          font-size: 0.8125rem;
        }

        /* Keep the action cards in the same neutral visual language as the rest of the site. */
        #mitgliedwerden > div > div:nth-of-type(1) > a:first-child {
          background: white;
          color: inherit;
          border-color: rgb(229 231 235);
        }

        #mitgliedwerden > div > div:nth-of-type(1) > a:first-child p,
        #mitgliedwerden > div > div:nth-of-type(1) > a:first-child h3,
        #mitgliedwerden > div > div:nth-of-type(1) > a:first-child span {
          color: inherit;
        }

        #mitgliedwerden > div > div:nth-of-type(1) > a:first-child p:first-of-type {
          color: rgb(107 114 128);
        }

        #mitgliedwerden > div > div:nth-of-type(1) > a:first-child p:not(.text-xs) {
          color: rgb(75 85 99);
        }

        #mitgliedwerden > div > div:nth-of-type(1) > a:first-child > div:first-child {
          background: rgb(245 245 245);
          color: var(--club-accent, inherit);
        }

        /* The digital application is a normal section, not a collapsed/blue widget. */
        #digital-antrag details {
          background: white;
        }

        #digital-antrag details > summary {
          background: white !important;
          color: inherit !important;
          cursor: default;
        }

        #digital-antrag details > summary > svg {
          display: none;
        }

        #digital-antrag details:not([open]) > :not(summary) {
          display: block !important;
        }

        /* Center the step numbers vertically beside their text on desktop. */
        #mitgliedwerden > div > div:nth-of-type(3) > div:last-child > div {
          display: flex;
          align-items: center;
          text-align: left;
        }

        #mitgliedwerden > div > div:nth-of-type(3) > div:last-child > div > span {
          margin-top: 0;
        }

        @media (max-width: 767px) {
          #mitgliedwerden > div > div:nth-of-type(3) > div:last-child > div {
            align-items: flex-start;
          }
        }

        @media (min-width: 768px) {
          #mitgliedwerden > div > div:nth-of-type(1) > a {
            padding: 1.25rem;
          }
        }
      `}</style>
      <MitgliedwerdenSection />
    </main>
  );
};

export default Mitgliedwerden;
