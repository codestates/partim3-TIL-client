import React from 'react';

interface TextProps {
  text: string;
  //?는 받아올지 말지 모를때
}

const hi = 'hi';

function Text({ text }: TextProps) {
  return <span>{text}</span>;
}

//span은 inline

export default Text;
