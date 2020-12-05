import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { BsFillAwardFill } from 'react-icons/bs';

import ButtonBoot from '../atoms/ButtonBoot';
// import FormBoot from '../atoms/FormBoot';

interface SignupProps {
  handleChange: (
    event: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => void;
  postSignupReq: () => void;
}

export default function Signup({ handleChange, postSignupReq }: SignupProps) {
  return (
    <Container className="py-5">
      <Row>
        <Col className="m-auto" xs={10} sm={8} md={6}>
          {/* 고양이 이미지 */}
          <Col className="m-auto pb-3">
            <Link to="/">
              <Image src="img/cat.jpeg" height="171" width="180" roundedCircle />
            </Link>
          </Col>

          {/* 이메일 */}
          <Row className="m-auto">
            <Col xs={2} sm={2} md={2}>
              <BsFillAwardFill className="m-2"></BsFillAwardFill>
            </Col>
            <Col xs={10} sm={10} md={10}>
              {/* <FormBoot type="email" placeholder="email" name="email" onchange={}></FormBoot> */}
              <Form.Control
                type="email"
                placeholder="email"
                name="email"
                onChange={handleChange}
                autoFocus
              />
            </Col>
          </Row>

          {/* 닉네임 */}
          <Row className="m-auto">
            <Col xs={2} sm={2} md={2}>
              <BsFillAwardFill className="m-2"></BsFillAwardFill>
            </Col>
            <Col xs={10} sm={10} md={10}>
              <Form.Control
                type="nickname"
                placeholder="nickname"
                name="nickname"
                onChange={handleChange}
              ></Form.Control>
            </Col>
          </Row>

          {/* 패스워드 */}
          <Row className="m-auto">
            <Col xs={2} sm={2} md={2}>
              <BsFillAwardFill className="m-2"></BsFillAwardFill>
            </Col>
            <Col xs={10} sm={10} md={10}>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
              ></Form.Control>
            </Col>
          </Row>

          {/* 패스워드확인 */}
          <Row className="m-auto">
            <Col xs={2} sm={2} md={2}>
              <BsFillAwardFill className="m-2"></BsFillAwardFill>
            </Col>
            <Col xs={10} sm={10} md={10}>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="passwordConfirm"
                onChange={handleChange}
              ></Form.Control>
            </Col>
          </Row>

          <Row className="m-2">
            <ButtonBoot
              title="Get start!"
              color="success"
              postSignupReq={postSignupReq}
            ></ButtonBoot>
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
