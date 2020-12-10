/* 1. ActionTypes - login */
const TAGS_SUCCESS: string = 'MYPAGE_TAGS_SUCCESS';
const TAGS_FAILURE: string = 'MYPAGE_TAGS_SUCCESS';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "AUTH_login" 등등)를 리턴합니다. */
interface actionType {
  type: string;
  tags: Array<{
    type: string;
    tagColor: string;
    tagName: string;
    description: string;
    id: number;
  }>;
}

export function tagsSuccess(tags: actionType) {
  return {
    type: TAGS_SUCCESS,
    tags,
  };
}

export function tagsFailure() {
  return {
    type: TAGS_FAILURE,
    // error,
  };
}

/* 3. initialState 및 reducer 함수 */
interface initialStateI {
  calendarDayStatus: {
    status: string;
  };
  tags:
    | Array<{
        type: string;
        tagColor: string;
        tagName: string;
        description: string;
        id: number;
      }>
    | [];
}

const initialState: initialStateI = {
  calendarDayStatus: {
    status: 'INIT',
  },
  tags: [],
};

/* reducer func*/

function tagsM(state = initialState, action: actionType) {
  switch (action.type) {
    case TAGS_SUCCESS:
      return {
        ...state,
        calendarDayStatus: {
          status: 'SUCCESS',
        },
        tags: action.tags,
      };
    case TAGS_FAILURE:
      return {
        ...state,
        calendarDayStatus: {
          status: 'FAILURE',
        },
      };

    default:
      return state;
  }
}

export default tagsM;
