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
