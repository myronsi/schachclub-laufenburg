import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
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
        const month = currentMonth.getMonth() + 1;
        
        const url = `https://sc-laufenburg.de/api/events.php?action=month&year=${year}&month=${month}`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        const eventsArray = data.events || [];
        if (!Array.isArray(eventsArray)) throw new Error('Invalid JSON structure');
        
        const transformedEvents = eventsArray.map((event: any) => ({
          ...event,
          time: event.time && typeof event.time === 'string' 
            ? event.time.substring(0, 5)
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

  useEffect(() => {
    const prefixes = ['/kalender'];
    const path = location.pathname || '';

    for (const prefix of prefixes) {
      if (path === prefix || path === prefix + '/') {
        const y = currentMonth.getFullYear();
        const m = String(currentMonth.getMonth() + 1).padStart(2, '0');
        const target = `${prefix}/${y}-${m}`;
        navigate(target, { replace: true });
        return;
      }
    }

    const dateMatch = path.match(/\/(kalender)\/(\d{4}-\d{2}-\d{2})/);
    if (dateMatch && dateMatch[2]) {
      const dateStr = dateMatch[2];
      const [year, month, day] = dateStr.split('-').map((s) => parseInt(s, 10));
      
      if (!Number.isNaN(year) && !Number.isNaN(month) && !Number.isNaN(day)) {
        const urlMonth = new Date(year, month - 1, 1);
        const urlMonthKey = `${year}-${String(month).padStart(2, '0')}`;
        const currentMonthKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
        
        if (urlMonthKey !== currentMonthKey) {
          setCurrentMonth(urlMonth);
        }
        
        if (selectedDate !== dateStr) {
          setSelectedDate(dateStr);
          setDialogOpen(true);
        }
      }
      return;
    }

    const monthMatch = path.match(/\/(kalender)\/(\d{4}-\d{2})$/);
    if (monthMatch && monthMatch[2]) {
      const [year, month] = monthMatch[2].split('-').map((s) => parseInt(s, 10));
      if (!Number.isNaN(year) && !Number.isNaN(month)) {
        const urlMonth = new Date(year, month - 1, 1);
        const urlKey = `${year}-${String(month).padStart(2, '0')}`;
        const currentKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
        
        if (urlKey !== currentKey) {
          setCurrentMonth(urlMonth);
        }
      }
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
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
      if (ev.date.includes(':')) {
        const [startStr, endStr] = ev.date.split(':');
        const startDate = new Date(startStr);
        const endDate = new Date(endStr);
        
        const currentDate = new Date(startDate);
        let lastWeekStart: number | null = null;
        
        while (currentDate <= endDate) {
          const key = toKey(currentDate);
          if (!map[key]) map[key] = [];
          
          const dayOfWeek = (currentDate.getDay() + 6) % 7;
          const isFirstDay = currentDate.getTime() === startDate.getTime();
          const weekStart = currentDate.getTime() - (dayOfWeek * 24 * 60 * 60 * 1000);
          const isFirstDayOfWeek = lastWeekStart !== weekStart;
          
          if (isFirstDayOfWeek) {
            lastWeekStart = weekStart;
          }
          
          map[key].push({ 
            ...ev, 
            isMultiDay: true, 
            rangeStart: startStr, 
            rangeEnd: endStr,
            showTitle: isFirstDay || isFirstDayOfWeek
          } as any);
          
          currentDate.setDate(currentDate.getDate() + 1);
        }
      } else {
        const key = ev.date.slice(0, 10);
        if (!map[key]) map[key] = [];
        map[key].push(ev);
      }
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

    const lastWeek = dates.slice(5 * 7, 6 * 7);
    const hasCurrentMonthInLastWeek = lastWeek.some(d => d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear());
    if (!hasCurrentMonthInLastWeek) return dates.slice(0, 5 * 7);

    return dates;
  }, [startOfCalendar, currentMonth]);

  const prevMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const y = newMonth.getFullYear();
    const m = String(newMonth.getMonth() + 1).padStart(2, '0');
    navigate(`/kalender/${y}-${m}`);
  };
  
  const nextMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    const y = newMonth.getFullYear();
    const m = String(newMonth.getMonth() + 1).padStart(2, '0');
    navigate(`/kalender/${y}-${m}`);
  };
  
  const goToToday = () => {
    const t = new Date();
    const y = t.getFullYear();
    const m = String(t.getMonth() + 1).padStart(2, '0');
    navigate(`/kalender/${y}-${m}`);
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
            {Array.from({length:7}).map((_, i) => (
              <Skeleton key={`header-${i}`} className="h-8 rounded-md" />
            ))}
            {Array.from({length:35}).map((_, i) => (
              <Skeleton key={`cell-${i}`} className="h-28 rounded-sm" />
            ))}
          </div>
        ) : fetchError ? (
          <div className="text-center py-4 mb-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800 text-sm">
              Es ist ein Fehler beim Laden der Artikel aufgetreten. Bitte versuche es später erneut.
            </p>
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
            const maxMobileDots = 5;
            const mobileDots = evs.slice(0, maxMobileDots);
            const bottomDotCount = Math.min(2, mobileDots.length);
            const bottomDots = mobileDots.slice(0, bottomDotCount);
            const upperDots = mobileDots.slice(bottomDotCount);
            const extraMobileDots = evs.length - mobileDots.length;
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
                onClick={() => { 
                  const y = d.getFullYear();
                  const m = String(d.getMonth() + 1).padStart(2, '0');
                  const day = String(d.getDate()).padStart(2, '0');
                  navigate(`/kalender/${y}-${m}-${day}`);
                }}
                aria-pressed={isSelected}
                  className={`group p-3 h-28 text-left flex flex-col justify-between rounded-sm overflow-hidden focus:outline-none transition-colors duration-150 border border-gray-200 bg-white ${cellClass}`}
              >
                <div className="flex items-start justify-between">
                    <div className={`flex items-center gap-2`}> 
                      <div className={`text-sm ${isToday ? 'text-amber-800 font-bold' : 'font-semibold'} ${isSameMonth(d) ? 'text-sky-900' : 'text-gray-400'}`}>{d.getDate()}</div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className={`flex flex-col ${upperDots.length === 1 ? 'items-start' : 'items-center'} md:hidden gap-0.5 max-w-full`}>
                    {upperDots.slice().reverse().map((ev, i) => (
                      <span
                        key={`${key}-upper-${i}`}
                        title={`${ev.title}${(ev as any).isMultiDay ? ' (Mehrtägig)' : ''}`}
                        className={`${getEventTypeColorForDots(ev.type)} ${(ev as any).isMultiDay ? 'w-4 h-3 rounded-sm' : 'w-3 h-3 rounded-md'} inline-block border ${isToday ? 'ring-2 ring-white/60' : ''}`}
                      />
                    ))}
                    {bottomDots.length > 0 && (
                      <div className="flex justify-center gap-1">
                        {bottomDots.map((ev, i) => (
                          <span
                            key={`${key}-bottom-${i}`}
                            title={`${ev.title}${(ev as any).isMultiDay ? ' (Mehrtägig)' : ''}`}
                            className={`${getEventTypeColorForDots(ev.type)} ${(ev as any).isMultiDay ? 'w-4 h-3 rounded-sm' : 'w-3 h-3 rounded-md'} inline-block border ${isToday ? 'ring-2 ring-white/60' : ''}`}
                          />
                        ))}
                      </div>
                    )}
                    {extraMobileDots > 0 && (
                      <span className="text-[10px] text-gray-500 leading-none">+{extraMobileDots}</span>
                    )}
                  </div>

                  <div className="hidden md:flex flex-col gap-1 w-full">
                    {evs.slice(0,2).map((ev, i) => {
                      const isMultiDay = (ev as any).isMultiDay;
                      const showTitle = (ev as any).showTitle;
                      
                      // For multi-day events without title, show a visual indicator bar
                      if (isMultiDay && !showTitle) {
                        return (
                          <span
                            key={`${key}-badge-${i}`}
                            title={`${ev.title} (Mehrtägig)`}
                            className={`${(toKey(d) === todayKey) ? getEventTypeColorForToday(ev.type) : getEventTypeColor(ev.type)} h-2 rounded-full`}
                          />
                        );
                      }
                      
                      return (
                        <span
                          key={`${key}-badge-${i}`}
                          title={`${ev.title}${isMultiDay ? ' (Mehrtägig)' : ''}`}
                          className={`${(toKey(d) === todayKey) ? getEventTypeColorForToday(ev.type) : getEventTypeColor(ev.type)} text-xs px-2 py-0.5 rounded truncate max-w-full ${isMultiDay ? 'italic border-l-2 border-gray-600' : ''}`}
                        >
                          {ev.title}
                        </span>
                      );
                    })}
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

        <Dialog open={dialogOpen} onOpenChange={(open) => {
          if (closeTimerRef.current) {
            window.clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
          }
          setDialogOpen(open);
          if (!open) {
            const y = currentMonth.getFullYear();
            const m = String(currentMonth.getMonth() + 1).padStart(2, '0');
            closeTimerRef.current = window.setTimeout(() => {
              setSelectedDate(null);
              navigate(`/kalender/${y}-${m}`, { replace: true });
              closeTimerRef.current = null;
            }, 220);
          }
        }}>
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
                    const renderDescription = (text: string) => {
                      const urlRegex = /(https?:\/\/[^\s]+|\/[A-Za-z0-9_\-\/\?=&%#\.\+~]+)/g;
                      const parts = text.split(urlRegex);

                      return parts.map((part, index) => {
                        if (!part) return <span key={index} />;
                        if (part.match(/^https?:\/\//)) {
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
                        if (part.startsWith('/')) {
                          return (
                            <Link key={index} to={part} className="text-sm underline text-club-primary hover:text-club-accent">
                              {part}
                            </Link>
                          );
                        }
                        return <span key={index}>{part}</span>;
                      });
                    };

                    const isMultiDay = (ev as any).isMultiDay;
                    const rangeStart = (ev as any).rangeStart;
                    const rangeEnd = (ev as any).rangeEnd;

                    return (
                      <div key={`${selectedDate}-${i}`} className="p-3 border rounded flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="font-medium text-gray-800">{ev.title}</div>
                          {isMultiDay && rangeStart && rangeEnd && (
                            <div className="text-xs text-gray-600 mt-0.5">
                              {new Date(rangeStart).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })} - {new Date(rangeEnd).toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                          )}
                          <div className="text-sm text-gray-500">{ev.time ? `${ev.time} Uhr •` : ''} {ev.location ? ` ${ev.location}` : ''}</div>
                          {ev.description && (
                            <div className="text-sm text-gray-600 mt-1">
                              {renderDescription(ev.description)}
                            </div>
                          )}
                        </div>
                        <div className="mt-3 sm:mt-0 flex flex-col gap-1 items-end">
                          <span className={`px-2 py-1 text-xs rounded ${(selectedDate === todayKey) ? getEventTypeColorForToday(ev.type) : getEventTypeColor(ev.type)}`}>{getEventTypeLabel(ev.type)}</span>
                          {isMultiDay && (
                            <span className="text-[10px] text-gray-500 italic">Mehrtägig</span>
                          )}
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