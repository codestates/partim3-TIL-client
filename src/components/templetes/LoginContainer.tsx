// import KakaoLogin from 'react-kakao-login';
declare global {
  interface Window {
    Kakao: any;
  }
}
const Kakao = window.Kakao;

import { GoogleLogin } from 'react-google-login';

import React, { useState } from 'react';
import ButtonBoot from '../UI/Atoms/ButtonBoot';
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
        // 서 : 서버에서 헤더에다가 토큰을 담아서 줌
        // 클 : 토큰을 다음번의 모든 요청에다가 헤더에 담아서 던져야 함
        // 서 : 서버는 이 요청마다 오는헤더를 검사해서 기존 토큰과 비교 검증하고 맞으면-> 틀ㄹ리면 에러

        // 클 : 토큰을 죽이겠다 ->
        // 서 : 검증 후 서버에서 이 토큰을 만료시키고, 돌려주면,
        // 클 : 클라이언트는 다음번의 모든 요청에다가 헤더를 죽여야 함
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

  const handleKakaoLogin = () => {
    if (!Kakao) {
      console.log('서비스가 존재하지 않습니다');
    }
    Kakao.Auth.login({
      success: (auth: any) => {
        console.log('정상 로그인 되었습니다 : ' + auth);
        console.log('auth : ', JSON.stringify(auth));
      },
      fail: function (err: any) {
        console.error('err', err);
      },
    });
  };

  const responseGoogle = (response: any) => {
    console.log('google response : ', response);
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
            <Button className="p-0" onClick={handleKakaoLogin}>
              <Image // 이미지를 버튼에 직접 넣는 방법을 찾아야 한다. 다르게 해서라도
                src="https://kauth.kakao.com/public/widget/login/kr/kr_02_medium.png"
                fluid={true}
              />
            </Button>
            {/* <KakaoLogin
              //styled component 통해 style을 입혀 줄 예정
              jsKey="bebccbf8d4a69f61c0eadaa2d807fae1"
              //카카오에서 할당받은 jsKey를 입력
              buttonText="카카오 계정으로 로그인"
              //로그인 버튼의 text를 입력
              onSuccess={responseKaKao}
              //성공했을때 불러올 함수로서 fetch해서 localStorage에 저장할 함수를 여기로 저장
              onFailure={responseFail}
              getProfile={true}
            /> */}
          </Row>
          <Row className="m-2">
            {/* <ButtonBoot title="naver" color="success"></ButtonBoot> */}
            <NaverLogin />
          </Row>
          <Row className="m-2">
            <div
              style={{
                display: 'flex',
                flexFlow: 'column wrap',
                textAlign: 'center',
                height: '50px',
                width: '200px',
              }}
            >
              <GoogleLogin
                clientId="my-clientId" // 이거 채워야 하겠지?
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'} // 이거 채워야 하겠지?
              />
            </div>
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
