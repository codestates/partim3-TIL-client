import React from 'react';
import ButtonBoot from '../UI/atoms/ButtonBoot';
import Text from '../UI/atoms/Text';
import { Link } from 'react-router-dom';

import FormBoot from '../UI/atoms/FormBoot';

import { Container, Row, Col, Image } from 'react-bootstrap';
import { BsFillAwardFill } from 'react-icons/bs';

export default function SignupContainer() {
  return (
    <Container className="py-5">
      <Row>
        <Col className="m-auto" xs={10} sm={8} md={6}>
          <Col className="m-auto pb-3">
            <Image src="img/cat.jpeg" height="171" width="180" roundedCircle />
          </Col>
          <Row className="m-auto">
            <Col xs={2} sm={2} md={2}>
              <BsFillAwardFill className="m-2"></BsFillAwardFill>
            </Col>
            <Col xs={10} sm={10} md={10}>
              <FormBoot type="email" placeholder="email"></FormBoot>
            </Col>
          </Row>
          <Row className="m-auto">
            <Col xs={2} sm={2} md={2}>
              <BsFillAwardFill className="m-2"></BsFillAwardFill>
            </Col>
            <Col xs={10} sm={10} md={10}>
              <FormBoot type="nickname" placeholder="nickname"></FormBoot>
            </Col>
          </Row>
          <Row className="m-auto">
            <Col xs={2} sm={2} md={2}>
              <BsFillAwardFill className="m-2"></BsFillAwardFill>
            </Col>
            <Col xs={10} sm={10} md={10}>
              <FormBoot type="password" placeholder="password"></FormBoot>
            </Col>
          </Row>
          <Row className="m-2">
            <ButtonBoot title="Get start!" color="success"></ButtonBoot>
          </Row>
          <hr
            style={{
              backgroundColor: 'gray',
              height: 2,
            }}
          />
          <Row className="m-2">
            <ButtonBoot title="kakao" color="warning"></ButtonBoot>
          </Row>
          <Row className="m-2">
            <ButtonBoot title="naver" color="success"></ButtonBoot>
          </Row>
          <Row className="m-2">
            <ButtonBoot title="google" color="danger"></ButtonBoot>
          </Row>
          <Row className="m-2">
            <ButtonBoot title="github" color="dark"></ButtonBoot>
          </Row>
          <div className="mt-4">
            <Link to="/login">회원이신가요?</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
