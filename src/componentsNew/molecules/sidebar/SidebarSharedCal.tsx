import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { RenderCalendars } from './sidebarCalUnits';

export default function SidebarSharedCal() {
  const { shareCalendar } = useSelector((state: RootState) => state.getAllCalendars.allCalendars);

  return (
    <SidebarSharedCalWrap>
      <div>공유캘린더</div>
      <RenderCalendars calendars={shareCalendar} />
    </SidebarSharedCalWrap>
  );
}

const SidebarSharedCalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
