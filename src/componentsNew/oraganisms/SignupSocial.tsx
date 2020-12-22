import React from 'react';
import styled from 'styled-components';

import NaverLogin from '../molecules/login/NaverLogin';
import SocialLoginGoogle from '../molecules/login/SocialLoginGoogle';

// 버튼만 있는 상태임. 기능구현 필요
export default function SignupSocial() {
  return (
    <SocialSignupWrap>
      <ButtonWrap>
        <NaverLogin />
      </ButtonWrap>
      <ButtonWrap>
        <SocialLoginGoogle buttonText="Google Signup" />
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

const ButtonWrap = styled.div`
  margin: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
