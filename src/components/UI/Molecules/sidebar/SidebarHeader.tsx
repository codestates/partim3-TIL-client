import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../../../../modules';
import { logout } from '../../../../modules/loginOut';
import axios from 'axios';

export default function SidebarHeader() {
  const { currentUser, nickname } = useSelector((state: RootState) => state.loginOut.status);
  let val = 5.7;
  const history = useHistory();
  const dispatch = useDispatch();

  //나중에 정리해야할듯. 함수가 반복사용되므로 분리하기.
  const handleLogout = () => {
    if (!currentUser) {
      alert('로그인이 되어있지 않습니다.');
      return;
    }
    return axios
      .post(`http://localhost:5000/users/logout`, {}, { withCredentials: true })
      .then(() => {
        dispatch(logout());
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
        alert('로그아웃되었습니다.');
        history.push('/');
      });
  };

  return (
    <Col>
      <Row>
        <Link to="/mypage">
          <Col className="m-auto pb-3">
            <Image src="img/cat.jpeg" height="40" width="40" roundedCircle />
          </Col>
        </Link>
        <Col>{nickname}</Col>
      </Row>
      <Row>
        <Col onClick={handleLogout}>
          <Button>logout</Button>
        </Col>
        <Link to="/mypage">
          <Col>
            <Button>setting</Button>
          </Col>
        </Link>
      </Row>
    </Col>
  );
}
