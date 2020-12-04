import React from 'react';
import styled from 'styled-components';
import { ColorPicker, MakeNewCalButton } from '.';

interface MakeNewCalProps {
  handleNewCalName: (
    e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => void;
  handleNewCalColor: (color: string) => void;
  addCalendar: () => void;
  currentColor: string;
}

export default function MakeNewCal({
  handleNewCalName,
  handleNewCalColor,
  addCalendar,
  currentColor,
}: MakeNewCalProps) {
  return (
    <MakeNewCalWrap>
      <input
        type="text"
        size={12}
        placeholder="새로운 캘린더 이름"
        width="40"
        onChange={handleNewCalName}
        style={{
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderTopWidth: 0,
          borderBottomWidth: 1,
          marginLeft: '2px',
          marginRight: '2px',
        }}
      ></input>
      <ColorPicker handleNewCalColor={handleNewCalColor} currentColor={currentColor} />
      <MakeNewCalButton addCalendar={addCalendar} />
    </MakeNewCalWrap>
  );
}

const MakeNewCalWrap = styled.div`
  flex: 1;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
`;
