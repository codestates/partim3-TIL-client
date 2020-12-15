import React, { useState } from 'react';

import styled from 'styled-components';

interface ModalAlertProps {
  message: string;
  trueOrFalse: boolean;
  closeModal: (trueOrFalse: boolean) => void;
}

// 모달 불러올 때 :
// closeModal 함수를 여기로 넘겨주기,
// openModal 함수 및 열고닫는 상태를 상위 컴포넌트에서 만들기

export default function ModalAlert({ message, trueOrFalse, closeModal }: ModalAlertProps) {
  console.log('여기?');
  let modalAlert = (
    <div>
      <div>
        <h5>{message}</h5>
      </div>
      <hr style={{ borderColor: 'black' }}></hr>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => closeModal(false)} style={{ margin: '5px' }}>
          확인
        </button>
      </div>
    </div>
  );

  return (
    <ModalAlertWrap
      style={{
        position: 'absolute',
        zIndex: 1,
      }}
    >
      <ModalAlertBackground>
        <ModalAlertContents>{modalAlert}</ModalAlertContents>
      </ModalAlertBackground>
    </ModalAlertWrap>
  );
}

const ModalAlertWrap = styled.div`
  position: 'absolute';
  z-index: 1;
`;

const ModalAlertBackground = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalAlertContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  width: 350px;
  height: 120px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: white;
  z-index: 5;
`;
