import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function CalSettingButton() {
  return (
    <CalSettingButtonWrap>
      <Link to="/mypage/calendar">
        <button type="button" style={{ border: 'none', padding: '0px' }}>
          <img src="/img/settingIcon.png" alt="캘린더 설정하기" width="23px" height="23px"></img>
        </button>
      </Link>
    </CalSettingButtonWrap>
  );
}

const CalSettingButtonWrap = styled.div`
  flex: 1;
`;
