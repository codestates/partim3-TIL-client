import React from 'react';
import { Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NaviButton } from '../Molecules';
import { ButtonAtom } from '../Atoms';
import { RootState } from '../../../modules';
import { useSelector, useDispatch } from 'react-redux';
import {
  handleTodayStart,
  handleTodaySuccess,
  handleTodayFailure,
} from '../../../modules/handleToday';
import date from '../../UI/Atoms/todayF';

export default function Header() {
  const handleSideBar = () => {
    alert('sideBar Open?');
  };

  const { today } = useSelector((state: RootState) => state.handleToday);

  const dispatch = useDispatch();

  const goToday = () => {
    dispatch(handleTodayStart());

    dispatch(handleTodaySuccess(date));
  };

  let todayView =
    String(today.year) + '년 ' + String(today.month) + '월 ' + String(today.day) + '일';

  return (
    <>
      <Col style={{ border: '1px solid black' }} xs={2} sm={1}>
        <GiHamburgerMenu size="3em" onClick={handleSideBar} />
        {/* 모양이 영 별로인데, 다른 방법을 찾아야 할 듯 */}
      </Col>
      <Col style={{ border: '1px solid black' }} xs={2}>
        <Link to="/">logo(main page link?)</Link>
      </Col>
      <Col style={{ border: '1px solid black' }} xs={2}>
        <ButtonAtom text="today button" onClick={goToday} />
      </Col>
      <Col style={{ border: '1px solid black' }} xs={2}>
        <NaviButton />
      </Col>
      <Col style={{ border: '1px solid black' }} xs={4} sm={5}>
        {todayView}
      </Col>
    </>
  );
}
