import React, { useState, useEffect } from 'react';
import { data } from '../../Data';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import calendarDay, {
  calendarStart,
  calendarSuccess,
  calendarFailure,
} from '../../modules/calendarM';
import { RootState } from '../../modules';

export default function CalendarDay() {
  //userId,오늘 날짜를 서버로 보내야함
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  const hour = today.getHours();
  const min = today.getMinutes();

  const date = {
    year,
    month,
    day,
    hour,
    min,
  };

  const [todos, setTodos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => {
    state.calendarDay;
  });

  console.log(state);

  const sendToday = (id: number) => {
    // type todos = {todoTitle: string, scheduleTime: string}

    // const today: string = Date();

    dispatch(calendarStart());
    //현재 서버가 없으므로 일단 여기서 data를 받은셈 치고 작성.

    // dispatch(calendarSuccess(data.todos, data.reviews));

    return axios
      .get(`http://localhost:5000/calendar/day`, {
        params: {
          userId: id,
          date: '2020-11-12',
        },
        withCredentials: true,
      })
      .then(res => {
        //서버에서는 data를 리턴
        //이 데이터들을 todo와 review로 보내준다.
        //일단은 review만 작성
        //res는 object
        //todos와 review를 따로 분기
        console.log(res.data);
        const { todos, reviews } = res.data;
        console.log();
        dispatch(calendarSuccess(todos, reviews));
      })
      .catch(err => {
        console.log(err);
        dispatch(calendarFailure());
      });
  };

  //get 요청을 하면 랜더링이 한번 실행됨.
  return (
    <div>
      <div>header</div>
      <div>sidebar</div>
      <div>todos </div>
      <div>review </div>
      <button
        onClick={() => {
          sendToday(1);
        }}
      >
        setting Data
      </button>
    </div>
  );
}
