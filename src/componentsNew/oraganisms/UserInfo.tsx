import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import InputMolecule from '../molecules/mypageSetting/InputMolecule';

interface UserInfoProps {
  handleChange(e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }): void;
  currentNickname: string;
}

export default function UserInfo({ handleChange, currentNickname }: UserInfoProps) {
  return (
    <Form className="px-5 py-3 m-auto" style={{ width: '400px', boxSizing: 'content-box' }}>
      <InputMolecule
        text="닉네임"
        controlId="formBasicEmail"
        type="text"
        name="nickname"
        placeholder={currentNickname}
        handleChange={handleChange}
        smLabel={4}
        smInput={8}
      />

      <InputMolecule
        text="기존 비밀번호"
        controlId="formBasicPassword"
        type="password"
        name="oldPassword"
        handleChange={handleChange}
        smLabel={4}
        smInput={8}
      />

      <InputMolecule
        text="새 비밀번호"
        controlId="formBasicPassword"
        type="password"
        name="newPassword"
        handleChange={handleChange}
        smLabel={4}
        smInput={8}
      />

      <InputMolecule
        text="새 비밀번호 확인"
        controlId="formBasicPassword"
        type="password"
        name="newPasswordConfirm"
        handleChange={handleChange}
        smLabel={4}
        smInput={8}
      />
    </Form>
  );
}
