import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiFillSetting } from 'react-icons/ai';

interface CalSettingButtonProps {
  eachCalendarName: string;
  mouseOver: boolean;
}
// url 수정 필요 : mycal / sharedcal
export default function CalSettingButton({ eachCalendarName, mouseOver }: CalSettingButtonProps) {
  let url = `/mypage/calendar/mycal/${eachCalendarName}`;
  return (
    <div style={{ flex: 1 }}>
      <Link to={url}>
        <Btn>
          {/* <img
            src="/img/settingIcon.png"
            alt="캘린더 설정하기"
            width="23px"
            height="23px"
            color="white"
          ></img> */}
          <AiFillSetting size="1.2em" color={mouseOver ? 'black' : 'white'} />
        </Btn>
      </Link>
    </div>
  );
}

const Btn = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  color: white;
  padding: 0px;
  margin-right: 2px;
`;
