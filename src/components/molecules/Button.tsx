import React from 'react';
// import { ButtonGroupProps } from 'react-bootstrap'

interface ButtonProps {
  color: string;
  title?: string;
  //?는 받아올지 말지 모를때
}

const dd 
= 'hi'

const Button: React.FunctionComponent<ButtonProps> = ({ color }) => (
  <div>
    confirm
    <button style={{ color }}></button>
  </div>
);

export default Button;
