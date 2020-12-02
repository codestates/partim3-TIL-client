import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../../modules';

export default function SidebarMyCal() {
  // id, name, color
  // let nickName: string = 'a';
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const [calName, setCalName] = useState('');
  let calName1: string = 'calendar name';
  let calName2: string = 'calendar name2';
  let calName3: string = 'calendar name3';

  const checked = (e: any) => {
    axios
      .get(`http://localhost:5000/calendar`, {
        params: {
          userId: currentUser,
        },
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [addCalname, setAddCalname] = useState('');
  const [addCalcolor, setAddCalcolor] = useState('');

  const setAddCalName = (e: any) => {
    setAddCalname(e.target.value);
  };
  const setAddCalColor = (e: any) => {
    setAddCalcolor(e.target.value);
  };

  const addCalendar = () => {
    addCalendarAxios(addCalname, addCalcolor);
  };

  const addCalendarAxios = (addCalname: string, addCalcolor: string) => {
    axios
      .post(
        `http://localhost:5000/calendar/addcalendar`,
        {
          currentUser,
          addCalname,
          addCalcolor,
        },
        { withCredentials: true },
      )
      .then(res => {
        // history.push('/calendar/day');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>내캘린더</div>
      <div>
        <input placeholder="캘린더 이름" onChange={setAddCalName}></input>
        <input placeholder="캘린더 색깔" onChange={setAddCalColor}></input>
        <button onClick={addCalendar}>새캘린더 만들기</button>
      </div>
      <div>
        <input type="checkbox" onClick={checked} name={calName1} value={calName1}></input>
        {calName1}
      </div>
      <div>
        <input type="checkbox" onClick={checked} name={calName2} value={calName2}></input>
        {calName2}
      </div>
      <div>
        <input type="checkbox" onClick={checked} name={calName3} value={calName3}></input>
        {calName3}
      </div>
    </div>
  );
}
