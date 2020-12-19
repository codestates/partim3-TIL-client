/* 1. ActionTypes - handle default filtering Tags */
// API 통신이 필요한 상태관리가 아님
const HANDLE_DEFAULT_FILTERING_TAGS_STARTS: string = 'HANDLE_DEFAULT_FILTERING_TAGS_STARTS';
const HANDLE_DEFAULT_FILTERING_TAGS_SUCCESS: string = 'HANDLE_DEFAULT_FILTERING_TAGS_SUCCESS';
const HANDLE_DEFAULT_FILTERING_TAGS_FAILURE: string = 'HANDLE_DEFAULT_FILTERING_TAGS_FAILURE';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "HANDLE_TAGS_START" 등등)를 리턴합니다. */

export function handle_defaultfilteringTags_Start() {
  return {
    type: HANDLE_DEFAULT_FILTERING_TAGS_STARTS,
  };
}

export function handle_defaultfilteringTags_Success(defaultFiltering_TagID: number) {
  return {
    type: HANDLE_DEFAULT_FILTERING_TAGS_SUCCESS,
    defaultFiltering_TagID,
  };
}

export function handle_defaultfilteringTags_Failure() {
  return {
    type: HANDLE_DEFAULT_FILTERING_TAGS_FAILURE,
  };
}

/* 3. initialState 및 reducer 함수 */
interface initialStateI {
  status: string;
  defaultFiltering_TagID: number;
}

const initialState: initialStateI = {
  status: 'INIT',
  defaultFiltering_TagID: NaN,
};

/* reducer func*/

interface actionType {
  type: string;
  defaultFiltering_TagID: number;
}

function handle_SideBarTag_defaultFilteringTag(state = initialState, action: actionType) {
  switch (action.type) {
    case HANDLE_DEFAULT_FILTERING_TAGS_STARTS:
      return {
        ...state,
        status: 'START',
      };
    case HANDLE_DEFAULT_FILTERING_TAGS_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS',
        defaultFiltering_TagID: action.defaultFiltering_TagID,
      };
    case HANDLE_DEFAULT_FILTERING_TAGS_FAILURE:
      return {
        ...state,
        status: 'FAILURE',
      };

    default:
      return state;
  }
}

export default handle_SideBarTag_defaultFilteringTag;
