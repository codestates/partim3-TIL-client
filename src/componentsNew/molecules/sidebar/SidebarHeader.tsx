import React, { useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../../../modules';
import { logout } from '../../../modules/loginOut';
import axios from 'axios';

import { handleTodaySuccess } from '../../../modules/handleToday';
import { getCalendarsSuccess } from '../../../modules/getAllCalendars';
import { handleTagsSuccess_Get } from '../../../modules/handleTags';
import { calendarAuth } from '../../../modules/calendarAuthM';
import resetDayF from '../../utils/reSetDayF';
import { ModalAlert, ModalChoice } from '../../atoms';
import { GoogleLogout } from 'react-google-login';

import REACT_APP_URL from '../../../config';

import dotenv from 'dotenv';
dotenv.config();

import styled from 'styled-components';

export default function SidebarHeader() {
  const { currentUser, nickname } = useSelector((state: RootState) => state.loginOut.status);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [logoutModalChoiceOpen, setLogoutModalChoiceOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setLogoutModalOpen(false);
    history.push('/');
    dispatch(logout());
    dispatch(handleTodaySuccess(resetDayF()));
    dispatch(getCalendarsSuccess([], []));
    dispatch(handleTagsSuccess_Get([]));
    dispatch(calendarAuth([]));
  };

  const handleLogout2 = () => {
    // console.log(googleResponse);
    if (!currentUser) {
      alert('로그인이 되어있지 않습니다.');
      return;
    }

    // if (googleResponse.error) {
    //   alert('Google Social Logout에 실패하셨습니다. 다시 시도해 주세요.');
    //   return;
    // }

    return axios
      .post(
        `${REACT_APP_URL}/users/logout`,
        {
          userId: currentUser,
        },
        { withCredentials: true },
      )
      .then(() => {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
        setLogoutModalOpen(true);
        // 이 뒤의 처리는, 모달창을 닫는 확인버튼 클릭으로 실행될 handleCloseModal 에서 진행
      })
      .catch(err => console.log({ err }));
  };

  //나중에 정리해야할듯. 함수가 반복사용되므로 분리하기.

  // 구글로그아웃은 함수를 아예 따로 만드는게 나을듯
  // const handleLogout = (googleResponse?: any) => {
  const handleLogout = () => {
    // console.log(googleResponse);
    if (!currentUser) {
      alert('로그인이 되어있지 않습니다.');
      return;
    }

    // if (googleResponse.error) {
    //   alert('Google Social Logout에 실패하셨습니다. 다시 시도해 주세요.');
    //   return;
    // }

    return axios
      .post(
        `${REACT_APP_URL}/users/logout`,
        {
          userId: currentUser,
        },
        { withCredentials: true },
      )
      .then(() => {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
        // setLogoutModalOpen(true);
        // 이 뒤의 처리는, 모달창을 닫는 확인버튼 클릭으로 실행될 handleCloseModal 에서 진행
        history.push('/');
        dispatch(logout());
        dispatch(handleTodaySuccess(resetDayF()));
        dispatch(getCalendarsSuccess([], []));
        dispatch(handleTagsSuccess_Get([]));
        // dispatch();
      })
      .catch(err => console.log({ err }));
  };

  let logoutModal = (
    <ModalAlert
      title="로그아웃 되었습니다."
      isVisible={logoutModalOpen}
      handleCloseModal={handleCloseModal}
    />
  );

  const handleCloseModalChoice = () => {
    setLogoutModalChoiceOpen(!logoutModalChoiceOpen);
  };

  let logoutModalChoice = (
    <ModalChoice
      title="로그아웃 하시겠습니까?"
      isVisible={logoutModalChoiceOpen}
      actionFunction={handleLogout}
      handleCloseModal={handleCloseModalChoice}
    />
  );

  return (
    <SidebarHeaderContainer>
      <Link
        to={`/mypage/profile`}
        style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}
      >
        <h3>{nickname} 님</h3>
      </Link>
      <h4 style={{ alignSelf: 'center' }}>안녕하세요</h4>
      {/* <div onClick={handleCloseModalChoice}> 환영합니다!</div> */}

      <BtnArea>
        <Btn onClick={handleLogout2}>logout</Btn>
        <Link
          to="/mypage/profile"
          style={{ textDecoration: 'none', color: 'black', display: 'flex' }}
        >
          <Btn>setting</Btn>
        </Link>
      </BtnArea>
      {logoutModal}
      {logoutModalChoice}
    </SidebarHeaderContainer>
  );
}

// background: yellow;
const SidebarHeaderContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const BtnArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Btn = styled.button`
  flex: 1;
  outline: none;
  border: 0px;
  border-radius: 2px;
  background-color: #7da453;
  margin-bottom: 4px;
  padding: 3px;

  &:hover {
    background-color: #f0f2f1;
    color: black;
  }
`;
