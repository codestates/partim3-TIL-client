/* 1. ActionTypes - login */
const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const AUTH_UPDATE_NICKNAME = 'AUTH_UPDATE_NICKNAME';

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
  };
}

export function logout() {
  return {
    type: AUTH_LOGOUT,
  };
}

export function updateNickname(newNickname: string) {
  return {
    type: AUTH_UPDATE_NICKNAME,
    newNickname,
  };
}

interface initialStateType {
  login: {
    status: string;
  };
  status: {
    isLoggedIn: boolean;
    currentUser: number | null;
    nickname: string | null;
  };
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

interface actionType {
  type: string;
  id: number | null;
  nickname: string | null;
  newNickname: string;
}

export default function loginOut(state = initialState, action: actionType) {
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
    case AUTH_UPDATE_NICKNAME:
      return {
        ...state,
        status: {
          ...state.status,
          nickname: action.newNickname,
        },
      };
    default:
      return state;
  }
}
