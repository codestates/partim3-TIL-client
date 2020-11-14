import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { RootState } from '../../modules';
import {
  getUserInfoStart,
  getUserInfoSuccess,
  getUserInfoFailure,
  updateUerInfoStart,
  updateUserInfoSuccess,
  updateUserInfoFailure,
} from '../../modules/handleUserInfo';

function MypageContainer() {
  const [nickname, setNickname] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const userInfoState = useSelector((state: RootState) => state.handleUserInfo); // 끝에 [] 해줘야하는데 에러가 난다

  // const loginState = useSelector((state: RootState) => state.loginLogout, []);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (
    e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    let targetName = e.target.name;
    if (targetName === 'nickname') {
      setNickname(e.target.value);
    }
    if (targetName === 'oldPassword') {
      setOldPassword(e.target.value);
    }
    if (targetName === 'newPassword') {
      setNewPassword(e.target.value);
    }
    if (targetName === 'newPasswordConfirm') {
      setNewPasswordConfirm(e.target.value);
    }
  };

  const updateUserInfoReq = () => {
    if (nickname === '' && oldPassword === '' && newPassword === '' && newPasswordConfirm === '') {
      alert('입력값이 없습니다. 수정하시려는 항목을 입력해 주세요.');
    } else if (newPassword !== newPasswordConfirm) {
      alert('입력하신 새로운 비밀번호가 서로 다릅니다. 동일한 비밀번호를 입력해 주세요.');
    } else if (nickname.length > 16) {
      alert('닉네임은 16글자 이하로 입력해 주세요.');
    } else {
      let passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
      if (newPassword.length > 0 && !passwordValidation.test(newPassword)) {
        alert(
          '비밀번호가 조건에 맞지 않습니다. 8~12글자 사이의 영문 대소문자와 숫자의 조합으로 구성하세요.',
        );
      } else {
        if (nickname.length > 0) {
          (document.querySelector('.nickname') as HTMLInputElement).value = '';
          // updateUserInfo(currentUser, nickname, null, null);
          updateUserInfo('1', nickname, null, null);
        } else {
          (document.querySelector('.oldPassword') as HTMLInputElement).value = '';
          (document.querySelector('.newPassword') as HTMLInputElement).value = '';
          (document.querySelector('.newPasswordConfirm') as HTMLInputElement).value = '';
          updateUserInfo('1', null, oldPassword, newPassword);
        }
      }
    }
  };

  const getUserInfo = (currentUserId: string) => {
    dispatch(getUserInfoStart());

    return axios
      .get(`http://localhost:5000/users/${currentUserId}`, {
        withCredentials: true,
      })
      .then(userInfo => {
        console.log('userInfo.data : ', userInfo.data); // 잘 받아온다
        dispatch(getUserInfoSuccess(userInfo.data));
        history.push('/mypage');
      })
      .catch(error => {
        dispatch(getUserInfoFailure());
      });
  };

  const updateUserInfo = (
    currentUser: string,
    nickname: string | null,
    password: string | null,
    newPassword: string | null,
  ) => {
    dispatch(updateUerInfoStart());

    return axios
      .put(
        `http://localhost:5000/users/users/${currentUser}`,
        {
          id: currentUser,
          nickname: nickname,
          password: password,
          newPassword: newPassword,
        },
        {
          withCredentials: true,
        },
      )
      .then(response => {
        dispatch(updateUserInfoSuccess());
        // 여기다 모달 : handleShow();
        alert('업데이트 성공');
        history.push('/mypage');
        // getUserInfo(loginState.status.currentUser);
        getUserInfo('1');
        // 개선점 2 : 리디렉트가 깔끔하지 않고, 정보변경 후에 입력창의 값을 지우고 싶다.
        // alert이 없으면 닉네임은 변경된 값이 곧바로 적용되어 렌더링되지 않고 있음 (변경 자체는 잘 된다.)
      })
      .catch(error => {
        dispatch(updateUserInfoFailure());
      });
  };

  // useEffect(() => {
  //   getUserInfo(loginState.status.currentUser);
  // }, []);

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
        {/* Setting 과 Done 버튼 */}
        <Row
          style={{
            height: '15%',
            border: '1px solid black',
          }}
        >
          <Col
            className="col-8"
            style={{
              border: '1px solid black',
            }}
          >
            Setting
          </Col>
          <Col
            className="col-4"
            style={{
              border: '1px solid black',
            }}
          >
            <Button
              className="w-100 mb-4"
              variant="secondary"
              type="button"
              onClick={updateUserInfoReq}
            >
              회원정보 수정하기
            </Button>
          </Col>
        </Row>
        {/* 아이콘, 성명, 기타 본문 */}
        <Row
          className="row-2"
          style={{
            height: '15%',
            border: '1px solid black',
          }}
        >
          아이콘 및 기본정보(?)
        </Row>
        <Form.Group as={Row} controlId="formBasicEmail">
          <Form.Label column sm={4} className="text-left pr-0">
            nickname
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              className="nickname"
              type="text"
              name="nickname"
              onChange={handleChange}
              // placeholder={currentNickname}
              placeholder="현재 닉네임을 띄울 자리"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formBasicPassword">
          <Form.Label column sm={4} className="text-left pr-0">
            기존 비밀번호
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              className="oldPassword"
              type="password"
              name="oldPassword"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBasicPassword">
          <Form.Label column sm={4} className="text-left pr-0">
            새 비밀번호
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              className="newPassword"
              type="password"
              name="newPassword"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBasicPassword">
          <Form.Label column sm={4} className="text-left pr-0">
            새 비밀번호 확인
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              className="newPasswordConfirm"
              type="password"
              name="newPasswordConfirm"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
      </Container>
    </>
  );
}

export default MypageContainer;
