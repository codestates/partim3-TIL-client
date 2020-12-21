/* 1. ActionTypes - handle default filtering Tags */
const HANDLE_FILTERED_TODOS_AND_REVIEWS_STARTS: string = 'HANDLE_FILTERED_TODOS_AND_REVIEWS_START';
const HANDLE_FILTERED_TODOS_AND_REVIEWS_SUCCESS: string = 'HANDLE_DEFAULT_FILTERING_TAGS_SUCCESS';
const HANDLE_FILTERED_TODOS_AND_REVIEWS_FAILURE: string = 'HANDLE_DEFAULT_FILTERING_TAGS_FAILURE';

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "HANDLE_TAGS_START" 등등)를 리턴합니다. */

export function handle_filteredTodosAndReviews_Start() {
  return {
    type: HANDLE_FILTERED_TODOS_AND_REVIEWS_STARTS,
  };
}

export function handle_filteredTodosAndReviews_Success(filteredTodosAndReviews: number) {
  return {
    type: HANDLE_FILTERED_TODOS_AND_REVIEWS_SUCCESS,
    filteredTodosAndReviews,
  };
}

export function handle_filteredTodosAndReviews_Failure() {
  return {
    type: HANDLE_FILTERED_TODOS_AND_REVIEWS_FAILURE,
  };
}

interface filteredTodosAndReviewsType {
  id: number;
  tagColor: string;
  tagName: string;
  todoTags: Array<{
    todo: {
      id: number;
      scheduleDate: string;
      title: string;
    };
  }>;
  reviewTags: Array<{
    review: {
      id: number;
      title: string;
      context: string;
      imageUrl: string;
      scheduleDate: string;
      scheduleTime: string;
    };
  }>;
}

/* 3. initialState 및 reducer 함수 */
interface initialStateI {
  status: string;
  filteredTodosAndReviews: Array<filteredTodosAndReviewsType>;
}

const initialState: initialStateI = {
  status: 'INIT',
  filteredTodosAndReviews: [],
};

/* reducer func*/

interface actionType {
  type: string;
  filteredTodosAndReviews: Array<filteredTodosAndReviewsType>;
}

function handlefilteredTodosAndReviews(state = initialState, action: actionType) {
  switch (action.type) {
    case HANDLE_FILTERED_TODOS_AND_REVIEWS_STARTS:
      return {
        ...state,
        status: 'START',
      };
    case HANDLE_FILTERED_TODOS_AND_REVIEWS_SUCCESS:
      return {
        ...state,
        status: 'SUCCESS',
        filteredTodosAndReviews: action.filteredTodosAndReviews,
      };
    case HANDLE_FILTERED_TODOS_AND_REVIEWS_FAILURE:
      return {
        ...state,
        status: 'FAILURE',
      };

    default:
      return state;
  }
}

export default handlefilteredTodosAndReviews;
