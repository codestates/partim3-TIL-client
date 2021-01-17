import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { RootState } from '../modules';

import { calendarStart, calendarSuccess, calendarFailure } from '../modules/calendarM';
import { handleTagsStart, handleTagsSuccess_Get, handleTagsFailure } from '../modules/handleTags';
import {
  getCalendarsStart,
  getCalendarsSuccess,
  getCalendarsFailure,
} from '../modules/getAllCalendars';
import { handleTodaySuccess } from '../modules/handleToday';
import { mypageCalendarMessageSuccess } from '../modules/mypageCalendarMessagesM';
import getToday from '../componentsNew/utils/todayF';
import CalendarDay from '../componentsNew/pages/CalendarDay';
import REACT_APP_URL from '../config';

// import date from '../componentsNew/utils/todayF';

interface todayType {
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
}

function CalendarDayContainer() {
  //userId,오늘 날짜를 서버로 보내야함
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { sidebar } = useSelector((state: RootState) => state.sideBarM);
  const { today } = useSelector((state: RootState) => state.handleToday);

  const [newPosted, setNewPosted] = useState(false);
  const [newCalPosted, setNewCalPosted] = useState(false);
  const [calDeleted, setCalDeleted] = useState(false);
  const [todoDeletedOrUpdated, setTodoDeletedOrUpdated] = useState(false);

  const dispatch = useDispatch();

  if (today.year === null) {
    dispatch(handleTodaySuccess(getToday()));
  }

  const history = useHistory();

  if (!currentUser) {
    alert('로그인하셔야 달력 페이지에 접속하실 수 있습니다.');
    history.push('../login');
  }

  // toast 알람을 위해, 캘린더 공유를 위한 message를 여기서 get 요청
  const getCalShareMessage = () => {
    axios
      .get(`${REACT_APP_URL}/user/message`, {
        params: {
          userId: currentUser,
        },
        withCredentials: true,
      })
      .then(res => {
        const { myMessages } = res.data;
        console.log({ myMessages });
        //state를 쓰니 무한 반복됨. shareCalMessage 변수명을 같게 해주어서 무한 반복되는 것이었음.
        //캘린더의 상태값을 다양한 곳에서 필요로 할 것 같아서 리덕스 사용
        dispatch(mypageCalendarMessageSuccess(myMessages));
      })
      .catch(err => {
        //메세지가 없는 경우
        console.log(err);
      });
  };

  getCalShareMessage();

  const sendToday = (id: number | null, today: todayType) => {
    dispatch(calendarStart());
    dispatch(getCalendarsStart());

    let TodayForAxios = {
      year: today.year,
      month: today.month,
      day: today.day,
    };

    return axios
      .get(`${REACT_APP_URL}/calendar/day`, {
        params: {
          userId: id,
          // date: JSON.stringify(date),
          // date: JSON.stringify(TodayForAxios),
          date: TodayForAxios,
        },
        withCredentials: true,
      })
      .then(res => {
        let { myCalendars, shareCalendars } = res.data;
        dispatch(getCalendarsSuccess(myCalendars, shareCalendars));

        // myCalendars에 포함된 todo/review 처리
        let resTodo = new Array();

        for (let i in myCalendars) {
          let calendarId = myCalendars[i].id;
          let calendarColor = myCalendars[i].color;
          for (let ii = 0; ii < myCalendars[i].todos.length; ii++) {
            myCalendars[i].todos[ii]['calendarId'] = calendarId;
            myCalendars[i].todos[ii]['calendarColor'] = calendarColor;
          }
          resTodo = resTodo.concat(myCalendars[i].todos);
        }

        for (let i in shareCalendars) {
          let calendarId = shareCalendars[i].id;
          let calendarColor = shareCalendars[i].color;
          for (let ii = 0; ii < shareCalendars[i].todos.length; ii++) {
            shareCalendars[i].todos[ii]['calendarId'] = calendarId;
            shareCalendars[i].todos[ii]['calendarColor'] = calendarColor;
          }
          resTodo = resTodo.concat(shareCalendars[i].todos);
        }

        let resReviews = new Array();

        for (let j in myCalendars) {
          let calendarId = myCalendars[j].id;
          let calendarColor = myCalendars[j].color;
          for (let jj = 0; jj < myCalendars[j].reviews.length; jj++) {
            let shortcut = myCalendars[j].reviews[jj];
            shortcut['calendarId'] = calendarId;
            shortcut['calendarColor'] = calendarColor;
            shortcut['scheduleDate'] = JSON.parse(shortcut['scheduleDate']);
            shortcut['scheduleTime'] = JSON.parse(shortcut['scheduleTime']);
          }
          resReviews = resReviews.concat(myCalendars[j].reviews);
        }

        for (let j in shareCalendars) {
          let calendarId = shareCalendars[j].id;
          let calendarColor = shareCalendars[j].color;
          for (let jj = 0; jj < shareCalendars[j].reviews.length; jj++) {
            let shortcut = shareCalendars[j].reviews[jj];
            shortcut['calendarId'] = calendarId;
            shortcut['calendarColor'] = calendarColor;
            shortcut['scheduleDate'] = JSON.parse(shortcut['scheduleDate']);
            shortcut['scheduleTime'] = JSON.parse(shortcut['scheduleTime']);
          }
          resReviews = resReviews.concat(shareCalendars[j].reviews);
        }

        // (myCalendars, shareCalendars 처리하는 부분은 별도 함수로 빼놓는게 낫지 않나?)

        dispatch(calendarSuccess(resTodo, resReviews));
        getAllTags();
      })
      .catch(err => {
        console.log(err);
        dispatch(calendarFailure());
        dispatch(getCalendarsFailure());
      });
  };

  const getAllTags = () => {
    dispatch(handleTagsStart());

    axios
      .get(`${REACT_APP_URL}/calendar/tags`, {
        params: {
          userId: currentUser,
        },
        withCredentials: true,
      })
      .then(res => {
        const resTags = res.data.myTags;
        dispatch(handleTagsSuccess_Get(resTags));
      })
      .catch(err => {
        console.log({ err });
        dispatch(handleTagsFailure());
      });
  };

  useEffect(() => {
    if (typeof currentUser === 'number') {
      sendToday(currentUser, today);
      setNewPosted(false);
      setNewCalPosted(false);
      setCalDeleted(false);
      setTodoDeletedOrUpdated(false);
    }
  }, [currentUser, today, newPosted, newCalPosted, calDeleted, todoDeletedOrUpdated]);

  // console.log('calsidebar', sidebar);
  // 구글 캘린더의 경우 사이드바의 너비를 항상 고정시킴. 이 방식대로 진행.
  // 아주 작은 화면일 때는 사이드바의 불편함을 감수.
  // console.log(today);

  return (
    <CalendarDay
      sidebar={sidebar}
      today={today}
      setNewPosted={setNewPosted}
      setNewCalPosted={setNewCalPosted}
      setCalDeleted={setCalDeleted}
      setTodoDeletedOrUpdated={setTodoDeletedOrUpdated}
    />
  );
}

export default CalendarDayContainer;
