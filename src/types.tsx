export interface CalendarDayProps {
  sidebar: boolean;
  today: todayProps;
}

export interface todayProps {
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
}

export interface resetDayI {
  year: null;
  month: null;
  day: null;
  hour: null;
  min: null;
}
