export interface CalendarEvent {
  id?: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  type: 'tournament' | 'meeting' | 'training' | 'special' | 'holiday';
  is_recurring?: number | boolean;
}

export type CalendarEvents = CalendarEvent[];
