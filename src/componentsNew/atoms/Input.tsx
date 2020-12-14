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
    />
  );
}

interface InputWrapProps {
  smInput: number;
}

const InputWrap = styled.input`
  flex: ${(props: InputWrapProps) => props.smInput};
`;
