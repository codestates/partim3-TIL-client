import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../modules';
import { CalCheckBox, CalSettingButton, CalDeleteButton } from './';

interface EachCalendarSetProps {
  eachCalendarId: number;
  eachCalendarColor: string;
  eachCalendarName: string;
  handleCheckBox: (checkedCal: number, isChecked: boolean) => void;
  delCalendar: (calId: number) => void;
  isMyCalendar: boolean;
}

export default function EachCalendarSet({
  eachCalendarId,
  eachCalendarColor,
  eachCalendarName,
  handleCheckBox,
  delCalendar,
  isMyCalendar,
}: EachCalendarSetProps) {
  const [mouseOver, setMouseOver] = useState(false);
  const { checkedCalArray } = useSelector((state: RootState) => state.handleCheckedCal);

  return (
    <EachCalendarSetWrap
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
    >
      <CalCheckBox
        eachCalendarId={eachCalendarId}
        eachCalendarColor={eachCalendarColor}
        eachCalendarName={eachCalendarName}
        calArrayForFiltering={checkedCalArray}
        handleCheckBox={handleCheckBox}
      />
      <CalSettingButton eachCalendarName={eachCalendarName} mouseOver={mouseOver} />
      {!isMyCalendar ? (
        ''
      ) : (
        <CalDeleteButton
          calId={eachCalendarId}
          calName={eachCalendarName}
          delCalendar={delCalendar!}
          mouseOver={mouseOver}
        />
      )}
    </EachCalendarSetWrap>
  );
}

const EachCalendarSetWrap = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  justify-content: center;
  &:hover {
    background-color: white;
    color: black;
    border-radius: 2px;
  }
`;
