/* 1. ActionTypes - mypage */
export const MYPAGE_CALENDAR_SUCCESS = 'MYPAGE_CALENDAR__SUCCESS';

type messagesType = Array<{
  auth: boolean;
  description: string;
  fromUser: number;
  fromUserNickname: string;
  id: number;
  read: boolean;
  shareCalendar: number;
  shareCalendarName: string;
  write: boolean;
}>;

interface actionType {
  type: string;
  messages: messagesType;
}

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "AUTH_login" 등등)를 리턴합니다. */

export function mypageCalendarMessageSuccess(messages: messagesType) {
  return {
    type: MYPAGE_CALENDAR_SUCCESS,
    messages,
  };
}

/* 3. initialState 및 reducer 함수 */
interface initialStateType {
  messages: messagesType;
}

const initialState: initialStateType = {
  messages: [],
};

function mypageCalendarMessagesM(state = initialState, action: actionType) {
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
