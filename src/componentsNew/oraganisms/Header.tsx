import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';
import './Header.css';
import { sidebarStatus } from '../../modules/sideBarM';
import NaviButton from '../molecules/NaviButton';
import { ButtonAtom } from '../atoms';
import { RootState } from '../../modules';

import {
  handleTodayStart,
  handleTodaySuccess,
  handleTodayFailure,
} from '../../modules/handleToday';
import date from '../utils/todayF';

export default function Header() {
  const [sidebar, setSidebar] = useState(true);
  const [sW, setSW] = useState(2);
  const showSidebar = () => {
    setSidebar(!sidebar);
    sidebar ? setSW(0) : setSW(2);
    dispatch(sidebarStatus(sidebar, sW));
  };

  const { today } = useSelector((state: RootState) => state.handleToday);

  const dispatch = useDispatch();

  const goToday = () => {
    dispatch(handleTodayStart());

    dispatch(handleTodaySuccess(date));
  };

  let todayView =
    String(today.year) + '년 ' + String(today.month) + '월 ' + String(today.day) + '일';

  useEffect(() => {
    showSidebar();
  }, []);

  return (
    <>
      <Col style={{ border: '1px solid black' }}>
        <GiHamburgerMenu size="3em" onClick={showSidebar} />
      </Col>
      <Col style={{ border: '1px solid black' }}>
        <Link to="/">logo(main page link?)</Link>
      </Col>
      <Col style={{ border: '1px solid black' }}>
        <ButtonAtom text="today button" onClick={goToday} />
      </Col>
      <Col style={{ border: '1px solid black' }}>
        <NaviButton />
      </Col>
      <Col style={{ border: '1px solid black' }}>{todayView}</Col>
    </>
  );
}
