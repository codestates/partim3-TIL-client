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
      <div style={{ flex: 0.2 }}>
        <GiHamburgerMenu
          size="3em"
          onClick={showSidebar}
          style={{ color: '#94af76', width: '30px' }}
        />
      </div>
      <Logo>
        <Link to="/" style={{ textDecoration: 'none', color: '#1b5e20', display: 'flex' }}>
          TIL
        </Link>
      </Logo>
      <TodayButton onClick={goToday}>오늘</TodayButton>
      <NaviButton />
      <Today>{todayView}</Today>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  flex: 1;
  margin-left: 10px;
  border-bottom: 1px solid #dadce0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodayButton = styled.button`
  width: 50px;
  height: 30px;
  font-size: 15px;
  outline: none;
  border: 1px solid #dadce0;
  border-radius: 2px;
  color: #3c4043;
  background-color: white;
  &:hover {
    outline: none;
    background-color: #f0f2f1;
    color: black;
  }
`;

const Logo = styled.div`
  flex: 0.5;
  justify-self: flex-start;
  font-size: 25px;
`;

const Today = styled.div`
  flex: 6;
  font-size: 20px;
  color: #3c4043;
`;
