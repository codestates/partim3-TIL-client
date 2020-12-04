import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import styled from 'styled-components';  // Container를 깨니까 전체 모양이 망가짐
import { Container, Row, Col } from 'react-bootstrap';
import {
  SidebarCal,
  SidebarHeader,
  SidebarMyCal,
  SidebarOtherCal,
  SidebarTag,
} from '../molecules/sidebar';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import {
  getCalendarsStart,
  getCalendarsSuccess,
  getCalendarsFailure,
} from '../../modules/getAllCalendars';

export default function Sidebar() {
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { today } = useSelector((state: RootState) => state.handleToday);
  const [newCalPosted, setNewCalPosted] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const getCalendars = () => {
    if (currentUser === null) {
      alert('로그인되어 있지 않습니다. 로그인 후 시도해 주세요');
      history.push('/login');
    }

    dispatch(getCalendarsStart());

    axios
      .get(`http://localhost:5000/calendar/calendars`, {
        params: {
          userId: currentUser,
        },
        withCredentials: true,
      })
      .then(res => {
        // myCalendar 라고 생각했는데, myCalendars 라고 해야 작동함
        // shareCalendars 이건 아예 오지 않고 있음
        let { myCalendars, shareCalendars } = res.data;
        console.log({ myCalendars, shareCalendars });
        dispatch(getCalendarsSuccess(myCalendars, shareCalendars));
      })
      .catch(err => {
        console.log({ err });
        dispatch(getCalendarsFailure());
      });
  };

  useEffect(() => {
    if (typeof currentUser === 'number') {
      getCalendars();
      setNewCalPosted(false);
    }
  }, [currentUser, today, newCalPosted]);

  return (
    <Container>
      <Row>
        <SidebarHeader></SidebarHeader>
      </Row>
      <Row>
        <SidebarTag></SidebarTag>
      </Row>
      <Row>
        <SidebarCal></SidebarCal>
      </Row>
      <Row>
        <SidebarMyCal setNewCalPosted={setNewCalPosted}></SidebarMyCal>
      </Row>
      <Row>
        <SidebarOtherCal></SidebarOtherCal>
      </Row>
    </Container>
  );
}

// Container를 깨니까 전체 모양이 망가짐
// const SidebarWrap = styled.div`
//   padding-left: 5px;
//   padding-right: 5px;
// `;
