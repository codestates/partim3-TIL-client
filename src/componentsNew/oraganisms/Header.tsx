import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import './Header.css';

import {
  handleTodayStart,
  handleTodaySuccess,
  handleTodayFailure,
} from '../../modules/handleToday';

import { sidebarStatus } from '../../modules/sideBarM';

import NaviButton from '../molecules/NaviButton';

import getToday from '../utils/todayF';
import { todayProps } from '../../types';

export default function Header(today: todayProps) {
  const [sidebar, setSidebar] = useState(true);
  const [sW, setSW] = useState(2);
  const showSidebar = () => {
    setSidebar(!sidebar);
    sidebar ? setSW(0) : setSW(2);
    dispatch(sidebarStatus(sidebar, sW));
  };

  // console.log(today);
  // const { today } = useSelector((state: RootState) => state.handleToday);

  const dispatch = useDispatch();

  const goToday = () => {
    dispatch(handleTodayStart());
    dispatch(handleTodaySuccess(getToday()));
  };

  let todayView =
    String(today.year) + '년 ' + String(today.month) + '월 ' + String(today.day) + '일';

  useEffect(() => {
    showSidebar();
  }, []);

  return (
    <HeaderWrap>
      <div style={{ flex: 1, border: '1px solid black' }}>
        <GiHamburgerMenu size="3em" onClick={showSidebar} />
      </div>
      <div style={{ flex: 1, border: '1px solid black' }}>
        <Link to="/">(logo)</Link>
      </div>
      <div style={{ flex: 1, border: '1px solid black' }}>
        <TodayButton onClick={goToday}>today btn</TodayButton>
      </div>
      <div style={{ flex: 1, border: '1px solid black' }}>
        <NaviButton />
      </div>
      <div style={{ flex: 1, border: '1px solid black' }}>
        <h4>{todayView}</h4>
      </div>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const TodayButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 5px;
  background-color: skyblue;
`;
