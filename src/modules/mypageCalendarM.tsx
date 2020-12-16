/* 1. ActionTypes - mypage */
export const MYPAGE_CALENDAR_SUCCESS = 'MYPAGE_CALENDAR__SUCCESS';
export const MYPAGE_CALENDAR_FAILURE = 'MYPAGE_CALENDAR__FAILURE';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "AUTH_login" 등등)를 리턴합니다. */

export function tagsSuccess() {
  return {
    type: MYPAGE_CALENDAR_SUCCESS,
  };
}

export function tagsFailure() {
  return {
    type: MYPAGE_CALENDAR_FAILURE,
    // error,
  };
}
