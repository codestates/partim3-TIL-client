import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { SignupSocial, SignupGeneral } from '../oraganisms/';

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
          <ButtonWrap value="Get started!" color="skyblue" onClick={postSignupReq}>
            Get Started!
          </ButtonWrap>
        </div>

        <div style={{ margin: '10px 0px', width: '100%' }}>
          {/* 가로선 */}
          <hr style={{ height: 3, width: '300px', background: 'gray', margin: '0px' }}></hr>
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
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonWrap = styled.button`
  padding: 5px;
  height: 40px;
  width: 100%;
  background-color: ${props => props.color};
  border-radius: 5px;
`;
