import React from 'react';
import { Button } from 'react-bootstrap';

interface ButtonAtomProps {
  text: string;
  color?: string;
  block?: boolean;
  onClick?: (params?: any) => any;
}

function ButtonAtom({ text, color, block, onClick }: ButtonAtomProps) {
  return (
    <Button variant={color} block={block} onClick={onClick}>
      {text}
    </Button>
  );
}

export default ButtonAtom;
