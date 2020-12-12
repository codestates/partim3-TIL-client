import React from 'react';
import styled from 'styled-components';
import { Input, Label } from '../../atoms';

interface InputMoleculeProps {
  text: string;
  controlId?: string;
  type: string;
  name: string;
  placeholder?: string;
  smLabel: number;
  smInput: number;
  handleChange(e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }): void;
  autoFocus?: boolean;
}

export default function InputMolecule({
  text,
  controlId,
  type,
  name,
  placeholder,
  smLabel,
  smInput,
  handleChange,
  autoFocus,
}: InputMoleculeProps) {
  return (
    <InputMoleculeWrap>
      <Label smLabel={smLabel} text={text} />
      <Input
        smInput={smInput}
        type={type}
        name={name}
        handleChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    </InputMoleculeWrap>
  );
}

const InputMoleculeWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
`;
