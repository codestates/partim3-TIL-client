import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import REACT_APP_URL from '../config';

// import { RootState } from '../modules';

// import ButtonBoot from '../componentsNew/atoms/ButtonBoot';
import { loginStart, loginSuccess, loginFailure } from '../modules/loginOut';

import { handleTodayStart, handleTodaySuccess, handleTodayFailure } from '../modules/handleToday';

import Login from '../componentsNew/pages/Login';
import getToday from '../componentsNew/utils/todayF';

export default function LoginContainer() {
  // console.log('loginCon');
  /*  이미 로그인된 상태에서 /login에 접속하면 막아주는 장치인데, 
      이 기능을 여기서 넣으니까 alert만 괜히 두번 뜬다
      이 기능을 주지 않으면 로그인한 상태에서 /login에 접속이 가능해지므로, 처리하긴 해야 함

      => 일단 로그인 버튼 자체를 안보이게 하자
      => 그래도 주소 입력으로 접속하는 것은 막아야 하는데...

    const { currentUser } = useSelector((state: RootState) => state.loginOut.status);

    if (currentUser) {
      alert('이미 로그인이 되어 있습니다.');
      history.push('/calendar/day');
    }

  */

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (
    event: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    let targetName = event.target.name;
    if (targetName === 'email') {
      setEmail(event.target.value);
    }
    if (targetName === 'password') {
      setPassword(event.target.value);
    }
  };

  const handleLogin = (email: string, password: string) => {
    dispatch(loginStart());
    // 서버에서 헤더에다가 토큰을 담아서 줌
    // 토큰을 다음번의 모든 요청에다가 헤더에 담아서 던져야 함
    // 서버는 이 요청마다 온느 헤더를 검사해서 기존의 토큰과 비교 검증하고 맞으면 통과, 틀리면 에러

    // 로그아웃시 토큰을 죽이겠다 -> 서버에서 이 토큰을 만료시키고 돌려주면
    // 클라이언트는 다음번의 모든 요청에다가 헤더를 죽여야함.

    interface resData {
      userId: number;
      nickname: string;
      token: string;
    }

    return axios
      .post<resData>(
        `${REACT_APP_URL}/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      )
      .then(res => {
        const { userId, nickname, token } = res.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        dispatch(loginSuccess(userId, nickname));
        dispatch(handleTodayStart());
        dispatch(handleTodaySuccess(getToday()));
        // 토큰을 localStorage 등에 저장할 필요를 고려해야 할까?
        localStorage.setItem('token', token); // 일단 저장해봄...
        alert('로그인에 성공하셨습니다.');
        history.push('/calendar/day');
      })
      .catch(err => {
        console.log(err);
        dispatch(loginFailure());
      });
  };

  const postLoginReq = () => {
    if (password === '') {
      alert('비밀번호를 입력하지 않으셨습니다. 비밀번호를 입력해 주세요.');
    } else {
      handleLogin(email, password);
      return false;
    }
  };

  return <Login handleChange={handleChange} postLoginReq={postLoginReq} />;
}
