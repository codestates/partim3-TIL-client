import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../modules';
import { calendarSelected } from '../../modules/selectedCalM';

import MypageCalendar from '../pages/MypageCalendar';

export default function MypageCalSidebar({ myCalendar, shareCalendar }: any) {
  //curComponent가 mypageCalendar일때 캘린더들의 리스트를 랜더링

  const history = useHistory();
  //동기적으로 처리해주기 위해서 useEffect사용.

  let myCalList = myCalendar.map((el: any) => {
    return (
      <EachCal
        key={el.id}
        onClick={() => {
          history.push(`/mypage/calendar/mycal/${el.name}`);
        }}
      >
        <CalendarList>
          <ColorCircle color={el.color}></ColorCircle>
          {el.name}
        </CalendarList>
      </EachCal>
    );
  });

  let shareCalList = shareCalendar.map((el: any) => {
    return (
      <EachCal
        key={el.id}
        onClick={() => {
          history.push(`/mypage/calendar/share/${el.name}`);
        }}
      >
        <CalendarList>
          <ColorCircle color={el.color}></ColorCircle>
          {el.name}
        </CalendarList>
      </EachCal>
    );
  });

  return (
    <CalendarContainer>
      <Link to={`/mypage/calendar`} style={{ textDecoration: 'none', color: 'white' }}>
        <AddCal>캘린더 추가</AddCal>
      </Link>
      <div style={{ margin: '10px 0px 0px 5px', fontSize: '18px', color: 'white' }}>내 캘린더</div>
      <div>{myCalList}</div>
      <div style={{ margin: '10px 0px 0px 5px', fontSize: '18px', color: 'white' }}>
        공유받은 캘린더
      </div>
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
  margin-left: 30px;
`;

const CalendarList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2px 10px 2px 70px;
`;

const ColorCircle = styled.div<{ color?: string }>`
  margin-right: 5px;
  text-align: center;
  height: 25px;
  width: 25px;
  background-color: ${props => props.color};
  border-radius: 50%;
  display: inline-block;
`;

//나중에 픽셀로 고정으로 잡을 것.
const AddCal = styled.div`
  margin: 5px 15px 5px -50px;
  padding-left: 50px;
  font-size: 20px;
  color: white;
  &:hover {
    /* margin-left: -0.5vw;
    padding-left: 0.5vw; */
    background-color: #f0f2f1;
    color: black;
    border-radius: 0 10px 10px 0;
  }
`;

const EachCal = styled.div`
  margin: 5px 15px 5px -50px;
  color: white;
  height: 30px;
  display: flex;
  &:hover {
    /* margin-left: -0.5vw;
    padding-left: 0.5vw; */
    background-color: #f0f2f1;
    color: black;
    border-radius: 0 10px 10px 0;
  }
`;
