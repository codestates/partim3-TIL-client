import React from 'react';
import styled from 'styled-components';

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  smInput: number;
  handleChange(e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }): void;
}

export default function Input({ smInput, type, name, handleChange, placeholder }: InputProps) {
  return (
    <InputWrap
      type={type}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      smInput={smInput}
    />
  );
}

interface InputWrapProps {
  smInput: number;
}

const InputWrap = styled.input`
  flex: ${(props: InputWrapProps) => props.smInput};
`;
