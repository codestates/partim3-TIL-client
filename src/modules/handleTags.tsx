/* 1. ActionTypes - handleTags */
const HANDLE_TAGS_START = 'HANDLE_TAGS_START';
const HANDLE_TAGS_SUCCESS_GET: string = 'HANDLE_TAGS_SUCCESS_GET';
const HANDLE_TAGS_FAILURE: string = 'HANDLE_TAGS_FAILURE';
// Put, Post, Delete : 상태관리를 할 필요가 크지는 않은 듯?

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "HANDLE_TAGS_START" 등등)를 리턴합니다. */
interface actionType {
  type: string;
  tags: Array<{
    id: number;
    tagName: string;
    tagColor: string;
    description: string;
  }>;
}

export function handleTagsStart() {
  return {
    type: HANDLE_TAGS_START,
  };
}

export function handleTagsSuccess_Get(tags: actionType) {
  return {
    type: HANDLE_TAGS_SUCCESS_GET,
    tags,
  };
}

export function handleTagsFailure() {
  return {
    type: HANDLE_TAGS_FAILURE,
  };
}

/* 3. initialState 및 reducer 함수 */
interface initialStateI {
  status: string;
  tags: Array<{
    id: number;
    tagName: string;
    tagColor: string;
    description: string;
  }>;
}

const initialState: initialStateI = {
  status: 'INIT',
  tags: [],
};

/* reducer func*/

function handleTags(state = initialState, action: actionType) {
  switch (action.type) {
    case HANDLE_TAGS_START:
      return {
        ...state,
        status: 'START',
      };
    case HANDLE_TAGS_SUCCESS_GET:
      return {
        ...state,
        status: 'SUCCESS',
        tags: action.tags,
      };
    case HANDLE_TAGS_FAILURE:
      return {
        ...state,
        status: 'FAILURE',
      };

    default:
      return state;
  }
}

export default handleTags;
