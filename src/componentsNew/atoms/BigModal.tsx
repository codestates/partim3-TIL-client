import React, { useState } from 'react';
import styled from 'styled-components';
import sendReview from '../utils/sendReviewF';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import getToday from '../../componentsNew/utils/todayF';

const today = getToday();

export default function BigModal(props: any) {
  type primary = string;
  // const { today } = useSelector((state: RootState) => state.handleToday);
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { myCalendar } = useSelector((state: RootState) => state.getAllCalendars.allCalendars);

  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [hour, setHour] = useState(today.hour);
  const [min, setMin] = useState(today.min);

  const [selectedCalendar, setSelectedCalendar] = useState(myCalendar[0].id); // startDate : Date 객체 상태임
  // 나중에 div테그만 랜더링하게 바꾸고 싶을때. ( 구글 캘린더 처럼 )
  // const [timeChange, settimeChange] = React.useState(false);

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const contextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(e.target.value);
  };

  let myCalendersForSelectOptions;

  if (myCalendar === []) {
    myCalendersForSelectOptions = <option>먼저 캘린더를 만들어 주세요.</option>;
  } else {
    myCalendersForSelectOptions = myCalendar.map(calendar => {
      return (
        <option key={calendar.id} value={calendar.id}>
          {calendar.name}
        </option>
      );
    });
  }

  const handleSelectOption = (
    e: React.ChangeEvent<HTMLSelectElement> & { target: HTMLSelectElement },
  ) => {
    setSelectedCalendar(Number(e.target.value));
  };

  return (
    <ModalMask show={props.show}>
      <Modal>
        <CloseBtn onClick={props.onHide} primary>
          X
        </CloseBtn>
        <TimeHeader>
          <MonthAndDay>{`${today.month}월 ${today.day}일`}</MonthAndDay>
          {/* <Hour>{`${hour}시`}</Hour> */}
          <HourInput></HourInput>
          <SpaceTime>시</SpaceTime>
          <MinInput></MinInput>
          <span>분</span>
          <Space></Space>
          <SelectCal onChange={handleSelectOption}>{myCalendersForSelectOptions}</SelectCal>
          <Space></Space>
        </TimeHeader>
        <TitleInput placeholder="제목" onChange={titleChange}></TitleInput>
        <ContextArea
          placeholder="쓰고 싶은 내용을 자유롭게 남겨주세요"
          onChange={contextChange}
        ></ContextArea>
        <SubmitBtn
          onClick={async () => {
            //리뷰를 작성할 때 해당일자를 선택했을 것이므로.
            //scheduleDate는 today로.
            //나중에 변수 명칭 통일해야 될 것 같다.. 너무 헷갈림.
            const userId = currentUser;
            const scheduleDate = { year: today.year, month: today.month, day: today.day };
            const scheduleTime = { hour: today.hour, min: today.min };
            const imageUrl = 'www.';
            const calendarId = selectedCalendar;
            console.log(calendarId);
            await sendReview(
              userId,
              title,
              context,
              imageUrl,
              scheduleDate,
              scheduleTime,
              calendarId,
            );
            //scheduleTime, calendarId
            // 스케줄데이트(3) / 스케줄타임(2)으로 나눠서 보내야 함
            props.setNewPosted(true);
            props.onHide();
            await setTitle('');
            await setContext('');
          }}
        >
          submit
        </SubmitBtn>
      </Modal>
    </ModalMask>
  );
}
const ModalMask = styled.div<{ show?: boolean }>`
  display: ${props => (props.show ? 'grid' : 'none')};
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  place-items: center;
`;

const Modal = styled.div`
  width: 80vw;
  height: 80vh;
  background-color: yellowgreen;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const CloseBtn = styled.button<{ primary?: boolean }>`
  background: ${props => (props.primary ? 'palevioletred' : 'white')};
  color: ${props => (props.primary ? 'white' : 'palevioletred')};
  flex: 1;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  align-self: flex-end;
`;
const TitleInput = styled.input`
  flex: 1.5;
  width: 75vw;
  height: 5vh;
  border: 0px;
  border-bottom: solid 5px yellowgreen;
  background-color: white;
`;
const ContextArea = styled.textarea`
  flex: 17;
  width: 75vw;
  height: 60vh;
  border: 0;
  border-radius: 3px;
  background-color: white;
`;
const SubmitBtn = styled.button<{ primary?: boolean }>`
  flex: 1;
  width: 100px;
  height: 5vh;
  background: green;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid green;
  border-radius: 3px;
  align-self: flex-end;
`;

const TimeHeader = styled.div`
  flex: 1.5;
  width: 75vw;
  display: flex;
  justify-contents: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;
const Hour = styled.span`
  background: white;
`;
const MonthAndDay = styled.div`
width:70px;
background: yellowgreen
justify-self: flex-start;
`;
const HourInput = styled.input.attrs({
  placeholder: `${today.hour}`,
})`
  width: 30px;
  background: yellowgreen;
  border: 0px;
  border-bottom: 1px solid green;
  outline: none;
  ::placeholder {
    color: black;
  }
`;
const MinInput = styled.input.attrs({
  placeholder: `${today.min}`,
})`
  width: 30px;
  background: yellowgreen;
  border: 0px;
  border-bottom: 1px solid green;
  outline: none;
  ::placeholder {
    color: black;
  }
`;
const Space = styled.div`
  width: 10px;
`;

const SpaceTime = styled.div`
  margin-right: 10px;
`;
const SelectCal = styled.select`
  flex: 3;
`;
