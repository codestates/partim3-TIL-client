import React from 'react';
import styled from 'styled-components';

import NaverLogin from '../molecules/login/NaverLogin';
import SocialLoginGoogle from '../molecules/login/SocialLoginGoogle';

export default function LoginSocial() {
  return (
    <LoginSocialWrap>
      <ButtonWrap>
        <NaverLogin />
      </ButtonWrap>
      <ButtonWrap>
        <SocialLoginGoogle buttonText="Google Login" />
      </ButtonWrap>
    </LoginSocialWrap>
  );
}

const LoginSocialWrap = styled.div`
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
