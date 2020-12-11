import React from 'react';
import styled from 'styled-components';

// 버튼만 있는 상태임. 기능구현 필요
export default function SignupSocial() {
  return (
    <SocialSignupWrap>
      <ButtonWrap value="naver" color="green">
        naver
      </ButtonWrap>
      <ButtonWrap value="google" color="red">
        google
      </ButtonWrap>
    </SocialSignupWrap>
  );
}

const SocialSignupWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonWrap = styled.button`
  margin: 5px;
  height: 40px;
  width: 100%;
  background-color: ${props => props.color};
  border-radius: 5px;
`;
