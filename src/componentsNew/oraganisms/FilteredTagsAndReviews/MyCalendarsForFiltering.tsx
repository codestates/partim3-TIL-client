import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../modules';
import {
  handle_cals_ArrayForFiltering_Starts,
  handle_cals_ArrayForFiltering_Success_Add,
  handle_cals_ArrayForFiltering_Success_Del,
} from '../../../modules/handle_TagsAndCalsArrayForFiltering';

import { CalCheckBox } from '../../molecules/sidebar/sidebarCalUnits';

export default function MyCalendarsForFiltering() {
  const { myCalendar } = useSelector((state: RootState) => state.getAllCalendars.allCalendars);
  const { cals_ArrayForFiltering } = useSelector(
    (state: RootState) => state.handle_TagsAndCalsArrayForFiltering,
  );

  const dispatch = useDispatch();

  const handleCheckBox = (checkedCal: number, isChecked: boolean) => {
    if (cals_ArrayForFiltering.indexOf(checkedCal) === -1 && isChecked === true) {
      dispatch(handle_cals_ArrayForFiltering_Starts());
      dispatch(handle_cals_ArrayForFiltering_Success_Add(checkedCal));
    } else {
      dispatch(handle_cals_ArrayForFiltering_Starts());
      dispatch(
        handle_cals_ArrayForFiltering_Success_Del(cals_ArrayForFiltering.indexOf(checkedCal)),
      );
    }
  };

  let eachCalendars =
    myCalendar === []
      ? ''
      : myCalendar.map(eachCalendar => {
          return (
            <EachCalWrap key={eachCalendar.id}>
              <CalCheckBox
                eachCalendarId={eachCalendar.id}
                eachCalendarColor={eachCalendar.color}
                eachCalendarName={eachCalendar.name}
                calArrayForFiltering={cals_ArrayForFiltering}
                handleCheckBox={handleCheckBox}
              />
            </EachCalWrap>
          );
        });

  return <div>{eachCalendars}</div>;
}

const EachCalWrap = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  padding-left: 10px;
`;
