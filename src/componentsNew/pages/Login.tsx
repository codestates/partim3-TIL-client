import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LoginGeneral from '../oraganisms/LoginGeneral';
import LoginSocial from '../oraganisms/LoginSocial';

import { GoSignIn } from 'react-icons/go';

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
        <TILlogo>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            TIL
          </Link>
        </TILlogo>

        <div style={{ margin: '10px 0px', width: '100%' }}>
          {/* 일반 로그인 */}
          <LoginGeneral handleChange={handleChange} />
        </div>

        <div style={{ margin: '10px 0px', width: '100%' }}>
          {/* 로그인 버튼 */}
          <ButtonWrap value="Get started!" onClick={postLoginReq}>
            <GoSignIn size="1.7em" style={{ flex: 1, color: '#e6e6e6' }} />
            <span style={{ flex: 5, fontSize: '20px' }}>Sign in!</span>
          </ButtonWrap>
        </div>

        <div>
          {/* 가로선 */}
          <hr style={{ height: 1, width: '280px', background: '#dadce0', margin: '5px 0px' }}></hr>
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
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonWrap = styled.button`
  display: flex;
  background-color: black;
  align-items: center;
  border: 0px;
  outline: none;
  color: #e6e6e6;
  font-weight: 600;
  padding: 10px;
  height: 60px;
  width: 100%;
  border-radius: 5px;
`;

const TILlogo = styled.div`
  font-size: 60px;
  background-color: black;
  color: white;
  font-weight: 600;
  width: 280px;
  text-align: center;
  margin-bottom: 20px;
`;
