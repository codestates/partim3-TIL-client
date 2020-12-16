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
      {/* 상단 2개 구역 - 필요할까? */}
      <div
        style={{
          display: 'flex',
          height: '15%',
          border: '1px solid black',
        }}
      >
        <div
          style={{
            flex: 8,
            border: '1px solid black',
          }}
        >
          Setting
        </div>
        <div
          style={{
            flex: 4,
            border: '1px solid black',
          }}
        ></div>
      </div>

      {/* 중간 1개 구역 - 필요할까? */}
      <div
        style={{
          display: 'flex',
          height: '15%',
          border: '1px solid black',
        }}
      >
        아이콘 및 기본정보(?)
      </div>

      {/* 개인정보 수정 부분 */}
      <UserInfo handleChange={handleChange} currentNickname={currentNickname} />
      <div
        style={{
          display: 'flex',
          border: '1px solid black',
          justifyContent: 'center',

          alignItems: 'center',
        }}
      >
        <UpdateUserInfoReqButton type="button" onClick={updateUserInfoReq}>
          회원정보 수정하기
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

const UpdateUserInfoReqButton = styled.button`
  background-color: blue;
  color: white;
  border-radius: 5px;
  width: 200px;
  height: 40px;
  margin: 5px;
`;
