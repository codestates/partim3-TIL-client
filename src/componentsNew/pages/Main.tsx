import React from 'react';
import MainHeader from '../oraganisms/MainHeader';
import styled, { keyframes } from 'styled-components';

export default function Main() {
  return (
    <Container>
      <MainHeader></MainHeader>
      <MainContent>
        <Text1>Moment log</Text1>
        <Text2>TIL</Text2>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
`;

const MainContent = styled.div`
  text-align: center;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const textAni = keyframes`
  0%{
    color: black;
    margin-bottom: -10px;
  }
  30%{
    letter-spacing: 25px;
    margin-bottom: -10px;
  }
  85%{
    letter-spacing: 8px;
    margint-bottom:-40px;
  }
`;

const Text1 = styled.span`
  color: white;
  text-transform: uppercase;
  display: block;
  font-size: 80px;
  font-weight: 700;
  letter-spacing: 8px;
  margin-bottom: 10px;
  background: black;
  position: relative;
  animation: ${textAni} 3s 1;
`;
const Text2 = styled.span`
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  display: block;
  font-size: 60px;
  color: #6ab04c;
`;
