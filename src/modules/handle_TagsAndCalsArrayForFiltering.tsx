/* 1. ActionTypes - handle_TagsAndCalsArrayForFiltering */
// API 통신이 필요한 상태관리가 아님
const HANDLE_FIRST_FILTERING_ON_SIDEBAR_DAY_START: string =
  'HANDLE_FIRST_FILTERING_ON_SIDEBAR_DAY_START';
const HANDLE_FIRST_FILTERING_ON_SIDEBAR_DAY_SUCCESS: string =
  'HANDLE_FIRST_FILTERING_ON_SIDEBAR_DAY_SUCCESS';
const HANDLE_TAGS_ARRAY_FOR_FILTERING_STARTS: string = 'HANDLE_TAGS_ARRAY_FOR_FILTERING_STARTS';
const HANDLE_CALS_ARRAY_FOR_FILTERING_STARTS: string = 'HANDLE_CALS_ARRAY_FOR_FILTERING_STARTS';
const HANDLE_TAGS_ARRAY_FOR_FILTERING_SUCCESS_ADD: string =
  'HANDLE_TAGS_ARRAY_FOR_FILTERING_SUCCESS_ADD';
const HANDLE_TAGS_ARRAY_FOR_FILTERING_SUCCESS_DEL: string =
  'HANDLE_TAGS_ARRAY_FOR_FILTERING_SUCCESS_DEL';
const HANDLE_CALS_ARRAY_FOR_FILTERING_SUCCESS_ADD: string =
  'HANDLE_CALS_ARRAY_FOR_FILTERING_SUCCESS_ADD';
const HANDLE_CALS_ARRAY_FOR_FILTERING_SUCCESS_DEL: string =
  'HANDLE_CALS_ARRAY_FOR_FILTERING_SUCCESS_DEL';

const HANDLE_TAGS_AND_CALS_ARRAY_FAILURE: string = 'HANDLE_DEFAULT_FILTERING_TAGS_FAILURE';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "HANDLE_TAGS_START" 등등)를 리턴합니다. */

export function handle_first_filtering_on_sidebar_day_start() {
  return {
    type: HANDLE_FIRST_FILTERING_ON_SIDEBAR_DAY_START,
  };
}

export function handle_first_filtering_on_sidebar_day_success(tagId: number) {
  return {
    type: HANDLE_FIRST_FILTERING_ON_SIDEBAR_DAY_SUCCESS,
    tagId,
  };
}

export function handle_tags_ArrayForFiltering_Starts() {
  return {
    type: HANDLE_TAGS_ARRAY_FOR_FILTERING_STARTS,
  };
}

export function handle_tags_ArrayForFiltering_Success_Add(checkedTag: number) {
  return {
    type: HANDLE_TAGS_ARRAY_FOR_FILTERING_SUCCESS_ADD,
    checkedTag,
  };
}

export function handle_tags_ArrayForFiltering_Success_Del(checkedTagIndex: number) {
  return {
    type: HANDLE_TAGS_ARRAY_FOR_FILTERING_SUCCESS_DEL,
    checkedTagIndex,
  };
}

export function handle_cals_ArrayForFiltering_Starts() {
  return {
    type: HANDLE_CALS_ARRAY_FOR_FILTERING_STARTS,
  };
}

export function handle_cals_ArrayForFiltering_Success_Add(checkedCal: number) {
  return {
    type: HANDLE_CALS_ARRAY_FOR_FILTERING_SUCCESS_ADD,
    checkedCal,
  };
}

export function handle_cals_ArrayForFiltering_Success_Del(checkedCalIndex: number) {
  return {
    type: HANDLE_CALS_ARRAY_FOR_FILTERING_SUCCESS_DEL,
    checkedCalIndex,
  };
}

export function handle_defaultfilteringTags_Failure() {
  return {
    type: HANDLE_TAGS_AND_CALS_ARRAY_FAILURE,
  };
}

/* 3. initialState 및 reducer 함수 */
interface initialStateI {
  status: string;
  tags_ArrayForFiltering: Array<number>;
  cals_ArrayForFiltering: Array<number>;
}

const initialState: initialStateI = {
  status: 'INIT',
  tags_ArrayForFiltering: [],
  cals_ArrayForFiltering: [],
};

/* reducer func*/

interface actionType {
  type: string;
  tagId: number;
  checkedTag: number;
  checkedTagIndex: number;
  checkedCal: number;
  checkedCalIndex: number;
}

function handle_TagsAndCalsArrayForFiltering(state = initialState, action: actionType) {
  switch (action.type) {
    case HANDLE_FIRST_FILTERING_ON_SIDEBAR_DAY_START:
      return {
        ...state,
        status: 'START',
      };
    case HANDLE_FIRST_FILTERING_ON_SIDEBAR_DAY_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS',
        tags_ArrayForFiltering: [action.tagId],
      };

    case HANDLE_TAGS_ARRAY_FOR_FILTERING_STARTS:
      return {
        ...state,
        status: 'START',
      };
    case HANDLE_TAGS_ARRAY_FOR_FILTERING_SUCCESS_ADD:
      return {
        ...state,
        status: 'SUCCESS',
        tags_ArrayForFiltering: [...state.tags_ArrayForFiltering, action.checkedTag],
      };
    case HANDLE_TAGS_ARRAY_FOR_FILTERING_SUCCESS_DEL:
      let delTagBefore = state.tags_ArrayForFiltering.slice(0, action.checkedTagIndex);
      let delTagAfter = state.tags_ArrayForFiltering.slice(action.checkedTagIndex + 1);
      return {
        ...state,
        status: 'SUCCESS',
        tags_ArrayForFiltering: [...delTagBefore, ...delTagAfter],
      };

    case HANDLE_CALS_ARRAY_FOR_FILTERING_STARTS:
      return {
        ...state,
        status: 'START',
      };
    case HANDLE_CALS_ARRAY_FOR_FILTERING_SUCCESS_ADD:
      return {
        ...state,
        status: 'SUCCESS',
        cals_ArrayForFiltering: [...state.cals_ArrayForFiltering, action.checkedCal],
      };
    case HANDLE_CALS_ARRAY_FOR_FILTERING_SUCCESS_DEL:
      let delCalBefore = state.cals_ArrayForFiltering.slice(0, action.checkedCalIndex);
      let delCalAfter = state.cals_ArrayForFiltering.slice(action.checkedCalIndex + 1);
      return {
        ...state,
        status: 'SUCCESS',
        cals_ArrayForFiltering: [...delCalBefore, ...delCalAfter],
      };

    case HANDLE_TAGS_AND_CALS_ARRAY_FAILURE:
      return {
        ...state,
        status: 'FAILURE',
      };

    default:
      return state;
  }
}

export default handle_TagsAndCalsArrayForFiltering;
