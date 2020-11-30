import React from 'react';
import { Row } from 'react-bootstrap';

import NaverLogin from '../molecules/login/NaverLogin';
import SocialLoginGoogle from '../molecules/login/SocialLoginGoogle';

export default function LoginSocial() {
  return (
    <>
      <Row className="m-2">
        {/* <ButtonBoot title="naver" color="success"></ButtonBoot> */}
        <NaverLogin />
      </Row>
      <Row className="m-2">
        <SocialLoginGoogle />
      </Row>
    </>
  );
}
