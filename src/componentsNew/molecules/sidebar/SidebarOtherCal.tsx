import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { RenderCalendars } from './sidebarCalUnits';

export default function SidebarOtherCal() {
  const { shareCalendar } = useSelector((state: RootState) => state.getAllCalendars.allCalendars);

  const checked = (e: any) => {
    console.log(e.target.checked);
    console.log(e.target.value);
  };

  return (
    <SidebarOtherCalWrap>
      <div>공유캘린더</div>
      <RenderCalendars checked={checked} calendars={shareCalendar} />
    </SidebarOtherCalWrap>
  );
}

const SidebarOtherCalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
