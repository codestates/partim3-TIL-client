import React from 'react';
import styled from 'styled-components';

export default function Logo() {
  return (
    <div>
      <Circle>TIL</Circle>
    </div>
  );
}

const Circle = styled.div`
  flex: 1;
  margin: 3px;
  width: 20px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover {
    outline: none;
    background-color: #f0f2f1;
    color: black;
  }
`;
