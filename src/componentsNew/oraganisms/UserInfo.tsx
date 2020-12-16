import React from 'react';
import styled from 'styled-components';
import { Form, Row, Col } from 'react-bootstrap';
import InputMolecule from '../molecules/mypageSetting/InputMolecule';

interface UserInfoProps {
  handleChange(e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }): void;
  currentNickname: string;
}

export default function UserInfo({ handleChange, currentNickname }: UserInfoProps) {
  return (
    <UserInfoWrap>
      <InputMolecule
        className="newNickname"
        text="닉네임"
        controlId="formBasicEmail"
        type="text"
        name="nickname"
        placeholder={currentNickname}
        handleChange={handleChange}
        smLabel={1}
        smInput={2}
      />

      <InputMolecule
        className="oldPassword"
        text="기존 비밀번호"
        controlId="formBasicPassword"
        type="password"
        name="oldPassword"
        handleChange={handleChange}
        smLabel={1}
        smInput={2}
      />

      <InputMolecule
        className="newPassword"
        text="새 비밀번호"
        controlId="formBasicPassword"
        type="password"
        name="newPassword"
        handleChange={handleChange}
        smLabel={1}
        smInput={2}
      />

      <InputMolecule
        className="newPasswordConfirm"
        text="새 비밀번호 확인"
        controlId="formBasicPassword"
        type="password"
        name="newPasswordConfirm"
        handleChange={handleChange}
        smLabel={1}
        smInput={2}
      />
    </UserInfoWrap>
  );
}

const UserInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0% 25%;
`;
