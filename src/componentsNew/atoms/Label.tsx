import React from 'react';
import styled from 'styled-components';

interface LabelProps {
  text: string;
  smLabel: number;
}

export default function Label({ text, smLabel }: LabelProps) {
  return <LabelWrap smLabel={smLabel}>{text}</LabelWrap>;
}

interface InputWrapProps {
  smLabel: number;
}

const LabelWrap = styled.label`
  flex: ${(props: InputWrapProps) => props.smLabel};
  text-align: right;
  margin: 0;
  margin-right: 10px;
`;
