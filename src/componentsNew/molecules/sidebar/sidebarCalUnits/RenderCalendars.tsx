import React from 'react';
import styled from 'styled-components';
import { CalSettingButton, CalDeleteButton } from './';
import './RenderCalendars.css';

interface RenderCalendarsProps {
  checked: (e: any) => void;
  calendars: Array<{
    id: number;
    name: string;
    color: string;
  }>;
  delCalendar?: (calId: number) => void;
  displayDeleteModal?: boolean;
  setDisplayDeleteModal?: (trueOrFalse: boolean) => void;
}
// RenderCalendars : 체크박스 색깔 입히기 해야됨
export default function RenderCalendars({
  checked,
  calendars,
  delCalendar,
  displayDeleteModal,
  setDisplayDeleteModal,
}: RenderCalendarsProps) {
  // console.log(calendars);
  let eachCalendars;

  if (calendars === []) {
    eachCalendars = '';
  } else {
    eachCalendars = calendars.map(eachCalendar => {
      return (
        <div
          className="checkbox-container"
          key={eachCalendar.id}
          style={{
            display: 'flex',
            flex: 1,
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <input
            id={`is-subscription-${eachCalendar.id}`}
            type="checkbox"
            onClick={checked}
            name={eachCalendar.name}
            value={eachCalendar.name}
          />
          <label
            htmlFor={`is-subscription-${eachCalendar.id}`}
            style={{ margin: '0px', width: '150px' }}
          >
            {eachCalendar.name}
          </label>
          <CalSettingButton />
          <CalDeleteButton
            calId={eachCalendar.id}
            calName={eachCalendar.name}
            delCalendar={delCalendar!}
            displayDeleteModal={displayDeleteModal as boolean}
            setDisplayDeleteModal={setDisplayDeleteModal!}
          />
        </div>
      );
    });
  }

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
