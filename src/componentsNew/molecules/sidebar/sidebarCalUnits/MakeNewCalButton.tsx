import React from 'react';

interface MakeNewCalProps {
  addCalendar: () => void;
}

export default function MakeNewCalButton({ addCalendar }: MakeNewCalProps) {
  return (
    <button type="button" onClick={addCalendar} style={{ border: 'none', padding: '0px' }}>
      <img
        src="/img/newCalendarAddIcon.png"
        alt="새 캘린더 만들기"
        width="32px"
        height="32px"
      ></img>
    </button>
  );
}
