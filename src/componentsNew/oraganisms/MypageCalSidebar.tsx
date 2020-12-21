import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../modules';
import { calendarSelected } from '../../modules/selectedCalM';

import MypageCalendar from '../pages/MypageCalendar';

export default function MypageCalSidebar({ changeCalComponent, myCalendar, shareCalendar }: any) {
  //curComponent가 mypageCalendar일때 캘린더들의 리스트를 랜더링
  const history = useHistory();

  //동기적으로 처리해주기 위해서 useEffect사용.

  let myCalList = myCalendar.map((el: any) => {
    return (
      <Link
        to={`/mypage/calendar/${el.name}`}
        style={{ textDecoration: 'none', color: 'black' }}
        key={el.id}
      >
        <CalendarList>
          <ColorCircle color={el.color}></ColorCircle>
          <div>{el.name}</div>
        </CalendarList>
      </Link>
    );
  });

  let shareCalList = shareCalendar.map((el: any) => {
    return (
      <Link
        to={`/mypage/calendar/${el.name}`}
        style={{ textDecoration: 'none', color: 'black' }}
        key={el.id}
      >
        <CalendarList key={el.id}>
          <ColorCircle></ColorCircle>
          <div>{el.name}</div>
        </CalendarList>
      </Link>
    );
  });

  // const changeCurCalName = (e: any) => {
  //   setCurCal(e);
  // };

  //param을 바로 받아오기 불가능.
  // useEffect(() => {
  //   if (paramName !== 'unClicked') {
  //     console.log(match.params);
  //   }
  // }, [paramName]);

  return (
    <CalendarContainer>
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

//캘린더 공유 페이지

const CalendarShare = styled.div`
  flex: 1;
`;

const CalendarShareTitle = styled.div`
  font-weight: bold;
`;
