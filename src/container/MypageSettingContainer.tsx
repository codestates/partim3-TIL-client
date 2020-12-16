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
import { MypageHeaderAndSidebar } from '../componentsNew/oraganisms';

export default function MypageSettingContainer() {
  const [newNickname, setNewNickname] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

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
      setNewNickname(e.target.value);
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
    if (newNickname === '' && newPassword === '') {
      alert('입력값이 없습니다. 수정하시려는 항목을 입력해 주세요.');
      return;
    } else if (oldPassword === '') {
      alert('기존 비밀번호는 필수 입력사항입니다.');
      return;
    } else if (newPassword !== newPasswordConfirm) {
      alert('입력하신 새로운 비밀번호가 서로 다릅니다. 동일한 비밀번호를 입력해 주세요.');
      return;
    } else if (newNickname.length > 16) {
      alert('닉네임은 16글자 이하로 입력해 주세요.');
      return;
    } else {
      let passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
      if (newPassword.length > 0 && !passwordValidation.test(newPassword)) {
        alert(
          '비밀번호가 조건에 맞지 않습니다. 8~12글자 사이의 영문 대소문자와 숫자의 조합으로 구성하세요.',
        );
        return;
      } else {
        if (newNickname.length > 0 && newPassword.length === 0) {
          // 새 닉네임은 입력됐고 새 비밀번호가 없다면, (닉네임만 변경하고 비밀번호는 변경하지 않는다면,)
          updateUserInfo(currentUser, newNickname, oldPassword, null);
          (document.querySelector('.newNickname') as HTMLInputElement).value = '';
          setNewNickname('');
          (document.querySelector('.oldPassword') as HTMLInputElement).value = '';
          setOldPassword('');
        } else if (newNickname.length === 0 && newPassword.length > 0) {
          // 새 닉네임은 없고 새 비밀번호가 입력됐다면, (닉네임은 변경하지 않고 비밀번호는 변경한다면,)
          updateUserInfo(currentUser, currentNickname, oldPassword, newPassword);
          (document.querySelector('.oldPassword') as HTMLInputElement).value = '';
          setOldPassword('');
          (document.querySelector('.newPassword') as HTMLInputElement).value = '';
          setNewPassword('');
          (document.querySelector('.newPasswordConfirm') as HTMLInputElement).value = '';
          setNewPasswordConfirm('');
        } else if (newNickname.length > 0 && newPassword.length > 0) {
          // 새 닉네임과 새 비밀번호가 모두 입력됐다면, (닉네임과 비밀번호를 모두 변경한다면,)
          updateUserInfo(currentUser, newNickname, oldPassword, newPassword);
          (document.querySelector('.newNickname') as HTMLInputElement).value = '';
          setNewNickname('');
          (document.querySelector('.oldPassword') as HTMLInputElement).value = '';
          setOldPassword('');
          (document.querySelector('.newPassword') as HTMLInputElement).value = '';
          setNewPassword('');
          (document.querySelector('.newPasswordConfirm') as HTMLInputElement).value = '';
          setNewPasswordConfirm('');
        }
      }
    }
  };

  // 닉네임 변경시에 이 컴포넌트만 새롭게 렌더링할건데, 이 때 변경된 닉네임을 즉시 받아오고 싶음
  // 그러므로 이 컴포넌트에서 get 요청이 필요하다 (API 요청하기)
  const getUserInfo = (currentUserId: string) => {
    dispatch(getUserInfoStart());

    return axios
      .get(`http://localhost:5000/users/${currentUserId}`, {
        withCredentials: true,
      })
      .then(userInfo => {
        dispatch(getUserInfoSuccess(userInfo.data));
      })
      .catch(error => {
        dispatch(getUserInfoFailure());
      });
  };

  const updateUserInfo = (
    currentUser: number,
    newNickname: string | null,
    oldPassword: string | null,
    newPassword: string | null,
  ) => {
    dispatch(updateUerInfoStart());

    return axios
      .put(
        `http://localhost:5000/user/updateuser`,
        {
          userId: currentUser,
          nickname: newNickname,
          password: oldPassword,
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
        setIsUpdated(true);
      })
      .catch(error => {
        dispatch(updateUserInfoFailure());
      });
  };

  // useEffect(() => {
  //   getUserInfo(currentUser);
  //   setIsUpdated(false);
  // }, [isUpdated]);

  let childComponent = (
    <MypageSetting
      currentNickname={currentNickname}
      updateUserInfoReq={updateUserInfoReq}
      handleChange={handleChange}
    />
  );

  return <MypageHeaderAndSidebar childComponent={childComponent}></MypageHeaderAndSidebar>;
}
