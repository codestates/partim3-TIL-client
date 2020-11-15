import React from 'react';

interface TextAtomProps {
  text: string;
}

function TextAtom({ text }: TextAtomProps) {
  return <span>{text}</span>;
}

export default TextAtom;
