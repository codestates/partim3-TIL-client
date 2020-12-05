import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { RootState } from '../../../modules';
import { MakeNewCal, RenderCalendars } from './sidebarCalUnits';

interface SidebarMyCalProps {
  setNewCalPosted: (trueOrFalse: boolean) => void;
}

export default function SidebarMyCal({ setNewCalPosted }: SidebarMyCalProps) {
  // id, name, color
  // let nickName: string = 'a';
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const [newCalname, setNewCalname] = useState('');
  const [newCalcolor, setNewCalcolor] = useState('#0693e3');
  const { myCalendar } = useSelector((state: RootState) => state.getAllCalendars.allCalendars);

  const checked = (e: any) => {
    axios
      .get(`http://localhost:5000/calendar`, {
        params: {
          userId: currentUser,
        },
        withCredentials: true,
      })
      .then(res => {
        console.log('체크 get 요청 : ', res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleNewCalName = (
    e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    setNewCalname(e.target.value);
  };
  const handleNewCalColor = (color: string) => {
    // console.log({ newCalcolor });
    setNewCalcolor(color);
  };

  const addCalendar = () => {
    axios
      .post(
        `http://localhost:5000/calendar/addcalendar`,
        {
          userId: currentUser,
          name: newCalname,
          color: newCalcolor,
        },
        { withCredentials: true },
      )
      .then(res => {
        // history.push('/calendar/day');
        setNewCalPosted(true);
        // setNewCalname('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 로그아웃되면 캘린더색깔선택 부분을 초기화하려고 만든 코드인데, 새로고침만 해도 색깔이 알아서 초기화되고 있다.
  // 새로고침 없이 로그아웃-로그인해도 초기화되긴 하는데, alert의 영향일 수 있으니 코드는 일단 남겨둠.
  // useEffect(() => {
  //   if (currentUser === null) {
  //     setNewCalcolor('#0693E3');
  //   }
  // }, [currentUser]);

  return (
    <SidebarMyCalWrap>
      <div>내 캘린더</div>
      <MakeNewCal
        handleNewCalName={handleNewCalName}
        handleNewCalColor={handleNewCalColor}
        addCalendar={addCalendar}
        currentColor={newCalcolor}
      />
      <RenderCalendars checked={checked} calendars={myCalendar} />
    </SidebarMyCalWrap>
  );
}

const SidebarMyCalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
