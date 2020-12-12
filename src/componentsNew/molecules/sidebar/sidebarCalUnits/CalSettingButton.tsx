import React from 'react';
import { Link } from 'react-router-dom';

export default function CalSettingButton() {
  return (
    <div style={{ flex: 1 }}>
      <Link to="/mypage/calendar">
        <button type="button" style={{ border: 'none', padding: '0px' }}>
          <img src="/img/settingIcon.png" alt="캘린더 설정하기" width="23px" height="23px"></img>
        </button>
      </Link>
    </div>
  );
}
