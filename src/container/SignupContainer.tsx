import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { RootState } from '../modules';
import { signupStart, signupSuccess, signupFailure } from '../modules/signup';

import Signup from '../componentsNew/pages/Signup';

export default function SignupContainer() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);

  if (currentUser) {
    alert('로그인한 상태에서는 회원가입을 할 수 없습니다. 로그아웃 후 시도하세요');
    history.push('/');
  }

  const handleChange = (
    event: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    let targetName = event.target.name;
    if (targetName === 'email') {
      setEmail(event.target.value);
    }
    if (targetName === 'nickname') {
      setNickname(event.target.value);
    }
    if (targetName === 'password') {
      setPassword(event.target.value);
    }
    if (targetName === 'passwordConfirm') {
      setPasswordConfirm(event.target.value);
    }
  };

  const handleRegister = (email: string, nickname: string, password: string) => {
    dispatch(signupStart());

    return axios
      .post(
        `http://localhost:5000/users/signup`,
        {
          email,
          nickname,
          password,
        },
        { withCredentials: true },
      )
      .then(res => {
        dispatch(signupSuccess());
        alert('환영합니다');
        history.push('/login');
      })
      .catch(err => {
        alert(`잘못한거 같은데요!`);
        dispatch(signupFailure());
      });
  };

  const postSignupReq = () => {
    if (password === '') {
      alert('비밀번호를 입력하지 않으셨습니다. 비밀번호를 입력해 주세요.');
    } else if (password !== passwordConfirm) {
      alert('입력하신 비밀번호가 서로 다릅니다. 동일한 비밀번호를 입력해 주세요.');
    } else {
      let passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
      if (!passwordValidation.test(password)) {
        alert(
          '비밀번호가 조건에 맞지 않습니다. 8~12글자 사이의 영문 대소문자와 숫자의 조합으로 구성하세요.',
        );
      } else {
        handleRegister(email, nickname, password);

        return false;
      }
    }
  };

  return <Signup handleChange={handleChange} postSignupReq={postSignupReq} />;
}
