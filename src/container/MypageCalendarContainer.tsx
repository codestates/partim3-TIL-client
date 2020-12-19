import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MypageCalendar from '../componentsNew/pages/MypageCalendar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { MypageHeaderAndSidebar } from '../componentsNew/oraganisms';
import axios from 'axios';
import REACT_APP_URL from '../config';
import getToday from '../componentsNew/utils/todayF';
import {
  getCalendarsStart,
  getCalendarsSuccess,
  getCalendarsFailure,
} from '../modules/getAllCalendars';

export default function MypageCalendarContainer({ match }: any) {
  const history = useHistory();
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);

  let paramName = match.params.calName;
  const [calName, setCalName] = useState(paramName);

  const calNameUpdate = (newValue: string) => {
    return axios
      .put(`${REACT_APP_URL}/calendar/updatecalender`, {
        userId: currentUser,
        calendarId: curCalId,
        name: newValue,
        color: curCalColor,
        withCredentials: true,
      })
      .then(async res => {
        console.log('update success');
      })
      .catch(err => console.log(err));
  };
  const handleNameChange = (newValue: any) => {
    setCalName(newValue);
  };

  //캘린더 컬러 및 id에 관한 코드
  const { myCalendar, shareCalendar } = useSelector(
    (state: RootState) => state.getAllCalendars.allCalendars,
  );

  const allCalendars = myCalendar.concat(shareCalendar);
  const findColor = () => {
    for (let i of allCalendars) {
      if (i.name === paramName) {
        return i.color;
      }
    }
    return 'red';
  };
  const findId = () => {
    for (let i of allCalendars) {
      if (i.name === paramName) {
        return i.id;
      }
    }
    return 0;
  };

  let curCalColor = findColor();
  let curCalId = findId();

  const [newCalcolor, setNewCalcolor] = useState(curCalColor);

  const handleNewCalColor = (color: string) => {
    setNewCalcolor(color);
  };

  const calColorUpdate = () => {
    return axios
      .put(`${REACT_APP_URL}/calendar/updatecalender`, {
        userId: currentUser,
        calendarId: curCalId,
        name: paramName,
        color: newCalcolor,
        withCredentials: true,
      })
      .then(async res => {
        console.log('update color success');
      })
      .catch(err => console.log(err));
  };

  const dispatch = useDispatch();
  const getUpdatedCal = () => {
    let TodayForAxios = {
      year: getToday().year,
      month: getToday().month,
      day: getToday().day,
    };
    return axios
      .get(`${REACT_APP_URL}/calendar/day`, {
        params: { userId: currentUser, date: TodayForAxios },
        withCredentials: true,
      })
      .then(async res => {
        let { myCalendars, shareCalendars } = res.data;
        await dispatch(getCalendarsSuccess(myCalendars, shareCalendars));
        console.log('update redux success');
      })
      .catch(err => console.log(err));
  };

  let childComponent = (
    <MypageCalendar
      curCal={calName}
      curCalColor={newCalcolor}
      handleNewName={handleNameChange}
      handleNewCalColor={handleNewCalColor}
    ></MypageCalendar>
  );

  useEffect(() => {
    const orderF = async () => {
      console.log('6번 :', calName, 'container calName use');
      await calNameUpdate(calName);
      await getUpdatedCal();
      await history.push(`/mypage/calendar/${calName}`);
    };
    orderF();
  }, [calName]);

  useEffect(() => {
    const orderF = async () => {
      await calColorUpdate();
      await getUpdatedCal();
    };
    orderF();
  }, [newCalcolor]);

  return <MypageHeaderAndSidebar childComponent={childComponent}></MypageHeaderAndSidebar>;
}
