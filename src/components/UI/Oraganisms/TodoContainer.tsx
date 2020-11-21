import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { RootState } from '../../../modules';

import {
  getTodosListStart,
  getTodosListSuccess,
  getTodosListFailure,
} from '../../../modules/getTodosList';

export default function TodoContainer() {
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);

  const { todos } = useSelector((state: RootState) => state.getTodosList.list);

  const history = useHistory();
  const dispatch = useDispatch();

  const getTodosLists = (currentUser: number) => {
    dispatch(getTodosListStart());

    return axios
      .get(`http://localhost:5000/users/users/${currentUser}`, {
        withCredentials: true,
      })
      .then(response => {
        let list = response.data;
        dispatch(getTodosListSuccess(list));
      })
      .catch(error => {
        dispatch(getTodosListFailure());
      });
  };

  useEffect(() => {
    if (typeof currentUser === 'number') {
      getTodosLists(currentUser);
    }
  }, []);

  // return 부분은 손도 대지 못함
  return (
    <>
      <div>Todo</div>
      <div>Todo</div>
      <div>Todo</div>
      <div>Todo</div>
      <div>Todo</div>
      <div>Todo</div>
      <div>Todo</div>
      <div>Todo</div>
      <div>Todo</div>
      <div>Todo</div>
    </>
  );
}
