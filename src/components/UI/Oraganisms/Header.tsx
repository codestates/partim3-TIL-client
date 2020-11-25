import React from 'react';
import { Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Header() {
  const handleSideBar = () => {
    alert('sideBar Open?');
  };

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
        today button
      </Col>
      <Col style={{ border: '1px solid black' }} xs={2}>
        navi button
      </Col>
      <Col style={{ border: '1px solid black' }} xs={4} sm={5}>
        month date year
      </Col>
    </>
  );
}
