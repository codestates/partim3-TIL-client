import React from 'react';
import { Button } from 'react-bootstrap';

interface ButtonAtomProps {
  text: string;
  color?: string;
  block?: boolean;
}

function ButtonAtom({ text, color, block }: ButtonAtomProps) {
  return (
    <Button variant={color} block={block}>
      {text}
    </Button>
  );
}

export default ButtonAtom;
