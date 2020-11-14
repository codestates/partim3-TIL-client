import React, { useState } from 'react';
import ButtonBoot from '../UI/atoms/ButtonBoot';
import { Link } from 'react-router-dom';

import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { BsFillAwardFill } from 'react-icons/bs';

import { useSelector, useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../modules/login';

import NaverLogin from './NaverLogin';

import axios from 'axios';

export default function LoginContainer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleChange = (
    event: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    let targetName = event.target.name;
    if (targetName === 'email') {
      setEmail(event.target.value);
    }
    if (targetName === 'password') {
      setPassword(event.target.value);
    }
  };

  const handleLogin = (email: string, password: string) => {
    dispatch(loginStart());
    // 서버에서 헤더에다가 토큰을 담아서 줌
    // 토큰을 다음번의 모든 요청에다가 헤더에 담아서 던져야 함
    // 서버는 이 요청마다 온느 헤더를 검사해서 기존의 토큰과 비교 검증하고 맞으면 통과, 틀리면 에러

    // 로그아웃시 토큰을 죽이겠다 -> 서버에서 이 토큰을 만료시키고 돌려주면
    // 클라이언트는 다음번의 모든 요청에다가 헤더를 죽여야함.

    return axios
      .post(
        `http://localhost:5000/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      )
      .then(res => {
        dispatch(loginSuccess());
        alert('환영합니다');
      })
      .catch(err => {
        console.log(err);
        dispatch(loginFailure());
      });
  };

  const postLoginReq = () => {
    if (password === '') {
      alert('비밀번호를 입력하지 않으셨습니다. 비밀번호를 입력해 주세요.');
    } else {
      handleLogin(email, password);
      return false;
    }
  };

  return (
    <Container className="py-5">
      <Row>
        <Col className="m-auto" xs={10} sm={8} md={6}>
          {/* 고양이 이미지 */}
          <Col className="m-auto pb-3">
            <Image src="img/cat.jpeg" height="171" width="180" roundedCircle />
          </Col>

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

          <Row className="m-2">
            <ButtonBoot
              title="Get start!"
              color="success"
              postSignupReq={postLoginReq}
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
            {/* <ButtonBoot title="naver" color="success"></ButtonBoot> */}
            <NaverLogin />
          </Row>
          <Row className="m-2">
            <ButtonBoot title="google" color="danger"></ButtonBoot>
          </Row>
          <Row className="m-2">
            <ButtonBoot title="github" color="dark"></ButtonBoot>
          </Row>
          <div className="mt-4">
            <Link to="/signup">아직 계정이 없으신가요?</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
