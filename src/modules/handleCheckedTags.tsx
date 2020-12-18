// checkedTagArray 이거는 태그들마다 따로 관리해야 하는구나 - 수정 필요
// 실제로는 투두마다 어떤 태그를 갖고있는지를 서버에서 관리하고 내려줄텐데...?
// 이 모듈이 아예 쓸모없거나 크게 변경될 것 같다

/* 1. ActionTypes - handleCheckedTags */
const HANDLE_CHEKED_TAGS_START: string = 'HANDLE_TAGS_START';
const HANDLE_CHEKED_TAGS_ADD: string = 'HANDLE_TAGS_CHEKED_ADD';
const HANDLE_CHEKED_TAGS_DEL: string = 'HANDLE_TAGS_CHEKED_DEL';
const HANDLE_CHEKED_TAGS_FAILURE: string = 'HANDLE_TAGS_FAILURE';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "HANDLE_TAGS_START" 등등)를 리턴합니다. */
interface actionType {
  type: string;
  checkedTag: number;
  checkedTagIndex: number;
}

export function handleCheckedTagsStart() {
  return {
    type: HANDLE_CHEKED_TAGS_START,
  };
}

export function handleCheckedTagsSuccess_add(checkedTag: number) {
  return {
    type: HANDLE_CHEKED_TAGS_ADD,
    checkedTag,
  };
}

export function handleCheckedTagsSuccess_del(checkedTagIndex: number) {
  return {
    type: HANDLE_CHEKED_TAGS_DEL,
    checkedTagIndex,
  };
}

export function handleTagsFailure() {
  return {
    type: HANDLE_CHEKED_TAGS_FAILURE,
  };
}

/* 3. initialState 및 reducer 함수 */
interface initialStateI {
  status: string;
  checkedTagArray: Array<number>;
}

const initialState: initialStateI = {
  status: 'INIT',
  checkedTagArray: [],
};

/* reducer func*/

function handleCheckedTags(state = initialState, action: actionType) {
  switch (action.type) {
    case HANDLE_CHEKED_TAGS_START:
      return {
        ...state,
        status: 'START',
      };

    case HANDLE_CHEKED_TAGS_ADD:
      return {
        ...state,
        status: 'SUCCESS',
        checkedTagArray: [...state.checkedTagArray, action.checkedTag],
      };

    case HANDLE_CHEKED_TAGS_DEL:
      let delBefore = state.checkedTagArray.slice(0, action.checkedTagIndex);
      let delAfter = state.checkedTagArray.slice(action.checkedTagIndex + 1);
      return {
        ...state,
        status: 'SUCCESS',
        checkedTagArray: [...delBefore, ...delAfter],
      };

    case HANDLE_CHEKED_TAGS_FAILURE:
      return {
        ...state,
        status: 'FAILURE',
      };

    default:
      return state;
  }
}

export default handleCheckedTags;
