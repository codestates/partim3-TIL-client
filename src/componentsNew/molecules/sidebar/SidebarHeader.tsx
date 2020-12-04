import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../../../modules';
import { logout } from '../../../modules/loginOut';
import axios from 'axios';

import { handleTodaySuccess } from '../../../modules/handleToday';
import resetDayF from '../../utils/reSetDayF';

import { GoogleLogout } from 'react-google-login';
import dotenv from 'dotenv';
dotenv.config();

export default function SidebarHeader() {
  const { currentUser, nickname } = useSelector((state: RootState) => state.loginOut.status);

  const history = useHistory();
  const dispatch = useDispatch();

  //나중에 정리해야할듯. 함수가 반복사용되므로 분리하기.
  const handleLogout = (googleResponse?: any) => {
    console.log(googleResponse);
    if (!currentUser) {
      alert('로그인이 되어있지 않습니다.');
      return;
    }

    if (googleResponse.error) {
      alert('Google Social Logout에 실패하셨습니다. 다시 시도해 주세요.');
      return;
    }

    return axios
      .post(`http://localhost:5000/users/logout`, {}, { withCredentials: true })
      .then(() => {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
        alert('로그아웃되었습니다.');
        history.push('/');
        dispatch(logout());
        dispatch(handleTodaySuccess(resetDayF()));
      });
  };

  return (
    <Col>
      <Row>
        <Link to="/mypage">
          <Col className="m-auto pb-3">
            <Image src="/img/cat.jpeg" height="40" width="40" roundedCircle />
          </Col>
        </Link>
        <Col>
          <div>{nickname} 님</div>
          <div> 환영합니다!</div>
        </Col>
      </Row>
      <Row>
        <Col onClick={handleLogout}>
          <Button>logout</Button>
        </Col>
        {/* <Col>
          <GoogleLogout
            clientId={`${process.env.REACT_APP_GOOGLE_LOGIN}`}
            onLogoutSuccess={handleLogout}
            onFailure={handleLogout}
          />
        </Col> */}
        <Link to="/mypage">
          <Col>
            <Button>setting</Button>
          </Col>
        </Link>
      </Row>
    </Col>
  );
}
