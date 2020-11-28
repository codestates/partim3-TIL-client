import date from '../components/UI/Atoms/todayF';

/* 1. ActionTypes - Signup */
const HANDLE_TODAY_START = 'HANDLE_TODAY_START';
const HANDLE_TODAY_SUCCESS = 'HANDLE_TODAY_SUCCESS';
const HANDLE_TODAY_FAILURE = 'HANDLE_TODAY_FAILURE';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "AUTH_SIGNUP" 등등)를 리턴합니다. */

export function handleTodayStart() {
  return {
    type: HANDLE_TODAY_START,
  };
}

export function handleTodaySuccess(today: object) {
  return {
    type: HANDLE_TODAY_SUCCESS,
    today,
  };
}

export function handleTodayFailure() {
  return {
    type: HANDLE_TODAY_FAILURE,
    // error,
  };
}

interface initialStateType {
  status: string;
  today: {
    year: number;
    month: number;
    day: number;
    hour: number;
    min: number;
  };
}

/* 3. initialState 및 reducer 함수 */
const initialState = {
  status: 'INIT',
  today: date,
};

interface handleTodayProp {
  type: string;
  today: {
    year: number;
    month: number;
    day: number;
    hour: number;
    min: number;
  };
}

/* reducer func*/

export default function handleToday(state = initialState, action: handleTodayProp) {
  switch (action.type) {
    case HANDLE_TODAY_START:
      return {
        ...state,
        status: 'WAITING',
      };
    case HANDLE_TODAY_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS',
        today: {
          ...state.today,
          day: action.today.day,
        },
      };
    case HANDLE_TODAY_FAILURE:
      return {
        ...state,
        status: 'FAILURE',
      };

    default:
      return state;
  }
}