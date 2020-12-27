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
        className="MakeNewCal_Input"
        type="text"
        size={12}
        placeholder="새로운 캘린더 이름"
        width="40"
        onChange={handleNewCalName}
        style={{
          border: '0px',
          margin: '0px 2px',
        }}
      ></input>
      <ColorPicker handleNewCalColor={handleNewCalColor} currentColor={currentColor} />
      <MakeNewCalButton addCalendar={addCalendar} />
    </MakeNewCalWrap>
  );
}

const MakeNewCalWrap = styled.div`
  flex: 1;
  background-color: white;
  padding: 2px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
