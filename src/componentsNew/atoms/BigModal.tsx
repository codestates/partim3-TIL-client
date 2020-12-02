import React from 'react';
import styled from 'styled-components';

export default function BigModal() {
  type primary = string;

  const ModalMask = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    place-items: center;
  `;
  const Modal = styled.div`
    width: 80vw;
    height: 80vh;
    background-color: yellowgreen;
    margin: 10;
  `;
  const CloseBtn = styled.button<{ primary?: boolean }>`
    background: ${props => (props.primary ? 'palevioletred' : 'white')};
    color: ${props => (props.primary ? 'white' : 'palevioletred')};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  `;

  return <ModalMask>{/* <Modal>
        <CloseBtn primary>X</CloseBtn>
      </Modal> */}</ModalMask>;
}
