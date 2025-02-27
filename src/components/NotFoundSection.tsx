import { useRef, useEffect } from 'react';
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const NotFoundSection = () => {
  const animation = useScrollAnimation();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement && animation.isVisible) {
      svgElement.classList.add('animate-paper');
    }
  }, [animation.isVisible]);

  return (
    <main className="grid min-h-screen place-items-center px-4 py-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 md:flex-row md:justify-between md:gap-12">
        <div className="w-full max-w-[200px] md:max-w-[300px]">
          <svg
            ref={svgRef}
            className="paper"
            viewBox="0 0 300 300"
            role="img"
            aria-label="A piece of paper torn in half"
          >
            <style>{`
              @keyframes paperTop {
                from, 40% {
                  animation-timing-function: cubic-bezier(0.32,0,0.67,0);
                  transform: translate(0,25px) rotate(0);
                  transform-origin: 61px 148px;
                }
                70% {
                  animation-timing-function: cubic-bezier(0.33,1,0.67,1.5);
                  transform: translate(0,25px) rotate(-5deg);
                  transform-origin: 61px 148px;
                }
                to {
                  transform: translate(0,8px) rotate(0);
                  transform-origin: 0 148px;
                }
              }
              @keyframes paperBottom {
                from, 40% {
                  animation-timing-function: cubic-bezier(0.32,0,0.67,0);
                  transform: translate(0,25px) rotate(0);
                  transform-origin: 61px 148px;
                }
                70% {
                  animation-timing-function: cubic-bezier(0.33,1,0.67,1.5);
                  transform: translate(0,25px) rotate(5deg);
                  transform-origin: 61px 148px;
                }
                to {
                  transform: translate(0,42px) rotate(0);
                  transform-origin: 0 148px;
                }
              }
              @keyframes paperTear {
                from, 40% { stroke-dashoffset: -198; }
                70%, to { stroke-dashoffset: 0; }
              }
              @keyframes paperTearFill {
                from, 40% { width: 187px; }
                70%, to { width: 0; }
              }
              .paper__top { 
                animation: paperTop 1.25s cubic-bezier(0.77,0,0.18,1) forwards;
              }
              .paper__bottom { 
                animation: paperBottom 1.25s cubic-bezier(0.77,0,0.18,1) forwards;
              }
              .paper__tear { 
                animation: paperTear 1.25s cubic-bezier(0.32,0,0.67,0) forwards;
              }
              .paper__tear-fill { 
                animation: paperTearFill 1.25s cubic-bezier(0.32,0,0.67,0) forwards;
              }
            `}</style>
            
            <g className="paper__outline" fill="none" stroke="hsl(0,10%,10%)" 
               strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" 
               transform="translate(61,4)">
              <g className="paper__top" transform="translate(0,25)">
                <polygon className="paper__shadow" fill="hsl(0,10%,70%)" stroke="none" 
                         points="0 148,0 0,137 0,187 50,187 148,155 138,124 148,93 138,62 148,31 138"
                         transform="translate(-12,12)" />
                <rect className="paper__tear-fill" fill="hsl(0,0%,100%)" stroke="none" 
                      x="0" y="137" width="0" height="23" />
                <polygon className="paper__fill" fill="hsl(0,0%,100%)" stroke="none" 
                         points="0 148,0 0,137 0,187 50,187 148,155 138,124 148,93 138,62 148,31 138" />
                <polygon className="paper__shadow" fill="hsl(0,10%,70%)" stroke="none" 
                         points="137 0,132 55,187 50,142 45" />
                <polyline points="137 0,142 45,187 50" />
                <polyline points="0 148,0 0,137 0,187 50,187 148" />
                <g className="paper__lines" stroke="hsl(0,10%,70%)">
                  <polyline points="22 88,165 88" />
                  <polyline points="22 110,165 110" />
                  <polyline points="22 132,165 132" />
                </g>
                <polyline className="paper__tear" 
                          points="0 148,31 138,62 148,93 138,124 148,155 138,187 148" 
                          strokeDasharray="198 198" strokeDashoffset="-198" />
              </g>
              <g className="paper__bottom" transform="translate(0,25)">
                <polygon className="paper__shadow" fill="hsl(0,10%,70%)" stroke="none" 
                         points="0 148,31 138,62 148,93 138,124 148,155 138,187 148,187 242,0 242" 
                         transform="translate(-12,12)" />
                <polygon className="paper__fill" fill="hsl(0,0%,100%)" stroke="none" 
                         points="0 148,31 140,62 148,93 138,124 148,155 138,187 148,187 242,0 242" />
                <polyline points="187 148,187 242,0 242,0 148" />
                <g className="paper__lines" stroke="hsl(0,10%,70%)">
                  <polyline points="22 154,165 154" />
                  <polyline points="22 176,165 176" />
                  <polyline points="22 198,94 198" />
                </g>
                <polyline className="paper__tear" 
                          points="0 148,31 138,62 148,93 138,124 148,155 138,187 148" 
                          strokeDasharray="198 198" strokeDashoffset="-198" />
              </g>
            </g>
          </svg>
        </div>

        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 md:mb-6">404</h1>
          <p className="mb-6 md:mb-8 text-base md:text-lg text-gray-600 dark:text-gray-300">
            Wir konnten die gesuchte Seite nicht finden.<br className="hidden md:block" /> 
            Es wurde möglicherweise verschoben oder existiert einfach nicht.
          </p>
          <a 
            href="/" 
            className="inline-block bg-club-accent text-white px-6 py-3 md:px-8 md:py-4 
                      rounded-full hover:underline transition-colors duration-150 
                      text-base md:text-lg"
          >
            Zurück zur Hauptseite
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFoundSection;