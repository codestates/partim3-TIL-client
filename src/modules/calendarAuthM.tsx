/* 1. ActionTypes */
const CALENDAR_AUTH: string = 'CALENDAR_AUTH';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "AUTH_login" 등등)를 리턴합니다. */

type authorityType = Array<{
  auth: boolean;
  id: number;
  ownerId: number;
  ownerNickname: string;
  read: boolean;
  user: { nickname: string };
  write: boolean;
}>;

interface actionType {
  type: string;
  calAuth: authorityType;
}

export function calendarAuth(calAuth: authorityType) {
  return {
    type: CALENDAR_AUTH,
    calAuth,
  };
}

interface initialStateType {
  calAuth: authorityType;
}

/* 3. initialState 및 reducer 함수 */
//리덕스에 컴포넌트를 저장할 수는 없다.
const initialState: initialStateType = {
  calAuth: [],
};

function calendarAuthM(state = initialState, action: actionType) {
  // console.log('모듈', action.curCal);
  switch (action.type) {
    case CALENDAR_AUTH:
      return {
        ...state,
        calAuth: action.calAuth,
      };
    default:
      return state;
  }
}

export default calendarAuthM;
