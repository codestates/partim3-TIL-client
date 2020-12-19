// InputMolecule은 mypageSetting에서만 사용하지는 않을테니 밖으로 하나 더 빼 두었습니다.

import React from 'react';
import styled from 'styled-components';
import { Input, Label } from '../atoms';

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
  className?: string;
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
  className,
}: InputMoleculeProps) {
  return (
    <InputMoleculeWrap>
      <Label smLabel={smLabel} text={text} />
      <Input
        className={className}
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
