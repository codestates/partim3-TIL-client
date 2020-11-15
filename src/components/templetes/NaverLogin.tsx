import React, { useEffect } from 'react';

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
      clientId: 'q1SVdfaPG3tcJmMo1vM8',
      callbackUrl: 'http://localhost:3000/mypage',
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
