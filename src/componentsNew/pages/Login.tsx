import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';

import LoginGeneral from '../oraganisms/LoginGeneral';
import LoginSocial from '../oraganisms/LoginSocial';

interface LoginProps {
  handleChange: (
    event: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => void;
  postLoginReq: () => void;
}

export default function Login({ handleChange, postLoginReq }: LoginProps) {
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
          {/* 일반 로그인 */}
          <LoginGeneral handleChange={handleChange} postLoginReq={postLoginReq} />
          {/* 가로선 */}
          <hr
            style={{
              backgroundColor: 'gray',
              height: 2,
            }}
          />
          {/* 소셜 로그인 : 네이버, 구글 */}
          <LoginSocial />
          <div className="mt-4">
            <Link to="/signup">아직 계정이 없으신가요?</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
