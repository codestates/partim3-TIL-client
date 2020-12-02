import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { RootState } from '../modules';

import { calendarStart, calendarSuccess, calendarFailure } from '../modules/calendarM';
import { handleTodaySuccess } from '../modules/handleToday';
import getToday from '../componentsNew/utils/todayF';
import CalendarDay from '../componentsNew/pages/CalendarDay';

// import date from '../componentsNew/utils/todayF';

function CalendarDayContainer() {
  //userId,오늘 날짜를 서버로 보내야함
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { sidebar } = useSelector((state: RootState) => state.sideBarM);
  const { today } = useSelector((state: RootState) => state.handleToday);

  // let today = getToday();
  // 오늘 날짜를 만들어서 today로 저장

  // 저장한 today값으로 dispatch가 이루어짐.
  // 로그인 하고 나서는 날짜를 오늘 날짜로 세팅해서 보내줌.
  // 캘린더 내에서 이 값을 변경하고 싶을때
  const dispatch = useDispatch();

  if (today.year === null) {
    dispatch(handleTodaySuccess(getToday()));
  }

  const history = useHistory();

  if (!currentUser) {
    alert('로그인하셔야 달력 페이지에 접속하실 수 있습니다.');
    history.push('../login');
  }

  const sendToday = (id: number | null, today: object) => {
    dispatch(calendarStart());

    return axios
      .get(`http://localhost:5000/calendar/day`, {
        params: {
          userId: id,
          // date: JSON.stringify(date),
          date: today,
        },
        withCredentials: true,
      })
      .then(res => {
        const { todos, reviews } = res.data;
        dispatch(calendarSuccess(todos, reviews));
      })
      .catch(err => {
        console.log(err);
        dispatch(calendarFailure());
      });
  };

  useEffect(() => {
    if (typeof currentUser === 'number') {
      sendToday(currentUser, today);
    }
  }, [currentUser, today]);

  // console.log('calsidebar', sidebar);
  // 구글 캘린더의 경우 사이드바의 너비를 항상 고정시킴. 이 방식대로 진행.
  // 아주 작은 화면일 때는 사이드바의 불편함을 감수.

  return <CalendarDay sidebar={sidebar} today={today} />;
}

export default CalendarDayContainer;
