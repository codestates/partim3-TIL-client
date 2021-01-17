import { myCalendarType, shareCalendarType } from '../types';

/* 1. ActionTypes - GET_CALENDARS */
const GET_CALENDARS_START = 'AUTH_LOGIN_START';
const GET_CALENDARS_SUCCESS = 'GET_CALENDARS_SUCCESS';
const GET_CALENDARS_FAILURE = 'AUTH_LOGIN_FAILURE';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "AUTH_login" 등등)를 리턴합니다. */

interface actionType {
  type: string;
  myCalendar: myCalendarType;
  shareCalendar: shareCalendarType;
}

export function getCalendarsStart() {
  return {
    type: GET_CALENDARS_START,
  };
}

export function getCalendarsSuccess(myCalendar: myCalendarType, shareCalendar: shareCalendarType) {
  return {
    type: GET_CALENDARS_SUCCESS,
    myCalendar,
    shareCalendar,
  };
}

export function getCalendarsFailure() {
  return {
    type: GET_CALENDARS_FAILURE,
    // error,
  };
}

interface initialStateType {
  status: string;
  allCalendars: { myCalendar: myCalendarType; shareCalendar: shareCalendarType };
}

/* 3. initialState 및 reducer 함수 */
const initialState: initialStateType = {
  status: 'INIT',
  allCalendars: {
    myCalendar: [],
    shareCalendar: [],
  },
};

/* reducer func*/

function getAllCalendars(state = initialState, action: actionType) {
  switch (action.type) {
    case GET_CALENDARS_START:
      return {
        ...state,
        status: 'WAITING',
      };
    case GET_CALENDARS_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS',
        allCalendars: {
          ...state.allCalendars,
          myCalendar: action.myCalendar,
          shareCalendar: action.shareCalendar,
        },
      };
    case GET_CALENDARS_FAILURE:
      return {
        ...state,
        status: 'FAILURE',
      };

    default:
      return state;
  }
}

export default getAllCalendars;
