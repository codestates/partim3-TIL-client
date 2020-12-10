import React from 'react';
import styled from 'styled-components';
import { CalCheckBox, CalSettingButton, CalDeleteButton } from './';

interface RenderCalendarsProps {
  // checked 함수 : 명칭/코드 수정해서, CalCheckBox에 내려줄 것
  checked: (e: any) => void;
  calendars: Array<{
    id: number;
    name: string;
    color: string;
  }>;
  delCalendar?: (calId: number) => void;
}

export default function RenderCalendars({ checked, calendars, delCalendar }: RenderCalendarsProps) {
  let eachCalendars;

  if (calendars === []) {
    eachCalendars = '';
  } else {
    eachCalendars = calendars.map(eachCalendar => {
      return (
        <RenderCalendarsWrap key={eachCalendar.id}>
          <CalCheckBox
            eachCalendarId={eachCalendar.id}
            eachCalendarColor={eachCalendar.color}
            eachCalendarName={eachCalendar.name}
          />
          <CalSettingButton />
          <CalDeleteButton
            calId={eachCalendar.id}
            calName={eachCalendar.name}
            delCalendar={delCalendar!}
          />
        </RenderCalendarsWrap>
      );
    });
  }

  return <>{eachCalendars}</>;
}

interface RenderCalendarsWrapProps {
  key: number;
}

const RenderCalendarsWrap = styled.div.attrs((props: RenderCalendarsWrapProps) => ({
  key: props.key,
}))`
  flex: 1;
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  padding-left: 10px;
`;
