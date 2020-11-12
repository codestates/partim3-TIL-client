import React, { ChangeEvent, useState } from 'react';
import ButtonBoot from '../UI/atoms/ButtonBoot';
import { Link } from 'react-router-dom';

import FormBoot from '../UI/atoms/FormBoot';

import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { BsFillAwardFill } from 'react-icons/bs';

import { useSelector, useDispatch } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../../modules/signup';

import axios from 'axios';

export default function SignupContainer() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const dispatch = useDispatch();

  const handleChange = (
    event: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    let targetName = event.target.name;
    if (targetName === 'email') {
      setEmail(event.target.value);
    }
    if (targetName === 'nickname') {
      setNickname(event.target.value);
    }
    if (targetName === 'password') {
      setPassword(event.target.value);
    }
    if (targetName === 'passwordConfirm') {
      setPasswordConfirm(event.target.value);
    }
  };

  const handleRegister = (email: string, nickname: string, password: string) => {
    dispatch(signupStart());

    return axios
      .post(
        `http://localhost:5000/users/signup`,
        {
          email,
          nickname,
          password,
        },
        { withCredentials: true },
      )
      .then(res => {
        dispatch(signupSuccess());
        alert('환영합니다');
      })
      .catch(err => {
        alert(`잘못한거 같은데요!`);
        dispatch(signupFailure());
      });
  };

  const postSignupReq = () => {
    if (password === '') {
      alert('비밀번호를 입력하지 않으셨습니다. 비밀번호를 입력해 주세요.');
    } else if (password !== passwordConfirm) {
      alert('입력하신 비밀번호가 서로 다릅니다. 동일한 비밀번호를 입력해 주세요.');
    } else {
      let passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
      if (!passwordValidation.test(password)) {
        alert(
          '비밀번호가 조건에 맞지 않습니다. 8~12글자 사이의 영문 대소문자와 숫자의 조합으로 구성하세요.',
        );
      } else {
        handleRegister(email, nickname, password);
        return false;
      }
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
