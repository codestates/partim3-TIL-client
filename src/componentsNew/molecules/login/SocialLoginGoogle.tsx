// https://electricburglar.tistory.com/150 글에 의하면,
// 회원가입 절차가 따로 없고, OAuth 인증으로 Access Token을 발급하며,
// 처음 로그인하면 회원가입, 그 후에는 로그인 처리가 된다고 한다.
// 그러므로, 'SocialLoginGoogle' 컴포넌트를 로그인과 회원가입 양쪽에 동일하게 사용하려고 함
// 'Google Signup' 등의 버튼이름은 props로 내려줘서 로그인/회원가입에서 각자 다르게 표현
// 버튼 디자인은 styled component로 손대야 한다. (render 부분 참고)

import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { loginStart, loginSuccess, loginFailure } from '../../../modules/loginOut';
import {
  handleTodayStart,
  handleTodaySuccess,
  handleTodayFailure,
} from '../../../modules/handleToday';
import axios from 'axios';
import getToday from '../../utils/todayF';
import REACT_APP_URL from '../../../config';
import { FcGoogle } from 'react-icons/fc';

// import dotenv from 'dotenv';
// dotenv.config();

// console.log('url : ', process.env.REACT_APP_GOOGLE_LOGIN);
// url :  960834676018-h74urgi5pr09a6io2lu2cbc2mv9b61i3.apps.googleusercontent.com
// 누르면 팝업창이 뜬 후 'DOMException: Failed to execute 'open' on 'XMLHttpRequest': Invalid URL' 에러 나오는 중

interface SocialLoginGoogleProps {
  buttonText: string;
}

export default function SocialLoginGoogle({ buttonText }: SocialLoginGoogleProps) {
  const dispatch = useDispatch();
  const history = useHistory();

  const responseGoogle = (response: any) => {
    if (response.error) {
      alert('Google Social Login에 실패하셨습니다. 다시 시도해 주세요.');
      return;
    }
    dispatch(loginStart());
    let idToken = response.tokenObj.id_token;
    axios
      .post(
        `${REACT_APP_URL}users/social`,
        { idToken: idToken, oauthType: 'google' },
        { withCredentials: true },
      )
      .then(res => {
        const { userId, nickname, token } = res.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // 토큰을 localStorage 등에 저장할 필요를 고려해야 할까?
        localStorage.setItem('token', token); // 일단 저장해봄...
        dispatch(loginSuccess(userId, nickname));
        dispatch(handleTodayStart());
        dispatch(handleTodaySuccess(getToday()));
        history.push(`/calendar/day`);
      })
      .catch(err => {
        console.log(err);
        dispatch(loginFailure());
      });
  };

  return (
    <div className="w-100">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_LOGIN}`}
        render={renderProps => (
          <GoogleLoginButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <FcGoogle size="2.5em" style={{ flex: 1 }} />
            <span style={{ flex: 5, fontSize: '20px' }}>{buttonText}</span>
          </GoogleLoginButton>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

const GoogleLoginButton = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid grey;
  background-color: white;
  padding: 10px;
  height: 60px;
  width: 100%;
  border-radius: 5px;
`;
