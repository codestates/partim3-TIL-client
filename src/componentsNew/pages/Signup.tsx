import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { SignupSocial, SignupGeneral } from '../oraganisms/';

import { VscDebugStart } from 'react-icons/vsc';

interface SignupProps {
  handleChange: (
    event: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => void;
  postSignupReq: () => void;
}

export default function Signup({ handleChange, postSignupReq }: SignupProps) {
  return (
    <SignupPage>
      <SignupWrap>
        <div style={{ margin: '10px 0px' }}>
          {/* 고양이 이미지 */}
          <Link to="/">
            <img src="img/cat.jpeg" height="171" width="180" style={{ borderRadius: '50%' }} />
          </Link>
        </div>

        <div style={{ margin: '10px 0px', width: '100%' }}>
          <SignupGeneral handleChange={handleChange} />
        </div>

        <div style={{ margin: '10px 0px', width: '100%' }}>
          {/* 회원가입 버튼 */}
          <ButtonWrap value="Get started!" onClick={postSignupReq}>
            <VscDebugStart size="1.7em" style={{ flex: 1, color: '#585858' }} />
            <span style={{ flex: 5, fontSize: '20px' }}>Get Started!</span>
          </ButtonWrap>
        </div>

        <div>
          {/* 가로선 */}
          <hr style={{ height: 3, width: '280px', background: 'gray', margin: '5px 0px' }}></hr>
        </div>

        <div style={{ margin: '10px 0px', width: '100%' }}>
          <SignupSocial />
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
          <Link to="/login">회원이신가요?</Link>
        </div>
      </SignupWrap>
    </SignupPage>
  );
}

const SignupPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const SignupWrap = styled.div`
  flex: 1;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonWrap = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 20px;
  height: 60px;
  width: 100%;
  border-radius: 5px;
`;
