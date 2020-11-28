/* 1. ActionTypes - login */
const SIDE_BAR_STATUS: string = 'SIDE_BAR_STATUS';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "AUTH_login" 등등)를 리턴합니다. */

interface sidebarStatusRFI {
  type: string;
  sidebar: boolean;
  sW: number;
}

export function sidebarStatus(sidebar: boolean, sW: number) {
  return {
    type: SIDE_BAR_STATUS,
    sidebar,
    sW,
  };
}

/* 3. initialState 및 reducer 함수 */

interface sideBarMI {
  sidebar: boolean;
  sW: number;
}

const initialState: sideBarMI = {
  sidebar: true,
  sW: 2,
};

/* reducer func*/

function sideBarM(state = initialState, action: sidebarStatusRFI) {
  switch (action.type) {
    case SIDE_BAR_STATUS:
      return {
        ...state,
        sidebar: action.sidebar,
        sW: action.sW,
      };

    default:
      return state;
  }
}

export default sideBarM;
