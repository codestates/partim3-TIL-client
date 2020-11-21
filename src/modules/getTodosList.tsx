/* 1. ActionTypes - getAllTodos */
const GET_TODOS_LIST_START = 'GET_TODOS_LIST_START' as const;
const GET_TODOS_LIST_SUCCESS = 'GET_TODOS_LIST_SUCCESS' as const;
const GET_TODOS_LIST_FAILURE = 'GET_TODOS_LIST_FAILURE' as const;

// 지우는 부분에서는 get 요청을 다시 하면 되니까 이렇게 안해도 되는데,
// 이렇게 하면 get 요청을 다시 할 필요가 없다?
// 그냥 get 다시 하는게 낫지 않나?
// export const QUESTION_REMOVE_START = "QUESTION_REMOVE_START";
// export const QUESTION_REMOVE_SUCCESS = "QUESTION_REMOVE_SUCCESS";
// export const QUESTION_REMOVE_FAILURE = "QUESTION_REMOVE_FAILURE";

/* 2. 액션생성자 함수 : 액션 객체(action 객체의 type 값은 "GET_TODO_LIST_START" 등등)를 리턴합니다. */
export function getTodosListStart() {
  return {
    type: GET_TODOS_LIST_START,
  };
}

// export function getTodoListSuccess(data, isInitial, listType) {
export function getTodosListSuccess(todos: Array<object>) {
  return {
    type: GET_TODOS_LIST_SUCCESS,
    todos,
  };
}

export function getTodosListFailure() {
  return {
    type: GET_TODOS_LIST_FAILURE,
  };
}

/* 3. initialState 및 reducer 함수 */

interface listType {
  status: string;
  todos: Array<object>;
}

interface removeType {
  status: string;
}

interface initialStateType {
  list: listType;
  remove: removeType;
}

const initialState: initialStateType = {
  list: {
    status: 'INIT',
    todos: [],
    // isLast: false,
  },
  remove: {
    status: 'INIT',
    // error: -1,
  },
};

interface actionProps {
  type: string;
  todos: Array<object>; // (string | number)[] 이렇게 해줘도 된다.
}

export default function getTodosList(state = initialState, action: actionProps) {
  switch (action.type) {
    /* get all questions list */
    case GET_TODOS_LIST_START:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'WAITING',
        },
      };
    case GET_TODOS_LIST_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'SUCCESS',
          todos: action.todos,
        },
      };
    case GET_TODOS_LIST_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'FAILURE',
        },
      };

    default:
      return state;
  }
}
