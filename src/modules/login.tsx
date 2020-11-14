/* 1. ActionTypes - login */
const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "AUTH_login" 등등)를 리턴합니다. */

interface loginProp {
  type: string;
}

export function loginStart() {
  return {
    type: AUTH_LOGIN_START,
  };
}

export function loginSuccess() {
  return {
    type: AUTH_LOGIN_SUCCESS,
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

/* 3. initialState 및 reducer 함수 */
const initialState = {
  login: {
    status: 'INIT',
  },
  status: {
    valid: false,
    isLoggedIn: false,
    currentUser: null,
  },
};

/* reducer func*/

function login(state = initialState, action: loginProp) {
  switch (action.type) {
    case AUTH_LOGIN_START:
      return {
        ...state,
        login: {
          status: 'WAITING',
        },
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          status: 'SUCCESS',
        },
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        login: {
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
        },
      };

    default:
      return state;
  }
}

export default login;
