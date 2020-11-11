import React from 'react';
import { InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

interface InputProps {
  placeholder: string;
  type: string;
  //?는 받아올지 말지 모를때
}

function FormBoot({ placeholder, type }: InputProps) {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Control type={type} placeholder={placeholder} />
      </Form.Group>
    </Form>
  );
}

//span은 inline

export default FormBoot;
