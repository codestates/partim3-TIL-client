/* 1. ActionTypes - login */
const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "AUTH_login" 등등)를 리턴합니다. */

export function loginStart() {
  return {
    type: AUTH_LOGIN_START,
  };
}

export function loginSuccess(id: number, nickname: string) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    id,
    nickname,
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE,
    // error,
  };
}

export function logout() {
  return {
    type: AUTH_LOGOUT,
  };
}

interface loginType {
  status: string;
}

interface statusType {
  isLoggedIn: boolean;
  currentUser: number | null;
  nickname: string | null;
}

interface initialStateType {
  login: loginType;
  status: statusType;
}

/* 3. initialState 및 reducer 함수 */
const initialState: initialStateType = {
  login: {
    status: 'INIT',
  },
  status: {
    isLoggedIn: false,
    currentUser: null,
    nickname: null,
  },
};

/* reducer func*/

interface loginProp {
  type: string;
  id: number | null;
  nickname: string | null;
}

export default function loginOut(state = initialState, action: loginProp) {
  switch (action.type) {
    case AUTH_LOGIN_START:
      return {
        ...state,
        login: {
          ...state.login,
          status: 'WAITING',
        },
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          status: 'SUCCESS',
        },
        status: {
          ...state.status,
          isLoggedIn: true,
          currentUser: action.id,
          nickname: action.nickname,
        },
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        login: {
          ...state.login,
          status: 'FAILURE',
        },
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        status: {
          ...state.status,
          isLoggedIn: false,
          currentUser: null,
          nickname: null,
        },
      };

    default:
      return state;
  }
}
