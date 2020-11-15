import React from 'react';
import { Form, Row } from 'react-bootstrap';
import { InputAtom, FormLabelAtom } from '../Atoms';

interface InputMoleculeProps {
  text: string;
  controlId?: string;
  type: string;
  name: string;
  placeholder?: string;
  smLabel: number;
  smInput: number;
  handleChange(e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }): void;
}

export default function InputMolecule({
  text,
  controlId,
  type,
  name,
  placeholder,
  smLabel,
  smInput,
  handleChange,
}: InputMoleculeProps) {
  return (
    <Form.Group as={Row} controlId={controlId}>
      <FormLabelAtom smLabel={smLabel} text={text} />

      <InputAtom
        smInput={smInput}
        type={type}
        name={name}
        handleChange={handleChange}
        placeholder={placeholder}
      />
    </Form.Group>
  );
}
