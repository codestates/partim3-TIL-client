import React from 'react';
import styled from 'styled-components';

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  smInput: number;
  handleChange(e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }): void;
  autoFocus?: boolean;
  className?: string;
}

export default function Input({
  smInput,
  type,
  name,
  handleChange,
  placeholder,
  autoFocus,
  className,
}: InputProps) {
  return (
    <InputWrap
      className={className}
      type={type}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      smInput={smInput}
      autoFocus={autoFocus}
      autoComplete={name}
    />
  );
}

interface InputWrapProps {
  smInput: number;
}

const InputWrap = styled.input`
  flex: ${(props: InputWrapProps) => props.smInput};
  width: 100%;
  height: 35px;
  font-size: 1.1em;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 2px solid #dadce0;
`;
