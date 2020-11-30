import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Navbar, Nav, Col } from 'react-bootstrap';
import { RootState } from '../../modules';

export default function MainHeader() {
  const { currentUser, nickname } = useSelector((state: RootState) => state.loginOut.status);
  const dispatch = useDispatch();

  const loginSignupView = (
    <Nav>
      <Nav.Link href="/login">로그인</Nav.Link>
      <Nav.Link href="/signup">회원가입</Nav.Link>
    </Nav>
  );

  const logoutMypageView = (
    <Nav>
      <Nav.Link href="/mypage">마이페이지</Nav.Link>
      <Nav.Link href="/calendar/day">내 캘린더</Nav.Link>
      {/* <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link> */}
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
        style={{ background: '#8FBC8F' }}
      >
        <Container fluid>
          <Navbar.Brand href="/">TIL</Navbar.Brand>
          {currentView}
        </Container>
      </Navbar>
    </Container>
  );
}
