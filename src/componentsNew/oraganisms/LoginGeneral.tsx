import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { BsFillAwardFill } from 'react-icons/bs';

import ButtonBoot from '../atoms/ButtonBoot';

interface LoginGeneralProps {
  handleChange: (
    event: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => void;
  postLoginReq: () => void;
}

export default function LoginGeneral({ handleChange, postLoginReq }: LoginGeneralProps) {
  return (
    <>
      {/* 이메일 */}
      <Row className="m-auto">
        <Col xs={2} sm={2} md={2}>
          <BsFillAwardFill className="m-2"></BsFillAwardFill>
        </Col>
        <Col xs={10} sm={10} md={10}>
          {/* <FormBoot type="email" placeholder="email" name="email" onchange={}></FormBoot> */}
          <Form.Control type="email" placeholder="email" name="email" onChange={handleChange} />
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
      {/* 일반로그인 버튼 */}
      <Row className="m-2">
        <ButtonBoot title="Get start!" color="success" postSignupReq={postLoginReq}></ButtonBoot>
      </Row>
    </>
  );
}
