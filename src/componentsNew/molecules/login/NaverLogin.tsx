import React, { useEffect } from 'react';
import REACT_APP_URL from '../../../config';

import dotenv from 'dotenv';
dotenv.config();

declare global {
  interface Window {
    naver: any;
  }
}

export default function NaverLogin() {
  const { naver } = window;

  const Login = () => {
    Naver();
  };

  useEffect(Login, []);

  function Naver() {
    var naverLogin = new naver.LoginWithNaverId({
      clientId: `${process.env.REACT_APP_NAVER_LOGIN}`,
      callbackUrl: `${REACT_APP_URL}/mypage`,
      isPopup: false /* 팝업을 통한 연동처리 여부 */,
      loginButton: { color: 'green', type: 3, height: 60 } /* 로그인 버튼의 타입을 지정 */,
      callbackHandle: true,
    });

    naverLogin.init();
  }

  return (
    <div id="naverIdLogin" onClick={Login}>
      네이버로그인
    </div>
  );
}
