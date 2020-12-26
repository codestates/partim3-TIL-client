import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { RootState } from '../../../modules';
import { MakeNewCal, RenderCalendars } from './sidebarCalUnits';
import {
  handleCheckedCalStart,
  handleCheckedCalSuccess_add,
  handleCheckedCalSuccess_del,
  handleCheckedCalFailure,
} from '../../../modules/handleCheckedCal';
import REACT_APP_URL from '../../../config';

interface SidebarMyCalProps {
  setNewCalPosted: (trueOrFalse: boolean) => void;
  setCalDeleted: (trueOrFalse: boolean) => void;
}

export default function SidebarMyCal({ setNewCalPosted, setCalDeleted }: SidebarMyCalProps) {
  // id, name, color
  // let nickName: string = 'a';
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const [newCalname, setNewCalname] = useState('');
  const [newCalcolor, setNewCalcolor] = useState('#0693e3');
  const { myCalendar } = useSelector((state: RootState) => state.getAllCalendars.allCalendars);
  const { checkedCalArray } = useSelector((state: RootState) => state.handleCheckedCal);

  const dispatch = useDispatch();

  const handleNewCalName = (
    e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    setNewCalname(e.target.value);
  };
  const handleNewCalColor = (color: string) => {
    setNewCalcolor(color);
  };

  const addCalendar = () => {
    if (newCalname === '') {
      alert(`캘린더 이름이 입력되어 있지 않습니다.`);
      return;
    }

    axios
      .post(
        `${REACT_APP_URL}/calendar/addcalendar`,
        {
          userId: currentUser,
          name: newCalname,
          color: newCalcolor,
        },
        { withCredentials: true },
      )
      .then(res => {
        setNewCalPosted(true);
        setNewCalname(''); // state를 정리해 주고,
        (document.querySelector('.MakeNewCal_Input') as HTMLInputElement).value = ''; // 실제 화면에서도 지워준다
      })
      .catch(err => {
        console.log(err);
      });
  };

  const delCalendar = (calID: number) => {
    console.log({ calID });
    if (typeof currentUser !== 'number') {
      alert('로그인 후 시도해 주세요.');
      return;
    }

    return axios
      .delete(`${REACT_APP_URL}/calendar/deletecalendar`, {
        data: {
          userId: currentUser,
          calendarId: calID,
        },
        withCredentials: true,
      })
      .then(res => {
        console.log(`${calID}번 캘린더 삭제 요청의 결과 : `, res.data);
        setCalDeleted(true);
        dispatch(handleCheckedCalSuccess_del(checkedCalArray.indexOf(calID)));
      })
      .catch(err => {
        console.log({ err });
        alert(`${err}`);
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
      <h6 style={{ color: 'white' }}>새 캘린더 추가하기</h6>
      <MakeNewCal
        handleNewCalName={handleNewCalName}
        handleNewCalColor={handleNewCalColor}
        addCalendar={addCalendar}
        currentColor={newCalcolor}
      />
      <MycalTitle>내 캘린더</MycalTitle>
      <RenderCalendars calendars={myCalendar} delCalendar={delCalendar} />
    </SidebarMyCalWrap>
  );
}

const SidebarMyCalWrap = styled.div`
  flex: 1;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

const MycalTitle = styled.h6`
  flex: 1;
  margin-top: 15px;
  color: white;
`;
