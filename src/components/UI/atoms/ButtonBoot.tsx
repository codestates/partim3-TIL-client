import React from 'react';
import Button from 'react-bootstrap/Button';

interface ButtonProps {
  color: string;
  title: string;
  postSignupReq?: any;
  //?는 받아올지 말지 모를때
}

const ButtonBoot: React.FunctionComponent<ButtonProps> = ({ title, color, postSignupReq }) => {
  function postSignup() {
    postSignupReq();
  }

  return (
    <Button onClick={postSignup} variant={color} size="lg" block>
      {title}
    </Button>
  );
};

export default ButtonBoot;
