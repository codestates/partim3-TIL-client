import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';

import './Header.css';

import { sidebarStatus } from '../../../modules/sideBarM';

export default function Header() {
  const [sidebar, setSidebar] = useState(true);
  const [sW, setSW] = useState(2);
  const showSidebar = () => {
    setSidebar(!sidebar);
    sidebar ? setSW(0) : setSW(2);
    dispatch(sidebarStatus(sidebar, sW));
  };

  //리덕스에 저장을 해야할까?
  //리덕스에 저장을 하면 어디서든 접근이 가능하다. 따라서 상위에서 그리드 설정이 가능.
  //햄버거 메뉴가 하위에 소속되어 있는데, 그리드 설정은 calDay에서 이루어지므로 리덕스에 상태값을 저장할 필요가 있다.

  const dispatch = useDispatch();

  useEffect(() => {
    showSidebar();
  }, []);

  return (
    <>
      <Col style={{ border: '1px solid black' }} xs={2}>
        <GiHamburgerMenu size="3em" onClick={showSidebar} />
      </Col>
      <Col style={{ border: '1px solid black' }} xs={2}>
        <Link to="/">logo(main page link?)</Link>
      </Col>
      <Col style={{ border: '1px solid black' }} xs={2}>
        today button
      </Col>
      <Col style={{ border: '1px solid black' }} xs={2}>
        navi button
      </Col>
      <Col style={{ border: '1px solid black' }} xs={4}>
        month date year
      </Col>
    </>
  );
}
