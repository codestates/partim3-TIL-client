import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface CalSettingButtonProps {
  eachCalendarName: string;
}
// url 수정 필요 : mycal / sharedcal
export default function CalSettingButton({ eachCalendarName }: CalSettingButtonProps) {
  let url = `/mypage/calendar/mycal/${eachCalendarName}`;
  return (
    <div>
      <Link to={url}>
        <Btn>
          <img src="/img/settingIcon.png" alt="캘린더 설정하기" width="23px" height="23px"></img>
        </Btn>
      </Link>
    </div>
  );
}

const Btn = styled.button`
  outline: none;
  border: 0px;
  background-color: #aed581;
  &:hover {
    background-color: #f0f2f1;
    color: black;
    border-radius: 2px;
  }
`;
