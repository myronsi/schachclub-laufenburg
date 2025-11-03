import { useState, useMemo, useEffect } from "react";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { CalendarEvent } from "@/types/calendarTypes";
const REMOTE_CALENDAR_URL = "https://sc-laufenburg.de/api/events.php?action=list";

function isCalendarEvent(obj: any): obj is CalendarEvent {
  return obj && typeof obj.title === 'string' && typeof obj.date === 'string' && ['tournament','meeting','training','special','holiday'].includes(obj.type);
}
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CalendarSection = () => {
  const introAnim = useScrollAnimation();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1; // JavaScript months are 0-indexed
        
        const url = `https://sc-laufenburg.de/api/events.php?action=month&year=${year}&month=${month}`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        // events.php returns { events: [...] }
        const eventsArray = data.events || [];
        if (!Array.isArray(eventsArray)) throw new Error('Invalid JSON structure');
        
        // Transform time format from hh:mm:ss to hh:mm
        const transformedEvents = eventsArray.map((event: any) => ({
          ...event,
          time: event.time && typeof event.time === 'string' 
            ? event.time.substring(0, 5) // Extract only hh:mm from hh:mm:ss
            : event.time
        }));
        
        const validated = transformedEvents.filter(isCalendarEvent);
        if (!cancelled) setCalendarEvents(validated);
      } catch (err: any) {
        if (!cancelled) {
          setFetchError(String(err?.message || err));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [currentMonth]);

  const filteredEvents = useMemo(
    () => (selectedType === "all" ? calendarEvents : calendarEvents.filter(e => e.type === selectedType)),
    [selectedType, calendarEvents]
  );

  const toKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    for (const ev of filteredEvents) {
      const key = ev.date.slice(0, 10);
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    }
    return map;
  }, [filteredEvents]);

  const startOfCalendar = useMemo(() => {
    const first = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const day = first.getDay(); 
    const shift = (day + 6) % 7;
    const start = new Date(first);
    start.setDate(first.getDate() - shift);
    start.setHours(0,0,0,0);
    return start;
  }, [currentMonth]);

  const monthMatrix = useMemo(() => {
    const dates: Date[] = [];
    const start = startOfCalendar;
    for (let i = 0; i < 6 * 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      dates.push(d);
    }

    // If the final (6th) week contains no days from the current month,
    // drop that week so the calendar shows 5 rows instead of an all-next-month row.
    const lastWeek = dates.slice(5 * 7, 6 * 7);
    const hasCurrentMonthInLastWeek = lastWeek.some(d => d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear());
    if (!hasCurrentMonthInLastWeek) return dates.slice(0, 5 * 7);

    return dates;
  }, [startOfCalendar, currentMonth]);

  const prevMonth = () => setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  const goToToday = () => {
    const t = new Date();
    setCurrentMonth(new Date(t.getFullYear(), t.getMonth(), 1));
    setSelectedDate(toKey(t));
  };

  const formatHeader = (d: Date) => d.toLocaleString('de-DE', { month: 'long', year: 'numeric' });
  const formatWeekday = (index: number) => {
    const base = new Date(2021, 0, 4 + index); // Monday 4 Jan 2021
    return base.toLocaleDateString('de-DE', { weekday: 'short' });
  };

  const isSameMonth = (d: Date) => d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();

  const eventsForSelected = useMemo(() => {
    return selectedDate ? (eventsByDate[selectedDate] || []) : [];
  }, [selectedDate, eventsByDate]);

  const todayKey = toKey(new Date());

  const dialogSizeClass = useMemo(() => {
    const events = eventsForSelected;
    const totalChars = events.reduce((acc, e) => acc + (e.title?.length || 0) + (e.description?.length || 0) + (e.location?.length || 0) + (e.time?.length || 0), 0);
    if (events.length === 0) return 'max-w-md w-full h-auto';
    if (events.length <= 2 && totalChars < 300) return 'max-w-lg w-full h-auto';
    if (events.length <= 5) return 'max-w-2xl max-h-[70vh] overflow-y-auto';
    return 'max-w-4xl h-[90vh] overflow-y-auto';
  }, [eventsForSelected]);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'tournament':
        return 'bg-red-100 text-red-800';
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'training':
        return 'bg-green-100 text-green-800';
      case 'special':
        return 'bg-purple-100 text-purple-800';
      case 'holiday':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeColorForDots = (type: string) => {
    switch (type) {
      case 'tournament':
        return 'bg-red-600';
      case 'meeting':
        return 'bg-blue-600';
      case 'training':
        return 'bg-green-600';
      case 'special':
        return 'bg-purple-600';
      case 'holiday':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  }

  const getEventTypeColorForToday = (type: string) => {
    switch (type) {
      case 'tournament':
        return 'bg-red-600 text-white';
      case 'meeting':
        return 'bg-blue-600 text-white';
      case 'training':
        return 'bg-green-600 text-white';
      case 'special':
        return 'bg-purple-600 text-white';
      case 'holiday':
        return 'bg-yellow-500 text-gray-900';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'tournament':
        return 'Turnier';
      case 'meeting':
        return 'Versammlung';
      case 'training':
        return 'Training';
      case 'special':
        return 'Besondere';
      case 'holiday':
        return 'Ferien';
      default:
        return type;
    }
  };

  return (
    <section id="calendar" className="py-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-3 py-1 rounded-full text-sm ${selectedType === 'all' ? 'bg-amber-600 text-white' : 'bg-white border border-gray-200'}`}>
              Alle
            </button>
            <button onClick={() => setSelectedType('tournament')} className={`px-3 py-1 rounded-full text-sm ${selectedType === 'tournament' ? 'bg-red-600 text-white' : 'bg-white border border-gray-200'}`}>Turniere</button>
            <button onClick={() => setSelectedType('training')} className={`px-3 py-1 rounded-full text-sm ${selectedType === 'training' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200'}`}>Training</button>
            <button onClick={() => setSelectedType('holiday')} className={`px-3 py-1 rounded-full text-sm ${selectedType === 'holiday' ? 'bg-yellow-600 text-white' : 'bg-white border border-gray-200'}`}>Ferien</button>
            <button onClick={() => setSelectedType('meeting')} className={`px-3 py-1 rounded-full text-sm ${selectedType === 'meeting' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'}`}>Versammlungen</button>
            <button onClick={() => setSelectedType('special')} className={`px-3 py-1 rounded-full text-sm ${selectedType === 'special' ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200'}`}>Besondere</button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold">{formatHeader(currentMonth)}</div>
            <button onClick={prevMonth} className="p-2 pr-0 rounded hover:bg-gray-100" aria-label="Vorheriger Monat"><ChevronLeft className="w-5 h-5"/></button>
            <button onClick={nextMonth} className="p-2 pl-0 rounded hover:bg-gray-100" aria-label="Nächster Monat"><ChevronRight className="w-5 h-5"/></button>
            <button onClick={goToToday} className="ml-3 px-3 py-1 rounded text-sm bg-amber-600 text-white hover:bg-amber-700" aria-label="Heute">Heute</button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-7 gap-1 bg-white rounded-md overflow-hidden border shadow-xl p-2">
            {/* Weekday headers skeleton */}
            {Array.from({length:7}).map((_, i) => (
              <Skeleton key={`header-${i}`} className="h-8 rounded-md" />
            ))}
            {/* Calendar cells skeleton */}
            {Array.from({length:35}).map((_, i) => (
              <Skeleton key={`cell-${i}`} className="h-28 rounded-sm" />
            ))}
          </div>
        ) : fetchError ? (
          <div className="text-center py-12 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-600 font-semibold mb-2">Fehler beim Laden des Kalenders</div>
            <p className="text-sm text-red-500 mb-4">{fetchError}</p>
            <button 
              onClick={() => {
                setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1));
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Erneut versuchen
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-1 bg-white rounded-md overflow-hidden border shadow-xl p-2">
          {Array.from({length:7}).map((_, i) => (
            <div key={i} className="text-center text-xs font-medium py-2 bg-gray-100 border-b border-gray-100 rounded-md">
              {formatWeekday(i)}
            </div>
          ))}

          {monthMatrix.map((d, idx) => {
            const key = toKey(d);
            const evs = eventsByDate[key] || [];
            const isSelected = selectedDate === key;
            const isToday = toKey(d) === todayKey;
            const cellClass = isSelected
              ? 'bg-sky-100 ring-2 ring-sky-200 border-sky-200 shadow'
              : isToday
              ? 'bg-amber-50 ring-2 ring-amber-300 border-amber-200 shadow-md'
              : isSameMonth(d)
              ? 'hover:bg-sky-50'
              : 'bg-gray-50 text-gray-400 hover:bg-sky-50';

            return (
              <button
                key={idx}
                onClick={() => { setSelectedDate(key); setDialogOpen(true); }}
                aria-pressed={isSelected}
                  className={`group p-3 h-28 text-left flex flex-col justify-between rounded-sm focus:outline-none transition-colors duration-150 border border-gray-200 bg-white ${cellClass}`}
              >
                <div className="flex items-start justify-between">
                    <div className={`flex items-center gap-2`}> 
                      <div className={`text-sm ${isToday ? 'text-amber-800 font-bold' : 'font-semibold'} ${isSameMonth(d) ? 'text-sky-900' : 'text-gray-400'}`}>{d.getDate()}</div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile: compact dots */}
                  <div className="flex items-center gap-1 md:hidden">
                    {evs.slice(0,3).map((ev, i) => (
                      <span
                        key={`${key}-${i}`}
                        title={ev.title}
                        className={`${getEventTypeColorForDots(ev.type)} w-3 h-3 rounded-md inline-block border ${isToday ? 'ring-2 ring-white/60' : ''}`}
                        style={{flex: '0 0 auto'}}
                      />
                    ))}
                    {evs.length > 3 && (
                      <span className="text-xs text-gray-500">+{evs.length - 3}</span>
                    )}
                  </div>

                  {/* Desktop: show full colored badges with titles */}
                  <div className="hidden md:flex flex-col gap-1 w-full">
                    {evs.slice(0,2).map((ev, i) => (
                      <span
                        key={`${key}-badge-${i}`}
                        title={ev.title}
                        className={`${(toKey(d) === todayKey) ? getEventTypeColorForToday(ev.type) : getEventTypeColor(ev.type)} text-xs px-2 py-0.5 rounded truncate max-w-full`}
                      >
                        {ev.title}
                      </span>
                    ))}
                    {evs.length > 2 && (
                      <span className="text-xs text-gray-500">+{evs.length - 2} weitere</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
          </div>
        )}

        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setSelectedDate(null); }}>
          {selectedDate && (
            <DialogContent className={`${dialogSizeClass}`}>
              <DialogHeader className="space-y-2">
                <DialogTitle>{new Date(selectedDate).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</DialogTitle>
              </DialogHeader>

              {eventsForSelected.length === 0 ? (
                <div className="text-center py-6 text-gray-500">Keine Termine an diesem Datum.</div>
              ) : (
                <div className="space-y-3">
                  {eventsForSelected.map((ev, i) => {
                    // Function to detect and make links clickable
                    const renderDescription = (text: string) => {
                      const urlRegex = /(https?:\/\/[^\s]+)/g;
                      const parts = text.split(urlRegex);
                      
                      return parts.map((part, index) => {
                        if (part.match(urlRegex)) {
                          return (
                            <a
                              key={index}
                              href={part}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm underline text-club-primary hover:text-club-accent"
                            >
                              {part}
                            </a>
                          );
                        }
                        return <span key={index}>{part}</span>;
                      });
                    };

                    return (
                      <div key={`${selectedDate}-${i}`} className="p-3 border rounded flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="font-medium text-gray-800">{ev.title}</div>
                          <div className="text-sm text-gray-500">{ev.time ? `${ev.time} Uhr` : ''} {ev.location ? `• ${ev.location}` : ''}</div>
                          {ev.description && (
                            <div className="text-sm text-gray-600 mt-1">
                              {renderDescription(ev.description)}
                            </div>
                          )}
                        </div>
                        <div className="mt-3 sm:mt-0">
                          <span className={`px-2 py-1 text-xs rounded ${(selectedDate === todayKey) ? getEventTypeColorForToday(ev.type) : getEventTypeColor(ev.type)}`}>{getEventTypeLabel(ev.type)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
};

export default CalendarSection;