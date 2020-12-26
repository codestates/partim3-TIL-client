import React from 'react';
import styled from 'styled-components';
import { Input } from '../../componentsNew/atoms';

interface UserInfoProps {
  handleChange(e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }): void;
  currentNickname: string;
}

export default function UserInfo({ handleChange, currentNickname }: UserInfoProps) {
  return (
    <UserInfoWrap>
      <LabelInputSet>
        <UserInfoLabel>nickname</UserInfoLabel>
        <Input
          className="newNickname"
          smInput={2}
          type="text"
          name="nickname"
          handleChange={handleChange}
          // placeholder={currentNickname}
          autoFocus={true}
        />
      </LabelInputSet>

      <LabelInputSet>
        <UserInfoLabel>old password</UserInfoLabel>
        <Input
          className="oldPassword"
          smInput={2}
          type="password"
          name="oldPassword"
          handleChange={handleChange}
        />
      </LabelInputSet>

      <LabelInputSet>
        <UserInfoLabel>new password</UserInfoLabel>
        <Input
          className="newPassword"
          smInput={2}
          type="password"
          name="newPassword"
          handleChange={handleChange}
        />
      </LabelInputSet>

      <LabelInputSet>
        <UserInfoLabel>new password confirm</UserInfoLabel>
        <Input
          className="newPasswordConfirm"
          smInput={2}
          type="password"
          name="newPasswordConfirm"
          handleChange={handleChange}
        />
      </LabelInputSet>
    </UserInfoWrap>
  );
}

const UserInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0% 30%;
`;

const UserInfoLabel = styled.label`
  margin: 10px 0px 0px 0px;
  font-weight: bold;
`;

const LabelInputSet = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
`;
