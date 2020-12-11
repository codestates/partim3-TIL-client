import React from 'react';
import styled from 'styled-components';
import { BsFillAwardFill } from 'react-icons/bs';
import { Input } from '../atoms';

interface SignupGeneralProps {
  handleChange: (
    event: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => void;
}

export default function SignupGeneral({ handleChange }: SignupGeneralProps) {
  return (
    <SignupGeneralWrap>
      <SignupGeneralElements>
        {/* 이메일 */}
        <BsFillAwardFill></BsFillAwardFill>
        <Input
          type="text"
          name="email"
          handleChange={handleChange}
          placeholder="email"
          smInput={2}
          autoFocus={true}
        />
      </SignupGeneralElements>
      <SignupGeneralElements>
        {/* 닉네임 */}
        <BsFillAwardFill></BsFillAwardFill>
        <Input
          type="text"
          name="nickname"
          handleChange={handleChange}
          placeholder="nickname"
          smInput={2}
        />
      </SignupGeneralElements>
      <SignupGeneralElements>
        {/* 패스워드 */}
        <BsFillAwardFill></BsFillAwardFill>
        <Input
          type="password"
          name="password"
          handleChange={handleChange}
          placeholder="password"
          smInput={2}
        />
      </SignupGeneralElements>
      <SignupGeneralElements>
        {/* 패스워드 확인 */}
        <BsFillAwardFill></BsFillAwardFill>
        <Input
          type="password"
          name="passwordConfirm"
          handleChange={handleChange}
          placeholder="password Confirm"
          smInput={2}
        />
      </SignupGeneralElements>
    </SignupGeneralWrap>
  );
}

const SignupGeneralWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignupGeneralElements = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 5px;
`;
