// 각 url의 최상단이 page : 이 곳이 구역을 나누는 templete이 되어야 할 것이라고 생각함.
// 상태관리 역시 최상단의 page(templete)에서 통합해서 해야하는 것이 아닌가?

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { RootState } from '../modules';
import {
  getUserInfoStart,
  getUserInfoSuccess,
  getUserInfoFailure,
  updateUerInfoStart,
  updateUserInfoSuccess,
  updateUserInfoFailure,
} from '../modules/handleUserInfo';

import MypageSetting from '../componentsNew/pages/MypageSetting';

export default function MypageSettingContainer() {
  const [nickname, setNickname] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const userInfoState = useSelector((state: RootState) => state.handleUserInfo); // 끝에 [] 해줘야하는데 에러가 난다
  // userInfo get 요청에 대응하는 API가 없으므로, 위 코드는 지금은 쓰이질 않고 있음

  const loginStatus = useSelector((state: RootState) => state.loginOut.status);
  const currentUser = loginStatus.currentUser as number;
  const currentNickname = loginStatus.nickname as string;
  // 일단 이렇게 처리는 하는데, mypage의 userInfo get 요청을 통해 받아오는 nickname을 내려주도록 변경해야 한다.
  // (userInfo get 요청에 대응하는 API를 서버에서 만들어주셔야 함)

  const history = useHistory();
  const dispatch = useDispatch();

  if (!currentUser) {
    alert('로그인하셔야 마이메이지에 접속하실 수 있습니다.');
    history.push('./login');
  }

  const handleChange = (
    e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    let targetName = e.target.name;
    if (targetName === 'nickname') {
      setNickname(e.target.value);
    }
    if (targetName === 'oldPassword') {
      setOldPassword(e.target.value);
    }
    if (targetName === 'newPassword') {
      setNewPassword(e.target.value);
    }
    if (targetName === 'newPasswordConfirm') {
      setNewPasswordConfirm(e.target.value);
    }
  };

  const updateUserInfoReq = () => {
    if (nickname === '' && oldPassword === '' && newPassword === '' && newPasswordConfirm === '') {
      alert('입력값이 없습니다. 수정하시려는 항목을 입력해 주세요.');
    } else if (newPassword !== newPasswordConfirm) {
      alert('입력하신 새로운 비밀번호가 서로 다릅니다. 동일한 비밀번호를 입력해 주세요.');
    } else if (nickname.length > 16) {
      alert('닉네임은 16글자 이하로 입력해 주세요.');
    } else {
      let passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
      if (newPassword.length > 0 && !passwordValidation.test(newPassword)) {
        alert(
          '비밀번호가 조건에 맞지 않습니다. 8~12글자 사이의 영문 대소문자와 숫자의 조합으로 구성하세요.',
        );
      } else {
        if (nickname.length > 0) {
          (document.querySelector('.nickname') as HTMLInputElement).value = '';
          // updateUserInfo(currentUser, nickname, null, null);
          updateUserInfo(currentUser, nickname, null, null);
        } else {
          (document.querySelector('.oldPassword') as HTMLInputElement).value = '';
          (document.querySelector('.newPassword') as HTMLInputElement).value = '';
          (document.querySelector('.newPasswordConfirm') as HTMLInputElement).value = '';
          updateUserInfo(currentUser, null, oldPassword, newPassword);
        }
      }
    }
  };

  const getUserInfo = (currentUserId: string) => {
    dispatch(getUserInfoStart());

    return axios
      .get(`http://localhost:5000/users/${currentUserId}`, {
        withCredentials: true,
      })
      .then(userInfo => {
        console.log('userInfo.data : ', userInfo.data); // 잘 받아온다
        dispatch(getUserInfoSuccess(userInfo.data));
        history.push('/mypage');
      })
      .catch(error => {
        dispatch(getUserInfoFailure());
      });
  };

  const updateUserInfo = (
    currentUser: number,
    nickname: string | null,
    password: string | null,
    newPassword: string | null,
  ) => {
    dispatch(updateUerInfoStart());

    return axios
      .put(
        `http://localhost:5000/users/users/${currentUser}`,
        {
          id: currentUser,
          nickname: nickname,
          password: password,
          newPassword: newPassword,
        },
        {
          withCredentials: true,
        },
      )
      .then(response => {
        dispatch(updateUserInfoSuccess());
        // 여기다 모달 : handleShow();
        alert('업데이트 성공');
        history.push('/mypage');
        // getUserInfo(loginState.status.currentUser);
        getUserInfo('1');
        // 개선점 2 : 리디렉트가 깔끔하지 않고, 정보변경 후에 입력창의 값을 지우고 싶다.
        // alert이 없으면 닉네임은 변경된 값이 곧바로 적용되어 렌더링되지 않고 있음 (변경 자체는 잘 된다.)
      })
      .catch(error => {
        dispatch(updateUserInfoFailure());
      });
  };

  // useEffect(() => {
  //   getUserInfo(loginState.status.currentUser);
  // }, []);

  return (
    <MypageSetting
      currentNickname={currentNickname}
      updateUserInfoReq={updateUserInfoReq}
      handleChange={handleChange}
    />
  );
}
