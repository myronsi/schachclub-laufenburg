import { useState, useMemo, useEffect } from "react";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CalendarEvent } from "@/types/calendarTypes";
const REMOTE_CALENDAR_URL = "/calendar-proxy.php";

function isCalendarEvent(obj: any): obj is CalendarEvent {
  return obj && typeof obj.title === 'string' && typeof obj.date === 'string' && ['tournament','meeting','training','special'].includes(obj.type);
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
  const url = `${REMOTE_CALENDAR_URL}?_=${Date.now()}`;
  const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Invalid JSON');
        const validated = data.filter(isCalendarEvent);
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
  }, []);

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
    return dates;
  }, [startOfCalendar]);

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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Use stronger, solid colors for badges when the cell is the current day
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
            <button onClick={() => setSelectedType('meeting')} className={`px-3 py-1 rounded-full text-sm ${selectedType === 'meeting' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'}`}>Versammlungen</button>
            <button onClick={() => setSelectedType('special')} className={`px-3 py-1 rounded-full text-sm ${selectedType === 'special' ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200'}`}>Besondere</button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold">{formatHeader(currentMonth)}</div>
            {loading ? (
              <div className="text-sm text-gray-500">Wird geladen...</div>
            ) : fetchError ? (
              <div className="text-sm text-red-600">Fehler beim Laden</div>
            ) : null}
            <button onClick={prevMonth} className="p-2 pr-0 rounded hover:bg-gray-100" aria-label="Vorheriger Monat"><ChevronLeft className="w-5 h-5"/></button>
            <button onClick={nextMonth} className="p-2 pl-0 rounded hover:bg-gray-100" aria-label="Nächster Monat"><ChevronRight className="w-5 h-5"/></button>
            <button onClick={goToToday} className="ml-3 px-3 py-1 rounded text-sm bg-amber-600 text-white hover:bg-amber-700" aria-label="Heute">Heute</button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Wird geladen...</div>
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
            return (
              <button
                key={idx}
                onClick={() => { setSelectedDate(key); setDialogOpen(true); }}
                aria-pressed={isSelected}
                  className={`group p-3 h-28 text-left flex flex-col justify-between rounded-sm border focus:outline-none transition-colors duration-150 ${isSelected ? 'bg-sky-100 ring-2 ring-sky-200' : (toKey(d) === todayKey) ? 'bg-sky-100' : isSameMonth(d) ? 'bg-white hover:bg-sky-50' : 'bg-gray-50 text-gray-400 hover:bg-sky-50'}`}
              >
                <div className="flex items-start justify-between">
                    <div className={`flex items-center gap-2`}> 
                      <div className={`text-sm font-semibold text-sky-900`}>{d.getDate()}</div>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                  {evs.slice(0,2).map((ev, i) => (
                    <span key={`${key}-${i}`} className={`text-xs truncate px-2 py-0.5 rounded ${ (toKey(d) === todayKey && !isSelected) ? getEventTypeColorForToday(ev.type) : getEventTypeColor(ev.type)}`}>{ev.title}</span>
                  ))}
                  {evs.length > 2 && <span className="text-xs text-gray-500">+{evs.length - 2} weitere</span>}
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
                  {eventsForSelected.map((ev, i) => (
                    <div key={`${selectedDate}-${i}`} className="p-3 border rounded flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="font-medium text-gray-800">{ev.title}</div>
                        <div className="text-sm text-gray-500">{ev.time ? `${ev.time} Uhr` : ''} {ev.location ? `• ${ev.location}` : ''}</div>
                        {ev.description && <div className="text-sm text-gray-600 mt-1">{ev.description}</div>}
                      </div>
                      <div className="mt-3 sm:mt-0">
                        <span className={`px-2 py-1 text-xs rounded ${getEventTypeColor(ev.type)}`}>{getEventTypeLabel(ev.type)}</span>
                      </div>
                    </div>
                  ))}
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