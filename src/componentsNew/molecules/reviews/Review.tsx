import React from 'react';
import styled from 'styled-components';
import { BiGame } from 'react-icons/bi';
import { Container } from 'react-bootstrap';

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
}

export default function Review({
  id,
  title,
  context,
  imageUrl,
  scheduleDate,
  scheduleTime,
}: Props) {
  console.log(context.length);
  // style={{ flex: 8, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
  return (
    <Box>
      {/* <TimeLine></TimeLine> */}

      <ReviewBox>
        <BiGame
          style={{
            marginLeft: '5px',
            zIndex: 100,
            background: 'red',
            position: 'absolute',
            margin: '5px',
          }}
        ></BiGame>
        <TimeLine>
          <TimeAndTitle>
            <Time>{scheduleTime.hour + ':' + scheduleTime.min}</Time>
            <Title>{title}</Title>
          </TimeAndTitle>
          <ContexAndLine show={context.length === 0 ? false : true}>
            <Context>{context}</Context>
          </ContexAndLine>
        </TimeLine>
      </ReviewBox>
    </Box>
  );
}
const Box = styled.div`
  width: 82vw;
`;
const TimeLine = styled.div`
  background: white;
  margin-left: 10px;
  border-left: 2px solid black;
  z-index: 1;
`;

const ReviewBox = styled.div`
  width: 85vw;
  display: flex;
  flex-direction: column;
`;

const TimeAndTitle = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
`;

const Time = styled.div`
  width: 40px;
  position: block;
  text-align: center;
`;
const Title = styled.div`
  flex: 5;
  font-weight: bold;
  width: 5vw;
  display: flex;
  flex-direction: column;
`;
const ContexAndLine = styled.div<{ show?: boolean }>`
  display: ${props => (props.show ? 'flex' : 'none')};
`;
const Context = styled.div`
  flex: 0.95;
  margin-left: 2vw;
  margin-right: 2vw;
  border: 1px solid gray;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
`;
