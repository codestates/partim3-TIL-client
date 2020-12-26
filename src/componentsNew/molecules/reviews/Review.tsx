import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';

import { RootState } from '../../../modules';
import { useSelector, useDispatch } from 'react-redux';
// VscCircleOutline

//형태만 만든다고 하면 어떤 모양일까?

interface scheduleDateI {
  year: number;
  month: number;
  day: number;
}

interface scheduleTimeI {
  hour: number;
  min: number;
}
interface Props {
  title: string;
  context: string;
  imageUrl: string | null;
  scheduleDate: scheduleDateI;
  scheduleTime: scheduleTimeI;
  id: number;
  calendarId: number;
  handleDel: any;
  hadleUpdate: any;
}

export default function Review({
  id,
  title,
  context,
  imageUrl,
  scheduleDate,
  scheduleTime,
  calendarId,
  handleDel,
  hadleUpdate,
}: Props) {
  const handleDelReview = () => {
    handleDel(id, calendarId);
  };

  let tags: any = [];
  const hadleUpdateReview = () => {
    hadleUpdate(id, calendarId, scheduleTime, title, context, imageUrl, tags);
  };

  return (
    <Box>
      <ReviewBox>
        <FaCheckCircle
          style={{
            marginLeft: '5px',
            zIndex: 100,
            background: 'white',
            position: 'absolute',
            margin: '5px',
          }}
        ></FaCheckCircle>
        <TimeLine>
          <TimeAndTitle>
            <Time>{scheduleTime.hour + ':' + scheduleTime.min}</Time>
            <Title>{title}</Title>
            <Del onClick={handleDelReview}>삭제</Del>
          </TimeAndTitle>
          <ContexAndLine show={context.length === 0 ? false : true}>
            <Context>{context}</Context>
          </ContexAndLine>
          <ReviewSetting>{/* <Edit onClick={hadleUpdateReview}>수정</Edit> */}</ReviewSetting>
        </TimeLine>
      </ReviewBox>
    </Box>
  );
}
const Box = styled.div``;
const TimeLine = styled.div`
  background: white;
  margin-left: 10px;
  border-left: 2px solid black;
  z-index: 1;
`;

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimeAndTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
`;

const Time = styled.div`
  margin-left: 6px;
  width: 50px;
  position: block;
  text-align: center;
  color: #3c4043;
`;
const Title = styled.div`
  margin-left: 10px;
  font-size: 15px;
  display: flex;
  flex: 3;
  color: black
  flex-direction: column;
`;

const ContexAndLine = styled.div<{ show?: boolean }>`
  display: ${props => (props.show ? 'flex' : 'none')};
`;
const Context = styled.div`
  margin-top: 3px;
  margin-bottom: 3px;
  flex: 1;
  margin-left: 15px;
  margin-right: 2vw;
  border: 1px solid gray;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
`;

const ReviewSetting = styled.div`
  margin-left: 10px;
`;

const Edit = styled.span`
  text-align: right-end;
  margin-right: 10px;
  margin-left: 72vw;
  &:hover {
    color: #1a73e8;
  }
`;
const Del = styled.div`
  flex: 0.12;
  text-align: right-end;
  margin-right: 10px;
  &:hover {
    color: red;
  }
`;
