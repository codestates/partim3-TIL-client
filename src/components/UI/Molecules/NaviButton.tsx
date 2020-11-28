import React from 'react';
import { ButtonAtom } from '../Atoms';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../modules';
import {
  handleTodayStart,
  handleTodaySuccess,
  handleTodayFailure,
} from '../../../modules/handleToday';
import date from '../../UI/Atoms/todayF';

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
      <ButtonAtom text="left" onClick={() => getNextday(-1)} />{' '}
      <ButtonAtom text="right" onClick={() => getNextday(1)} />
    </>
  );
}
