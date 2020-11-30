import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import { TextAtom } from '../atoms';
import { UserInfo } from '../oraganisms';

interface MypageSettingProps {
  currentNickname: string;
  updateUserInfoReq: () => void;
  handleChange: (e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }) => void;
}

export default function MypageSetting({
  currentNickname,
  updateUserInfoReq,
  handleChange,
}: MypageSettingProps) {
  return (
    <>
      <Row className="py-3 m-0" style={{ border: '1px solid black' }}>
        <Col>
          <Link to="/">
            <TextAtom text="Header" />
          </Link>
        </Col>
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

        <UserInfo handleChange={handleChange} currentNickname={currentNickname} />
      </Container>
    </>
  );
}
