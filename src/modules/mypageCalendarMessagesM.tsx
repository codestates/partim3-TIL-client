/* 1. ActionTypes - mypage */
export const MYPAGE_CALENDAR_SUCCESS = 'MYPAGE_CALENDAR__SUCCESS';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "AUTH_login" 등등)를 리턴합니다. */

export function mypageCalendarMessageSuccess(messages: Array<object>) {
  return {
    type: MYPAGE_CALENDAR_SUCCESS,
    messages,
  };
}

/* 3. initialState 및 reducer 함수 */
const initialState = {
  messages: [],
};

function mypageCalendarMessagesM(state = initialState, action: any) {
  switch (action.type) {
    case MYPAGE_CALENDAR_SUCCESS:
      return {
        ...state.messages,
        messages: action.messages,
      };
    default:
      return state;
  }
}

export default mypageCalendarMessagesM;
