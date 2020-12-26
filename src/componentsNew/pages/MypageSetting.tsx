import React from 'react';
import styled from 'styled-components';

import { UserInfo } from '../oraganisms';

interface MypageSettingProps {
  currentNickname: string;
  updateUserInfoReq: () => void;
  handleChange: (e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }) => void;
}

export default function MypageSetting({
  currentNickname,
  updateUserInfoReq,
  handleChange,
}: MypageSettingProps) {
  return (
    <MypageSettingWrap>
      <MypageSettingWelcomeMessage>
        {/* <div style={{ flex: 3 }}>사진 자리?</div> */}
        <div style={{ flex: 9, display: 'flex', flexDirection: 'column' }}>
          <Text>{currentNickname}님</Text>
          <Text>&nbsp;&nbsp;환영합니다!</Text>
        </div>
      </MypageSettingWelcomeMessage>

      <UserInfo handleChange={handleChange} currentNickname={currentNickname} />
      <div
        style={{
          display: 'flex',
          // border: '1px solid black',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px',
        }}
      >
        <UpdateUserInfoReqButton type="button" onClick={updateUserInfoReq}>
          Update UserInfo
        </UpdateUserInfoReqButton>
      </div>
    </MypageSettingWrap>
  );
}

const MypageSettingWrap = styled.div`
  height: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MypageSettingWelcomeMessage = styled.div`
  display: flex;
  height: 35%;
  /* border: 1px solid black; */
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 40px;
`;

const Text = styled.span`
  text-align: left;
  font-size: 50px;
  margin-left: 20%;
`;

const UpdateUserInfoReqButton = styled.button`
  background-color: grey;
  color: white;
  border-radius: 5px;
  width: 300px;
  height: 50px;
  margin: 5px;
  /* font-weight: bold; */
  font-size: 25px;
`;
