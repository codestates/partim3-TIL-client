import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import sendReview from '../utils/sendReviewF';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import getToday from '../../componentsNew/utils/todayF';
import { useForm } from 'react-hook-form';

export default function BigModal(props: any) {
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { myCalendar } = useSelector((state: RootState) => state.getAllCalendars.allCalendars);

  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [hour, setHour] = useState(getToday().hour);
  const [min, setMin] = useState(getToday().min);

  const [selectedCalendar, setSelectedCalendar] = useState(NaN);
  const { register, handleSubmit, reset, errors } = useForm();
  // 나중에 div테그만 랜더링하게 바꾸고 싶을때. ( 구글 캘린더 처럼 )
  // const [timeChange, settimeChange] = React.useState(false);

  let defaultmyCalendersForSelectOptions;
  let myCalendersForSelectOptions;

  if (myCalendar === []) {
    defaultmyCalendersForSelectOptions = '';
    myCalendersForSelectOptions = <option>먼저 캘린더를 만들어 주세요.</option>;
  } else {
    defaultmyCalendersForSelectOptions = <option>캘린더를 선택해 주세요.</option>;
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

  const [errShow, setShow] = useState(false);

  // 에러를 2번 반복해야 에러메세지가 사라짐.
  // 에러가 한번 일어난 후, 전부 지우면 에러메세지를 지워주기.
  const handleHour = (e: any) => {
    //React.ChangeEvent<HTMLInputElement>
    // const regex = /^[0-9]$/;
    // console.log(e.target.value);
    // if (regex.test(e.target.value)) {
    //   console.log('regex');
    // }

    let newhour = Number(e.target.value);

    if (isNaN(newhour)) {
      // 정규표현식을 해주지 않아도 텍스트 입력은 여기서 방어가 됨.
      console.log(newhour);
      setShow(true);
      return;
    }
    if (newhour > 24 || newhour < 0) {
      // clearInput();
      // 잘못된 시간은 아예 입력 방지
      setShow(true);
      return;
    } else {
      setShow(false);
      setHour(newhour);
    }
  };
  // 서버로 보낼때 한번 검증이 필요함.
  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMin = Number(e.target.value);
    if (!newMin && newMin !== 0) {
      setShow(!errShow);
    }
    if (newMin > 59 || newMin < 0) {
      setShow(!errShow);
    } else {
      setMin(newMin);
    }
  };

  const handleCloseBtn = () => {
    setShow(false);
    setHour(0);
    props.onHide();
  };

  // useEffect(() => {
  //   setHour(String(getToday().hour));
  // }, []);

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const contextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(e.target.value);
  };

  const [divHour, setDivHour] = useState(true);
  const [inputHour, setInputHour] = useState(false);
  const [divMin, setDivMin] = useState(true);
  const [inputMin, setInputMin] = useState(false);

  const hideInput = () => {
    // 범위는 나중에 고민해 봐야할듯 하다..
    reset();
    setDivHour(true);
    setInputHour(false);
    setDivMin(true);
    setInputMin(false);
  };
  const renderInputHour = () => {
    console.log('hi');
    reset();
    setDivHour(false);
    setInputHour(true);
  };

  const renderInputMin = () => {
    console.log('ho');
    setDivMin(false);
    setInputMin(true);
  };

  return (
    <ModalMask show={props.show}>
      <Modal>
        <CloseBtnAndErrModal onClick={hideInput}>
          <SpaceErr></SpaceErr>
          <ModalAndArrow>
            <ErrModal show={errShow}>잘못된 시간</ErrModal>
            {/* <Tri></Tri> */}
          </ModalAndArrow>
          <SpaceErr2></SpaceErr2>
          <CloseBtn onClick={handleCloseBtn}>X</CloseBtn>
        </CloseBtnAndErrModal>

        <TimeHeader>
          <MonthAndDay>{`${getToday().month}월 ${getToday().day}일`}</MonthAndDay>
          <HourInput
            ref={register}
            value={`${getToday().hour}`}
            onClick={renderInputHour}
            show={divHour}
            hover={'yellowgreen'}
            readOnly
          ></HourInput>
          <HourInput ref={register} show={inputHour} onChange={handleHour}></HourInput>
          <SpaceTime>시</SpaceTime>
          <MinInput
            value={`${getToday().min}`}
            onClick={renderInputMin}
            show={divMin}
            hover={'yellowgreen'}
            readOnly
          ></MinInput>
          <MinInput show={inputMin} onChange={handleMin}></MinInput>
          <span>분</span>
          <Space></Space>
          <SelectCal onChange={handleSelectOption}>
            {defaultmyCalendersForSelectOptions}
            {myCalendersForSelectOptions}
          </SelectCal>
          <Space></Space>
        </TimeHeader>
        <TitleInput placeholder="제목" onChange={titleChange}></TitleInput>
        <ContextArea
          placeholder="쓰고 싶은 내용을 자유롭게 남겨주세요"
          onChange={contextChange}
        ></ContextArea>
        <div>
          <span>Add tags!</span>
          <SubmitBtn
            onClick={async () => {
              const today = getToday();
              const userId = currentUser;
              const scheduleDate = {
                year: today.year,
                month: today.month,
                day: today.day,
              };
              const scheduleTime = { hour: hour, min: min };
              const imageUrl = 'www.';
              const calendarId = selectedCalendar;
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
        </div>
      </Modal>
    </ModalMask>
  );
}

const CloseBtnAndErrModal = styled.div`
  flex: 1;
  width: 80vw;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const ErrModal = styled.span<{ show?: boolean }>`
  width: 13vw;
  border-bottom: 2px solid red;
  height: 5vh;
  padding-top: 3px;
  padding-left: 5px;
  text-align: left;
  background: black;
  color: white;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
`;

const ModalAndArrow = styled.span`
  width: 10vw;
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 30px;

  background: yellowgreen;
  color: white;
`;

const SpaceErr = styled.span`
  width: 3vw;
`;
const SpaceErr2 = styled.span`
  flex: 1;
`;

const ModalMask = styled.div<{ show?: boolean }>`
  display: ${props => (props.show ? 'grid' : 'none')};
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
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
  position: absolute;
  z-index: 500;
`;
const CloseBtn = styled.button`
  flex: 0.1;
  background: 'pink';
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
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
const SubmitBtn = styled.button`
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
  justify-self: flex-end;
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
const HourInput = styled.input<{ show?: boolean; hover?: string }>`
  display: ${props => (props.show ? 'block' : 'none')};
  background: ${props => (props.hover ? props.hover : 'white')};
  width: 30px;
  border: 0px;
  border-bottom: 1px solid green;
  outline: none;
  ::placeholder {
    color: black;
  }
`;
const MinInput = styled.input<{ show?: boolean; hover?: string }>`
  display: ${props => (props.show ? 'block' : 'none')};
  background: ${props => (props.hover ? props.hover : 'white')};
  width: 30px;
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
