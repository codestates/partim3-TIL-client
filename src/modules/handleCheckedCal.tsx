/* 1. ActionTypes - Signup */
const HANDLE_CHECKED_CAL_START = 'HANDLE_CHECKED_CAL_START';
const HANDLE_CHECKED_CAL_SUCCESS_ADD = 'HANDLE_CHECKED_CAL_SUCCESS_ADD';
const HANDLE_CHECKED_CAL_SUCCESS_DEL = 'HANDLE_CHECKED_CAL_SUCCESS_DEL';
const HANDLE_CHECKED_CAL_FAILURE = 'HANDLE_CHECKED_CAL_FAILURE';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "AUTH_SIGNUP" 등등)를 리턴합니다. */
interface actionType {
  type: string;
  checkedCal: number;
  checkedCalIndex: number;
}

export function handleCheckedCalStart() {
  return {
    type: HANDLE_CHECKED_CAL_START,
  };
}

export function handleCheckedCalSuccess_add(checkedCal: number) {
  return {
    type: HANDLE_CHECKED_CAL_SUCCESS_ADD,
    checkedCal,
  };
}

export function handleCheckedCalSuccess_del(checkedCalIndex: number) {
  return {
    type: HANDLE_CHECKED_CAL_SUCCESS_DEL,
    checkedCalIndex,
  };
}

export function handleCheckedCalFailure() {
  return {
    type: HANDLE_CHECKED_CAL_FAILURE,
    // error,
  };
}

/* 3. initialState 및 reducer 함수 */
interface initialStateType {
  status: string;
  checkedCalArray: Array<number>;
}

const initialState: initialStateType = {
  status: 'INIT',
  checkedCalArray: [],
};

/* reducer func*/
function handleCheckedCal(state = initialState, action: actionType) {
  switch (action.type) {
    case HANDLE_CHECKED_CAL_START:
      return {
        ...state,
        status: 'WAITING',
      };
    case HANDLE_CHECKED_CAL_SUCCESS_ADD:
      return {
        ...state,
        status: 'SUCCESS',
        checkedCalArray: [...state.checkedCalArray, action.checkedCal],
        // 전체 배열을 바꾸라는 뜻으로 쓴건데, 이렇게 해도 되나?
      };
    case HANDLE_CHECKED_CAL_SUCCESS_DEL:
      let delBefore = state.checkedCalArray.slice(0, action.checkedCalIndex);
      let delAfter = state.checkedCalArray.slice(action.checkedCalIndex + 1);
      return {
        ...state,
        status: 'SUCCESS',
        checkedCalArray: [...delBefore, ...delAfter],
        // 전체 배열을 바꾸라는 뜻으로 쓴건데, 이렇게 해도 되나?
      };
    case HANDLE_CHECKED_CAL_FAILURE:
      return {
        ...state,
        status: 'FAILURE',
      };

    default:
      return state;
  }
}

export default handleCheckedCal;
