/* 1. ActionTypes - HANDLE_RERENDER_CALENDARDAY */
const HANDLE_RERENDER_CALENDARDAY_START = 'HANDLE_RERENDER_CALENDARDAY_START';
const HANDLE_RERENDER_CALENDARDAY_SUCCESS = 'HANDLE_RERENDER_CALENDARDAY_SUCCESS';
const HANDLE_RERENDER_CALENDARDAY_FAILURE = 'HANDLE_RERENDER_CALENDARDAY_FAILURE';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "HANDLE_RERENDER_CALENDARDAY_START" 등등)를 리턴합니다. */

export function handle_rerenderCalendarDay_Start() {
  return {
    type: HANDLE_RERENDER_CALENDARDAY_START,
  };
}

export function handle_rerenderCalendarDay_Success(calendarDay_rerendered: boolean) {
  return {
    type: HANDLE_RERENDER_CALENDARDAY_SUCCESS,
    calendarDay_rerendered,
  };
}

export function handle_rerenderCalendarDay_Failure() {
  return {
    type: HANDLE_RERENDER_CALENDARDAY_FAILURE,
  };
}

interface initialStateType {
  status: string;
  calendarDay_rerendered: boolean;
}

/* 3. initialState 및 reducer 함수 */
const initialState: initialStateType = {
  status: 'INIT',
  calendarDay_rerendered: false,
};

/* reducer func*/

interface actionType {
  type: string;
  calendarDay_rerendered: boolean;
}

export default function handle_rerenderCalendarDay(state = initialState, action: actionType) {
  switch (action.type) {
    case HANDLE_RERENDER_CALENDARDAY_START:
      return {
        ...state,
        status: 'START',
      };
    case HANDLE_RERENDER_CALENDARDAY_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS',
        calendarDay_rerendered: action.calendarDay_rerendered,
      };
    case HANDLE_RERENDER_CALENDARDAY_FAILURE:
      return {
        ...state,
        status: 'FAILURE',
      };
    default:
      return state;
  }
}
