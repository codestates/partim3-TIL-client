import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LoginGeneral from '../oraganisms/LoginGeneral';
import LoginSocial from '../oraganisms/LoginSocial';

interface LoginProps {
  handleChange: (
    event: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => void;
  postLoginReq: () => void;
}

export default function Login({ handleChange, postLoginReq }: LoginProps) {
  return (
    <LoginPage>
      <LoginWrap>
        <div style={{ margin: '10px 0px' }}>
          {/* 고양이 이미지 */}
          <Link to="/">
            <img src="img/cat.jpeg" height="171" width="180" style={{ borderRadius: '50%' }} />
          </Link>
        </div>

        <div style={{ margin: '10px 0px' }}>
          {/* 일반 로그인 */}
          <LoginGeneral handleChange={handleChange} postLoginReq={postLoginReq} />
        </div>

        <div>
          {/* 가로선 */}
          <hr style={{ height: 3, width: '300px', background: 'gray' }}></hr>
        </div>

        <div style={{ margin: '10px 0px', width: '100%' }}>
          {/* 소셜 로그인 : 네이버, 구글 */}
          <LoginSocial />
        </div>

        <div
          style={{
            margin: '10px 0px',
            width: '100%',
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Link to="/signup">아직 계정이 없으신가요?</Link>
        </div>
      </LoginWrap>
    </LoginPage>
  );
}

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const LoginWrap = styled.div`
  flex: 1;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
