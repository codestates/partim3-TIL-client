import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../modules';
import styled from 'styled-components';
import { handleTodayStart, handleTodaySuccess } from '../../../modules/handleToday';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default function SidebarCal() {
  const [startDate, setStartDate] = useState(new Date());

  const dispatch = useDispatch();

  const handleDate = async (date: Date) => {
    if (date !== null) {
      await setStartDate(date);
    }

    await dispatch(handleTodayStart());

    let selectedDay = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: 0,
      min: 0,
    };

    await dispatch(handleTodaySuccess(selectedDay));
  };

  return (
    <SidebarCalWrap>
      <div>날짜를 선택해 주세요</div>
      <div>
        <DatePicker selected={startDate} onChange={handleDate} dateFormat="yyyy/MM/dd" />
      </div>
    </SidebarCalWrap>
  );
}

const SidebarCalWrap = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
