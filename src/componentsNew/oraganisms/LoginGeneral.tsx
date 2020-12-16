import React from 'react';
import styled from 'styled-components';
import { BsFillAwardFill } from 'react-icons/bs';
import { Input } from '../atoms';

interface LoginGeneralProps {
  handleChange: (
    event: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => void;
}

export default function LoginGeneral({ handleChange }: LoginGeneralProps) {
  return (
    <LoginGeneralWrap>
      <LoginGeneralElements>
        {/* 이메일 */}
        <BsFillAwardFill></BsFillAwardFill>
        <Input
          type="email"
          name="email"
          handleChange={handleChange}
          placeholder="email"
          smInput={2}
          autoFocus={true}
        />
      </LoginGeneralElements>

      {/* 패스워드 */}
      <LoginGeneralElements>
        {/* 이메일 */}
        <BsFillAwardFill></BsFillAwardFill>
        <Input
          type="password"
          name="password"
          handleChange={handleChange}
          placeholder="password"
          smInput={2}
        />
      </LoginGeneralElements>
    </LoginGeneralWrap>
  );
}

const LoginGeneralWrap = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginGeneralElements = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 5px;
`;
