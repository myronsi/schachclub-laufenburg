import React, { useRef, useState, useEffect } from 'react';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ScrollButton } from '@/components/ui/scroll-button';
import { transformHistoryData } from '@/utils/historyTransformer';

interface TimelineEvent {
  date: string;
  text: string;
}

interface TimelineGroup {
  year: string;
  events: TimelineEvent[];
}

const ChronikComponent: React.FC = () => {
  const timelineAnimation = useScrollAnimation({ threshold: 0.01, rootMargin: '100px' });
  const historySectionRef = useRef<HTMLDivElement>(null);
  const timelineEndRef = useRef<HTMLDivElement>(null);
  const [timeline, setTimeline] = useState<TimelineGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://sc-laufenburg.de/api/history.php');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const transformedData = transformHistoryData(data);
        setTimeline(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const scrollToTimelineEnd = () => {
    timelineEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const scrollToHistoryStart = () => {
    historySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="chronik" className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-club-primary mb-12 text-center">
          Unsere Geschichte
        </h2>
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Lade Geschichte...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-4 mb-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800 text-sm">
              Es ist ein Fehler beim Laden der Artikel aufgetreten. Bitte versuche es später erneut.
            </p>
          </div>
        )}
        <div
          ref={timelineAnimation.elementRef}
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-y-4 md:gap-y-0 mb-4 md:mb-6 px-2 md:px-0">
            <div
              ref={historySectionRef}
              className="flex items-center gap-3"
            >
               <div className='ml-12 gap-3 flex items-center'>
                <ScrollButton
                    onClick={scrollToTimelineEnd}
                    icon={<ArrowBigDown className="w-5 h-5" />}
                    className="md:-mt-1"
                />
                <span
                    className="text-dark font-medium bg-[#F3F4F6] py-6 hover:underline hover:text-club-accent hover:cursor-pointer"
                    onClick={scrollToTimelineEnd}
                >
                    zur Gründung
                </span>
              </div>
            </div>

            <a
              href="/docs/geschichte.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-club-accent text-white px-4 py-2 rounded hover:bg-club-dark transition-colors whitespace-nowrap inline-flex items-center justify-center w-full md:w-auto mt-2 md:mt-0"
            >
              Vollständige Geschichte (PDF)
            </a>
          </div>

          <div className="relative ml-4 md:ml-12 max-w-[calc(100%-2rem)] md:max-w-[calc(100%-3rem)]">
            <div
              className="absolute left-[15px] md:left-[19px] top-4 bottom-0 w-[2px] bg-club-accent"
              style={{ height: 'calc(100% - 1rem)' }}
            />

            <div className="space-y-6 md:space-y-8 relative pl-4 md:pl-8">
              {timeline.map((group, groupIndex) => (
                <div
                  key={group.year}
                  className={`relative transform transition-all duration-500 ease-out ${
                    timelineAnimation.isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-6'
                  }`}
                  style={{ transitionDelay: `${groupIndex * 0.15}s` }}
                >
                  <div className="absolute -left-[32px] md:-left-[42px] top-0 flex items-center gap-2 mb-4">
                    <div className={`w-3 h-3 md:w-4 md:h-4 bg-club-accent rounded-full transform translate-x-[7px] md:translate-x-[9px] z-10 transition-all duration-300 ${
                      timelineAnimation.isVisible ? 'scale-100' : 'scale-0'
                    }`} />
                    <h4 className="text-lg md:text-xl font-semibold text-club-primary bg-[#F3F4F6] pr-2 ml-1">
                      {group.year}
                    </h4>
                  </div>

                  <div className="pt-10 md:pt-12 pl-2 md:pl-4 space-y-3 md:space-y-4">
                    {group.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`flex gap-2 md:gap-3 transform transition-all duration-500 ease-out ${
                          timelineAnimation.isVisible
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 -translate-x-6'
                        }`}
                        style={{ transitionDelay: `${groupIndex * 0.15 + eventIndex * 0.1}s` }}
                      >
                        {event.date && (
                          <div className="w-16 md:w-20 shrink-0 text-xs md:text-sm text-club-accent font-medium">
                            {event.date}
                          </div>
                        )}
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base break-words hyphens-auto">
                          {event.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div
              ref={timelineEndRef}
              className="relative flex items-center gap-2 mt-6 hover:cursor-pointer"
              onClick={scrollToHistoryStart}
              style={{
                left: '10px',
                marginLeft: '4px',
                width: 'calc(100% - 19px)'
              }}
            >
              <span className="text-dark font-medium bg-[#F3F4F6] py-6 hover:underline hover:text-club-accent">
                zum aktuellsten Eintrag
              </span>
              <ScrollButton
                icon={<ArrowBigUp className="w-5 h-5" />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChronikComponent;