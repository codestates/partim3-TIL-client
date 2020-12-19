/* 1. ActionTypes */
const SELECTED_CALENDAR: string = 'SELECTED_CALENDAR';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "AUTH_login" 등등)를 리턴합니다. */

export function calendarSelected(curCal: any) {
  return {
    type: SELECTED_CALENDAR,
    curCal,
  };
}

/* 3. initialState 및 reducer 함수 */
//리덕스에 컴포넌트를 저장할 수는 없다.
const initialState = {
  curCal: '',
};

function seledCalM(state = initialState, action: any) {
  // console.log('모듈', action.curCal);
  switch (action.type) {
    case SELECTED_CALENDAR:
      return {
        ...state,
        curCal: action.curCal,
      };
    default:
      return state;
  }
}

export default seledCalM;
