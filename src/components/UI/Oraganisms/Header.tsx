import React from 'react';
import { Col } from 'react-bootstrap';

export default function Header() {
  return (
    <>
      <Col style={{ border: '1px solid black' }} xs={2} sm={1}>
        hamburger button
      </Col>
      <Col style={{ border: '1px solid black' }} xs={2}>
        logo(main page link?)
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
