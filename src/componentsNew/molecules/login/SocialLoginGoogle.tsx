import React from 'react';
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

import dotenv from 'dotenv';
dotenv.config();

export default function SocialLoginGoogle() {
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
        history.push('/calendar/day');
      })
      .catch(err => {
        console.log(err);
        dispatch(loginFailure());
      });
  };

  return (
    <div
      className="w-100"
      style={{
        display: 'flex',
        flexFlow: 'column wrap',
        height: '50px',
      }}
    >
      {/* <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_LOGIN}`}
        // onSuccess={responseGoogle}
        // onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      /> */}
    </div>
  );
}
