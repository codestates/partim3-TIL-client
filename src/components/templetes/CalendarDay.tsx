import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Container } from 'react-bootstrap';
import { Header, Todos, Reviews } from '../UI/Oraganisms';
import { RootState } from '../../modules';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../UI/Oraganisms/Sidebar';
import date from '../UI/Atoms/todayF';
import axios from 'axios';

import calendarDay, {
  calendarStart,
  calendarSuccess,
  calendarFailure,
} from '../../modules/calendarM';

function CalendarDay() {
  //userId,오늘 날짜를 서버로 보내야함
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { sidebar, sW } = useSelector((state: RootState) => state.sideBarM);

  const dispatch = useDispatch();

  const sendToday = async (id: number | null) => {
    dispatch(calendarStart());

    return axios
      .get(`http://localhost:5000/calendar/day`, {
        params: {
          userId: id,
          date: JSON.stringify(date),
        },
        withCredentials: true,
      })
      .then(res => {
        const { todos, reviews } = res.data;
        dispatch(calendarSuccess(todos, reviews));
      })
      .catch(err => {
        console.log(err);
        dispatch(calendarFailure());
      });
  };

  useEffect(() => {
    if (typeof currentUser === 'number') {
      sendToday(currentUser);
    }
  }, []);

  // console.log('calsidebar', sidebar);
  // 구글 캘린더의 경우 사이드바의 너비를 항상 고정시킴. 이 방식대로 진행.
  // 아주 작은 화면일 때는 사이드바의 불편함을 감수.

  return (
    <Container fluid style={{ border: '1px solid black' }}>
      <Row>
        {sidebar ? (
          <Col xs={3.5} sm={3.5} md={3.5}>
            <Sidebar />
          </Col>
        ) : (
          <span></span>
        )}

        <Col>
          <Row style={{ border: '1px solid black', height: '80px' }}>
            <Header />
          </Row>
          <Row style={{ border: '1px solid black', height: '200px' }}>
            <Col>
              <Todos />
            </Col>
          </Row>
          <Row style={{ border: '1px solid black' }}>
            <Reviews />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default CalendarDay;
