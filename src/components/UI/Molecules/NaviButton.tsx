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

  const getYesterday = () => {
    let shiftedToday = JSON.parse(JSON.stringify(today));
    shiftedToday.day--;
    handleToday(shiftedToday);
  };

  const getTomorrow = () => {
    let shiftedToday = JSON.parse(JSON.stringify(today));
    shiftedToday.day++;
    handleToday(shiftedToday);
  };
  return (
    <>
      <ButtonAtom text="left" onClick={getYesterday} />{' '}
      <ButtonAtom text="right" onClick={getTomorrow} />
    </>
  );
}
