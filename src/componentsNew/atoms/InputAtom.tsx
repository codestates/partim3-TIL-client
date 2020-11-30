import React from 'react';
import { Form, Col } from 'react-bootstrap';

interface InputAtomProps {
  type: string;
  name: string;
  placeholder?: string;
  smInput: number;
  handleChange(e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }): void;
}

export default function InputAtom({
  smInput,
  type,
  name,
  handleChange,
  placeholder,
}: InputAtomProps) {
  return (
    <Col sm={smInput}>
      <Form.Control type={type} name={name} onChange={handleChange} placeholder={placeholder} />
    </Col>
  );
}
