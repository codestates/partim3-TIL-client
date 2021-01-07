import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Navbar, Nav, Col } from 'react-bootstrap';
import { RootState } from '../../modules';
import styled from 'styled-components';
import axios from 'axios';
import REACT_APP_URL from '../../config';
import { useHistory } from 'react-router-dom';

import { loginStart, loginSuccess, loginFailure } from '../../modules/loginOut';
import {
  handleTodayStart,
  handleTodaySuccess,
  handleTodayFailure,
} from '../../modules/handleToday';
import getToday from '../../componentsNew/utils/todayF';

export default function MainHeader() {
  const { currentUser, nickname } = useSelector((state: RootState) => state.loginOut.status);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (email: string, password: string) => {
    dispatch(loginStart());

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
        // alert('로그인에 성공하셨습니다.');  // 필요없어 보여서 삭제했음
        history.push('/calendar/day');
      })
      .catch(err => {
        console.log({ err });
        dispatch(loginFailure());
      });
  };

  const handleRegister = () => {
    axios
      .get(`${REACT_APP_URL}/user/lastnumber`, { withCredentials: true })
      .then(res => {
        let lastNumber = Number(res.data) + 1;
        let email = `guest${lastNumber}`;
        let nickname = `guest${lastNumber}`;
        let password = '1234!@#$';
        axios
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
            let userId = res.data.userId;
            axios
              .post(
                `${REACT_APP_URL}/calendar/addcalendar`,
                {
                  userId: userId,
                  name: 'basic calendar',
                  color: '#0693E3',
                },
                { withCredentials: true },
              )
              .then(res => {
                handleLogin(email, password);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => console.log(err));
  };

  const loginSignupView = (
    <Nav>
      <Nav.Link href="/login">로그인</Nav.Link>
      <Nav.Link href="/signup">회원가입</Nav.Link>
      <Nav.Link onClick={handleRegister}>체험하기</Nav.Link>
    </Nav>
  );

  const logoutMypageView = (
    <Nav>
      <Nav.Link href="/mypage/profile">마이페이지</Nav.Link>
      <Nav.Link href="/calendar/day">내 캘린더</Nav.Link>
    </Nav>
  );

  let currentView;

  // if (document.cookie === "") {  // 이 방식은 쿠키에 의존하는데, 브라우저가 쿠키값만을 잃어버리는 경우 상태유지에 버그가 발생한다.
  if (currentUser === null) {
    // 이를 해결해 보기 위해, 현재 로그인한 사람이 존재한다면 그 id값(숫자), 존재하지 않는다면 null이 담기는 currentUser 값을 state에서 받아오도록 함
    currentView = loginSignupView;
  } else {
    currentView = logoutMypageView;
  }

  //

  return (
    <Container fluid>
      <Navbar
        collapseOnSelect
        variant="dark"
        className="justify-content-between"
        style={{ background: 'black', height: '8vh' }}
      >
        <Container fluid>
          <Navbar.Brand href="/">TIL</Navbar.Brand>
          {currentView}
        </Container>
      </Navbar>
    </Container>
  );
}
