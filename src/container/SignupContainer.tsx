import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import axios from 'axios';

import { signupStart, signupSuccess, signupFailure } from '../modules/signup';

import Signup from '../componentsNew/pages/Signup';
import { ModalAlert } from '../componentsNew/atoms';

import REACT_APP_URL from '../config';

export default function SignupContainer() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [handleWelcomeModalAlert, setHandleWelcomeModalAlert] = useState(false);
  const [handleModalAlert, setHandleModalAlert] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);

  const dispatch = useDispatch();
  const history = useHistory();

  let handleSendToCalDayModalAlert = false;
  const setHandleSendToCalDayModalAlert = (boolean: boolean) => {
    handleSendToCalDayModalAlert = boolean;
  };

  const handleCloseSendToCalDayModal = () => {
    setHandleSendToCalDayModalAlert(false);
    history.push('/calendar/day');
  };

  if (currentUser) {
    // alert('로그인한 상태에서는 회원가입을 할 수 없습니다. 로그아웃 후 시도하세요'); 를 대신함
    setModalMessage('로그인한 상태에서는 회원가입을 할 수 없습니다. 로그아웃 후 시도하세요.');
    setHandleModalAlert(true);
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
    console.log('여기는 한번만 와야 함');
    dispatch(signupStart());

    return axios
      .post(
        `${REACT_APP_URL}/users/signup`,
        {
          email,
          nickname,
          password,
        },
        { withCredentials: true },
      )
      .then(res => {
        dispatch(signupSuccess());
        let userId = res.data.userId;
        axios
          .post(
            `${REACT_APP_URL}/calendar/calendar`,
            {
              userId: userId,
              name: 'basic calendar',
              color: '#0693E3',
            },
            { withCredentials: true },
          )
          .then(res => {
            // setModalMessage('환영합니다');
            // setHandleModalAlert(true);
            // alert('환영합니다'); 를 대신함
            setHandleWelcomeModalAlert(true);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        // alert(`이미 가입된 이메일 또는 닉네임입니다.`); 를 대신함
        setModalMessage(`이미 가입된 이메일 또는 닉네임입니다.`);
        setHandleModalAlert(true);
        dispatch(signupFailure());
      });
  };

  const postSignupReq = () => {
    if (email === '') {
      // alert('이메일을 입력하지 않으셨습니다. 이메일을 입력해 주세요.');
      setModalMessage('이메일을 입력하지 않으셨습니다. 이메일을 입력해 주세요.');
      setHandleModalAlert(true);
      return;
    } else if (password === '') {
      // alert('비밀번호를 입력하지 않으셨습니다. 비밀번호를 입력해 주세요.');
      setModalMessage('비밀번호를 입력하지 않으셨습니다. 비밀번호를 입력해 주세요.');
      setHandleModalAlert(true);
      return;
    } else if (password !== passwordConfirm) {
      // alert('입력하신 비밀번호가 서로 다릅니다. 동일한 비밀번호를 입력해 주세요.');
      setModalMessage('입력하신 비밀번호가 서로 다릅니다. 동일한 비밀번호를 입력해 주세요.');
      setHandleModalAlert(true);
      return;
    } else {
      let passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
      if (!passwordValidation.test(password)) {
        // alert(
        //   '비밀번호가 조건에 맞지 않습니다. 8~12글자 사이의 영문 대소문자와 숫자의 조합으로 구성하세요.',
        // );
        setModalMessage(
          '비밀번호가 조건에 맞지 않습니다. 8~12글자 사이의 영문 대소문자와 숫자의 조합으로 구성하세요.',
        );
        setHandleModalAlert(true);
        return;
      } else {
        handleRegister(email, nickname, password);
        return false;
      }
    }
  };

  const handleCloseWelcomeModal = () => {
    setHandleWelcomeModalAlert(false);
    history.push('/login');
  };

  const handleCloseModal = () => {
    setHandleModalAlert(false);
  };

  return (
    <>
      <Signup handleChange={handleChange} postSignupReq={postSignupReq} />
      <ModalAlert
        title="환영합니다!"
        isVisible={handleWelcomeModalAlert}
        handleCloseModal={handleCloseWelcomeModal}
      />
      <ModalAlert
        title={`${modalMessage}`}
        isVisible={handleModalAlert}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}
