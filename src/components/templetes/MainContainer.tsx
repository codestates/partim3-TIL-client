import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { logout } from '../../modules/loginOut';
import { RootState } from '../../modules';

function LogoutContainer() {
  const state = useSelector(
    (state: RootState) =>
      // useSelector : redux store 안의 값들을 읽어온다. (selector function 을 전달하여, Context에 포함된 state 를 가져올 수 있다.)
      state.loginOut, // reducer 함수를 넣어줘야 하는 듯
    // [],
  );
}

// let currentUser = state.status.currentUser;

// const history = useHistory();

// const dispatch = useDispatch();

// const handleLogout = () => {
//   return axios.post(`${REACT_APP_URL}/users/logout`, {}, { withCredentials: true }).then(() => {
//     dispatch(logout());
//     alert('로그아웃되었습니다.');
//     history.push('/');
//   });
// };

// return <Header handleLogout={handleLogout} currentUser={currentUser} />;
export default function MainContainer() {
  return (
    <>
      <Row className="py-3 m-0" style={{ border: '1px solid black' }}>
        <Col>Header</Col>
      </Row>
      <Container
        fluid={true}
        style={{
          height: '900px',
        }}
      >
        <Row
          style={{
            height: '100%',
            border: '1px solid black',
            backgroundImage: 'url(' + 'img/main.jpg' + ')',
            backgroundSize: 'cover',
          }}
        >
          <Col className="p-5">
            <Link to="/signup">
              <Button size="lg">Get Started!</Button>
            </Link>
            <Link to="/mypage">
              <Button size="lg">Mypage</Button>
            </Link>
            <Link to="/login">
              <Button size="lg">login</Button>
            </Link>
            <Link to="/">
              <Button size="lg" onClick={LogoutContainer}>
                logout
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}
