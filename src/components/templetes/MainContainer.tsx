import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function MainContainer() {
  return (
    <>
      <Row className="py-3 m-0" style={{ border: '1px solid black' }}>
        <Col>Header</Col>
      </Row>
      <Container
        fluid={true}
        style={{
          height: '900px',
        }}
      >
        <Row
          style={{
            height: '100%',
            border: '1px solid black',
            backgroundImage: 'url(' + 'img/main.jpg' + ')',
            backgroundSize: 'cover',
          }}
        >
          <Col className="p-5">
            <Link to="/signup">
              <Button size="lg">Get Started!</Button>
            </Link>
            <Link to="/mypage">
              <Button size="lg">Mypage</Button>
            </Link>
            <Link to="/login">
             <Button size="lg">login</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}
