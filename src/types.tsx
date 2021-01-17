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

export type myCalendarType = Array<{
  id: number;
  name: string;
  color: string;
  todos: Array<{
    title: string;
    scheduleTime: string;
    id: number;
  }>;
  reviews: Array<{
    title: string;
    context: string;
    imageUrl: string | null;
    scheduleTime: string;
    id: number;
  }>;
}>;

export type shareCalendarType = Array<{
  id: number;
  name: string;
  color: string;
  todos: Array<{
    title: string;
    scheduleTime: string;
    id: number;
  }>;
  reviews: Array<{
    title: string;
    context: string;
    imageUrl: string | null;
    scheduleTime: string;
    id: number;
  }>;
}>;
