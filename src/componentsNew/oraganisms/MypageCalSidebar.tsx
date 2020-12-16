import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import styled from 'styled-components';
import MypageCalendar from '../pages/MypageCalendar';

interface propsI {
  goProfile: React.FC;
}

export default function MypageCalSidebar({ goProfile }: any) {
  const [curCal, setCurCal] = useState('curCal');
  // curCal 은 캘린더의 이름.
  const { myCalendar, shareCalendar } = useSelector(
    (state: RootState) => state.getAllCalendars.allCalendars,
  );
  //선택된 캘린더 이름을 받아서 세팅해준 후, 그 이름에 맞는 캘린더 찾기
  //동기 처리가 안된다.
  const allCalendars = myCalendar.concat(shareCalendar);

  const findColor = () => {
    for (let i of allCalendars) {
      if (i.name === curCal) {
        return i.color;
      }
    }
    return 'red';
  };
  const findId = () => {
    for (let i of allCalendars) {
      if (i.name === curCal) {
        return i.id;
      }
    }
    return 0;
  };

  let curCalColor = findColor();
  let curCalId = findId();

  //curComponent가 mypageCalendar일때 캘린더들의 리스트를 랜더링

  const selectCalendar = async (e: any) => {
    setCurCal(e.target.innerHTML);
  };
  let myCalList = myCalendar.map(el => {
    return (
      <CalendarList key={el.name} onClick={selectCalendar}>
        <ColorCircle color={el.color}></ColorCircle>
        <div>{el.name}</div>
      </CalendarList>
    );
  });

  let shareCalList = shareCalendar.map(el => {
    return (
      <CalendarList key={el.id}>
        <ColorCircle></ColorCircle>
        <div>{el.name}</div>
      </CalendarList>
    );
  });

  const changeCurCalName = (e: any) => {
    console.log(e.target);
  };
  useEffect(() => {
    async function test() {
      //페이지가 랜더링 되어 버림 ㅠㅠ
      //basic calendar를 누르면, curCal이 바뀐다.
      //useEffect가 실행된다
      //컴포넌트를 basic calendar를 남은 컴포넌트로 바꾼다.
      // 여기서 동기처리가 되면 참으로 바람직하겠구만.

      if (curCal !== 'curCal') {
        //curCal의 값은 바뀌어서 안쪽으로 들어오지만, 비동기처리 때문에 goProfile은 실행되어 버린다.
        //왜 동기처리가 안될까 심히 슬프다.
        //그냥 컴포넌트 자체를 넣어주면 어떨까.
        //curComponent는 필요없어 보인다.
        //await는 삭제 필요
        await goProfile(
          <MypageCalendar
            curCal={curCal}
            curCalColor={curCalColor}
            curCalId={curCalId}
            changeCurCalName={changeCurCalName}
          ></MypageCalendar>,
        );
      }
    }
    test();
  }, [curCal]);

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
