import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Header, TodoContainer } from '../UI/Oraganisms';

export default function Date() {
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
          <TodoContainer />
        </Col>
      </Row>
      <Row style={{ border: '1px solid black' }}>Review</Row>
    </Container>
  );
}
