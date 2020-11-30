import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { RootState } from '../modules';

import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { BsFillAwardFill } from 'react-icons/bs';

import ButtonBoot from '../componentsNew/atoms/ButtonBoot';
import { loginStart, loginSuccess, loginFailure } from '../modules/loginOut';

import NaverLogin from '../componentsNew/molecules/login/NaverLogin';
import SocialLoginGoogle from '../componentsNew/molecules/login/SocialLoginGoogle';
import KakaoLogin from 'react-kakao-login';
// import { GoogleLogin } from 'react-google-login';

import dotenv from 'dotenv';
dotenv.config();

declare global {
  interface Window {
    Kakao: any;
  }
}
const Kakao = window.Kakao;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  /*  이미 로그인된 상태에서 /login에 접속하면 막아주는 장치인데, 
      이 기능을 여기서 넣으니까 alert만 괜히 두번 뜬다
      이 기능을 주지 않으면 로그인한 상태에서 /login에 접속이 가능해지므로, 처리하긴 해야 함

      => 일단 로그인 버튼 자체를 안보이게 하자
      => 그래도 주소 입력으로 접속하는 것은 막아야 하는데...

    const { currentUser } = useSelector((state: RootState) => state.loginOut.status);

    if (currentUser) {
      alert('이미 로그인이 되어 있습니다.');
      history.push('/calendar/day');
    }

  */
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);

  // if (currentUser) {
  //   alert('이미 로그인이 되어 있습니다.');
  //   history.push('/calendar/day');
  // }

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

    interface resData {
      id: number;
      nickname: string;
      token: string;
    }

    return axios
      .post<resData>(
        `http://localhost:5000/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      )
      .then(res => {
        const { id, nickname, token } = res.data;
        console.log('token : ', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        dispatch(loginSuccess(id, nickname));
        // 토큰을 localStorage 등에 저장할 필요를 고려해야 할까?
        localStorage.setItem('token', token); // 일단 저장해봄...
        alert('로그인에 성공하셨습니다.');
        history.push('/calendar/day');
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

  // const handleKakaoLogin = () => {
  //   if (!Kakao) {
  //     console.log('서비스가 존재하지 않습니다');
  //   }
  //   Kakao.Auth.login({
  //     success: (auth: any) => {
  //       console.log('정상 로그인 되었습니다 : ' + auth);
  //       console.log('auth : ', JSON.stringify(auth));
  //     },
  //     fail: function (err: any) {
  //       console.error('err', err);
  //     },
  //   });
  // };

  const responseKaKao = (response: any) => {
    console.log('kakao response : ', response);
  };

  const responseFail = (error: any) => {
    console.log('kakao error : ', error);
  };

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
            {/* Button 부트스트랩 컴포넌트에 아이콘 넣는게 나을 것 같다 */}
            <KakaoLogin
              //styled component 통해 style을 입혀 줄 예정
              token={`${process.env.REACT_APP_KAKAO_LOGIN}`}
              //카카오에서 할당받은 jsKey를 입력
              onSuccess={responseKaKao}
              //성공했을때 불러올 함수로서 fetch해서 localStorage에 저장할 함수를 여기로 저장
              onFail={responseFail}
            >
              <Image // 이미지를 버튼에 직접 넣는 방법을 찾아야 한다. 다르게 해서라도
                src="https://kauth.kakao.com/public/widget/login/kr/kr_02_medium.png"
                fluid={false}
              />
            </KakaoLogin>
          </Row>
          <Row className="m-2">
            {/* <ButtonBoot title="naver" color="success"></ButtonBoot> */}
            <NaverLogin />
          </Row>
          <Row className="m-2">
            <SocialLoginGoogle />
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
