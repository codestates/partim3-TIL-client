import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Header, Todos, Reviews } from '../UI/Oraganisms';
import { RootState } from '../../modules';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import calendarDay, {
  calendarStart,
  calendarSuccess,
  calendarFailure,
} from '../../modules/calendarM';

function CalendarDay() {
  //userId,오늘 날짜를 서버로 보내야함
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  const hour = today.getHours();
  const min = today.getMinutes();

  const date = {
    year,
    month,
    day,
    hour,
    min,
  };

  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { todos, reviews } = useSelector((state: RootState) => state.calendarDay.todosAndReviews);

  const dispatch = useDispatch();

  const sendToday = (id: number) => {
    dispatch(calendarStart());

    return axios
      .get(`http://localhost:5000/calendar/day`, {
        params: {
          userId: id,
          date: date,
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

  let containerWidth = '100vw'; // 사이드바 유무에 따라 넓이를 다르게 줄 수 있음

  return (
    <Container
      fluid
      style={{ border: '1px solid black', height: '100vh', width: `${containerWidth}` }}
    >
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
    </Container>
  );
}

export default CalendarDay;
