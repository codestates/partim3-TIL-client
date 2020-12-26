import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../modules';
import {
  handleTodayStart,
  handleTodaySuccess,
  handleTodayFailure,
} from '../../modules/handleToday';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styled from 'styled-components';

export default function NaviButton() {
  const dispatch = useDispatch();

  const { today } = useSelector((state: RootState) => state.handleToday);

  const handleToday = (today: object) => {
    dispatch(handleTodayStart());

    dispatch(handleTodaySuccess(today));
  };

  const getNextday = (direction: number) => {
    let { year, month, day, hour, min } = today;

    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentMin = currentTime.getMinutes();

    let nextDay = new Date(year, month - 1, day, currentHour, currentMin);

    let plusOrMinus;

    if (direction === -1) {
      plusOrMinus = nextDay.getDate() - 1;
    } else if (direction === 1) {
      plusOrMinus = nextDay.getDate() + 1;
    }

    nextDay = new Date(
      nextDay.getFullYear(),
      nextDay.getMonth(),
      plusOrMinus,
      nextDay.getHours(),
      nextDay.getMinutes(),
    );

    let shiftedToday = {
      year: nextDay.getFullYear(),
      month: nextDay.getMonth() + 1,
      day: nextDay.getDate(),
      hour: nextDay.getHours(),
      min: nextDay.getMinutes(),
    };

    handleToday(shiftedToday);
  };

  return (
    <ButtonContainer>
      <HoverCircle>
        <FiChevronLeft
          style={{ height: '20px', width: '20px' }}
          onClick={() => getNextday(-1)}
        ></FiChevronLeft>
      </HoverCircle>
      <HoverCircle>
        <FiChevronRight
          style={{ height: '20px', width: '20px' }}
          onClick={() => getNextday(1)}
        ></FiChevronRight>
      </HoverCircle>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: row;
`;

const HoverCircle = styled.div`
  flex: 1;
  margin: 3px;
  width: 20px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover {
    outline: none;
    background-color: #f0f2f1;
    color: black;
  }
`;
