import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../modules';
import {
  handleTodayStart,
  handleTodaySuccess,
  handleTodayFailure,
} from '../../modules/handleToday';

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
    <>
      <LeftAndRightNaviButton onClick={() => getNextday(-1)}>left</LeftAndRightNaviButton>
      <LeftAndRightNaviButton onClick={() => getNextday(1)}>right</LeftAndRightNaviButton>
    </>
  );
}

const LeftAndRightNaviButton = styled.button`
  width: 60px;
  height: 40px;
  border-radius: 5px;
  background-color: skyblue;
  margin-left: 5px;
  margin-right: 5px;
`;
