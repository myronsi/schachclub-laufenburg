export interface CalendarEvent {
  id?: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  type: 'tournament' | 'meeting' | 'training' | 'special';
}

export type CalendarEvents = CalendarEvent[];
