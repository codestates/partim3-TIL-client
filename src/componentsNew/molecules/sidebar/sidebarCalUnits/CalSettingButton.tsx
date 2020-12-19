import React from 'react';
import { Link } from 'react-router-dom';

interface CalSettingButtonProps {
  eachCalendarName: string;
}

export default function CalSettingButton({ eachCalendarName }: CalSettingButtonProps) {
  let url = `/mypage/calendar/${eachCalendarName}`;
  return (
    <div style={{ flex: 1 }}>
      <Link to={url}>
        <button type="button" style={{ border: 'none', padding: '0px' }}>
          <img src="/img/settingIcon.png" alt="캘린더 설정하기" width="23px" height="23px"></img>
        </button>
      </Link>
    </div>
  );
}
