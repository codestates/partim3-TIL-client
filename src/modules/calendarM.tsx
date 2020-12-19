/* 1. ActionTypes - login */
const CALENDAR_DAY_START: string = 'CALENDAR_DAY_START';
const CALENDAR_DAY_SUCCESS: string = 'CALENDAR_DAY_SUCCESS';
const CALENDAR_DAY_FAILURE: string = 'CALENDAR_DAY_FAILURE';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "AUTH_login" 등등)를 리턴합니다. */
interface scheduleDateI {
  year: number;
  month: number;
  day: number;
}

interface scheduleTimeI {
  hour: number;
  min: number;
}

interface calendarDayI {
  type: string;
  todos: Array<{
    id: number;
    title: string;
    scheduleDate: string;
    todoTags: Array<{
      tag: { id: number; tagName: string; tagColor: string; descrption: string };
    }>;
    calendarId: number;
    calendarColor: string;
  }>;
  reviews: Array<{
    title: string;
    context: string;
    imageUrl: string | null;
    scheduleDate: scheduleDateI;
    scheduleTime: scheduleTimeI;
    id: number;
    calendarId: number;
    calendarColor: string;
  }>;
}

export function calendarStart() {
  return {
    type: CALENDAR_DAY_START,
  };
}

export function calendarSuccess(todos: Array<object>, reviews: Array<object>) {
  return {
    type: CALENDAR_DAY_SUCCESS,
    todos,
    reviews,
  };
}

export function calendarFailure() {
  return {
    type: CALENDAR_DAY_FAILURE,
    // error,
  };
}

/* 3. initialState 및 reducer 함수 */

interface todosAndReviewsI {
  todos: Array<{
    id: number;
    title: string;
    scheduleDate: string;
    todoTags: Array<{
      tag: { id: number; tagName: string; tagColor: string; descrption: string };
    }>;
    calendarId: number;
    calendarColor: string;
  }>;
  reviews: Array<{
    title: string;
    context: string;
    imageUrl: string | null;
    scheduleDate: scheduleDateI;
    scheduleTime: scheduleTimeI;
    id: number;
    calendarId: number;
    calendarColor: string;
  }>;
}

interface initialStateType {
  calendarDayStatus: {
    status: string;
  };
  todosAndReviews: todosAndReviewsI;
}

const initialState: initialStateType = {
  calendarDayStatus: {
    status: 'INIT',
  },
  todosAndReviews: {
    // isLoggedIn: false, 굳이 필요하지 않을 것 같다.
    todos: [],
    reviews: [],
  },
};

/* reducer func*/

function calendarDay(state = initialState, action: calendarDayI) {
  switch (action.type) {
    case CALENDAR_DAY_START:
      return {
        ...state,
        calendarDayStatus: {
          status: 'WAITING',
        },
      };
    case CALENDAR_DAY_SUCCESS:
      return {
        ...state,
        calendarDayStatus: {
          status: 'SUCCESS',
        },
        todosAndReviews: {
          ...state.todosAndReviews,
          todos: action.todos,
          reviews: action.reviews,
        },
      };
    case CALENDAR_DAY_FAILURE:
      return {
        ...state,
        calendarDayStatus: {
          status: 'FAILURE',
        },
      };

    default:
      return state;
  }
}

export default calendarDay;
