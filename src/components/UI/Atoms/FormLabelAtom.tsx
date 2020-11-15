import React from 'react';
import { Form } from 'react-bootstrap';

interface FormLabelAtomProps {
  text: string;
  smLabel: number;
}

export default function FormLabelAtom({ smLabel, text }: FormLabelAtomProps) {
  return (
    <Form.Label column sm={smLabel} className="text-right pl-0">
      {text}
    </Form.Label>
  );
}
