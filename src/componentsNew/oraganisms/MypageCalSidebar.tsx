import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../modules';
import { calendarSelected } from '../../modules/selectedCalM';

import MypageCalendar from '../pages/MypageCalendar';

export default function MypageCalSidebar({ myCalendar, shareCalendar, handleGetMessage }: any) {
  //curComponent가 mypageCalendar일때 캘린더들의 리스트를 랜더링

  //동기적으로 처리해주기 위해서 useEffect사용.

  let myCalList = myCalendar.map((el: any) => {
    return (
      <AddCal key={el.id}>
        <Link
          to={`/mypage/calendar/mycal/${el.name}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <CalendarList>
            <ColorCircle color={el.color}></ColorCircle>
            <div>{el.name}</div>
          </CalendarList>
        </Link>
      </AddCal>
    );
  });

  let shareCalList = shareCalendar.map((el: any) => {
    return (
      <AddCal key={el.id}>
        <Link
          to={`/mypage/calendar/share/${el.name}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <CalendarList key={el.id}>
            <ColorCircle color={el.color}></ColorCircle>
            <div>{el.name}</div>
          </CalendarList>
        </Link>
      </AddCal>
    );
  });

  return (
    <CalendarContainer>
      <AddCal>
        <Link to={`/mypage/calendar`} style={{ textDecoration: 'none', color: 'black' }}>
          캘린더 추가
        </Link>
      </AddCal>
      <div>내 캘린더</div>
      <div>{myCalList}</div>
      <div>공유받은 캘린더</div>
      <div>{shareCalList}</div>
    </CalendarContainer>
  );
}

// 유저 권한 설정 드롭박스 : 캘린더 보기 / 보기 & 편집/ 보기 & 편집 & 공유
// 삭제 권한은 오너에게만 있음.
// 삭제할 때 뭔가를 입력하게 하면 좋을 듯. 이 캘린더를 진짜로 삭제하겠습니다. 정신 차림용 문구
//캘린더리스트 랜더링
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5vw;
`;

const CalendarList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2px;
`;

const ColorCircle = styled.div<{ color?: string }>`
  margin-right: 3px;
  text-align: center;
  height: 20px;
  width: 20px;
  background-color: ${props => props.color};
  border-radius: 50%;
  display: inline-block;
`;

//나중에 픽셀로 고정으로 잡을 것.
const AddCal = styled.div`
  &:hover {
    margin-left: -0.5vw;
    padding-left: 0.5vw;
    background-color: #f0f2f1;
    color: black;
    border-radius: 0 10px 10px 0;
  }
`;
