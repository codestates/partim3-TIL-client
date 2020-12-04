import React from 'react';
import styled from 'styled-components';
import './RenderCalendars.css';

interface RenderCalendarsProps {
  checked: (e: any) => void;
  calendars: Array<{
    id: number;
    name: string;
    color: string;
  }>;
}
// RenderCalendars : 체크박스 색깔 입히기 해야됨
export default function RenderCalendars({ checked, calendars }: RenderCalendarsProps) {
  // console.log(calendars);
  let eachCalendars = calendars.map(eachCalendar => {
    return (
      <div className="checkbox-container">
        <input
          key={eachCalendar.id}
          id={`is-subscription-${eachCalendar.id}`}
          type="checkbox"
          onClick={checked}
          name={eachCalendar.name}
          value={eachCalendar.name}
        />
        <label htmlFor={`is-subscription-${eachCalendar.id}`}>{eachCalendar.name}</label>
      </div>
    );
  });

  return <RenderCalendarsWrap>{eachCalendars}</RenderCalendarsWrap>;
}

const RenderCalendarsWrap = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 10px;
`;
