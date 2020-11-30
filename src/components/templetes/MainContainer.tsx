import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, Image, Jumbotron } from 'react-bootstrap';
import { logout } from '../../modules/loginOut';
import { RootState } from '../../modules';
import {
  handleTodayStart,
  handleTodaySuccess,
  handleTodayFailure,
} from '../../modules/handleToday';
import date from '..//UI/Atoms/todayF';
import axios from 'axios';
import MainHeader from '../UI/Oraganisms/MainHeader';
import { relative } from 'path';
import './MainContainer.css';

export default function MainContainer() {
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (!currentUser) {
      alert('로그인이 되어있지 않습니다.');
      return;
    }
    return axios
      .post(`http://localhost:5000/users/logout`, {}, { withCredentials: true })
      .then(() => {
        dispatch(logout());
        dispatch(handleTodaySuccess(date));
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
        alert('로그아웃되었습니다.');
        history.push('/');
      });
  };
  const leapChar =
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtIp3o%2FbtqOxsujKPg%2FOAL6EOrv8qe1gqNHSF2740%2Fimg.png';

  //vh는 비율이다.
  //https://webclub.tistory.com/356

  return (
    <Container
      fluid
      style={{
        height: '100vh',
        background: '#8FBC8F',
      }}
    >
      <Row>
        <MainHeader />
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <Jumbotron fluid className="jumbo">
                <Container>
                  <Row xs={10} sm={12} md={12}>
                    <Col xs={10} sm={12} md={7}>
                      <div className="overlay"></div>
                    </Col>
                    <Col xs={10} sm={12} md={5}>
                      <div>바로바로 의식의 흐름대로 리뷰할 수 있는 스케쥴러 TIL</div>
                      <Link to="/signup">Get Started!</Link>
                    </Col>
                  </Row>
                </Container>
              </Jumbotron>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
