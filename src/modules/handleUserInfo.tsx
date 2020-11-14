/* 1. ActionTypes - mypage */
export const USER_INFO_START = 'USER_INFO_START';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILURE = 'USER_INFO_FAILURE';

export const USER_INFO_UPDATE_START = 'USER_INFO_UPDATE_START';
export const USER_INFO_UPDATE_SUCCESS = 'USER_INFO_UPDATE_SUCCESS';
export const USER_INFO_UPDATE_FAILURE = 'USER_INFO_UPDATE_FAILURE';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "QUESTION_LIST_START" 등등)를 리턴합니다. */

// get userInfo
export function getUserInfoStart() {
  return {
    type: USER_INFO_START,
  };
}

export function getUserInfoSuccess(userData: object) {
  return {
    type: USER_INFO_SUCCESS,
    userData,
  };
}

export function getUserInfoFailure() {
  return {
    type: USER_INFO_FAILURE,
  };
}

// update userInfo
export function updateUerInfoStart() {
  return {
    type: USER_INFO_UPDATE_START,
  };
}

export function updateUserInfoSuccess() {
  return {
    type: USER_INFO_UPDATE_SUCCESS,
  };
}

export function updateUserInfoFailure() {
  return {
    type: USER_INFO_UPDATE_FAILURE,
  };
}

/* 3. initialState 및 reducer 함수 */
const initialState = {
  userInfo: {
    status: 'INIT',
    userData: {},
  },
  update: {
    status: 'INIT',
  },
};

interface actionProps {
  type: string;
  userData: object;
}

export default function handleUserInfo(state = initialState, action: actionProps) {
  switch (action.type) {
    // get userInfo
    case USER_INFO_START:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          status: 'WAITING',
        },
      };
    case USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          status: 'SUCCESS',
          userData: action.userData,
        },
      };
    case USER_INFO_FAILURE:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          status: 'FAILURE',
        },
      };
    // update userInfo
    case USER_INFO_UPDATE_START:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          status: 'WAITING',
        },
      };
    case USER_INFO_UPDATE_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          status: 'SUCCESS',
          // userData: action.NewUserData, 이걸 변경하지 말고, 그냥 mypage를 한번 더 렌더링하자
        },
      };
    case USER_INFO_UPDATE_FAILURE:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          status: 'FAILURE',
        },
      };
    default:
      return state;
  }
}
