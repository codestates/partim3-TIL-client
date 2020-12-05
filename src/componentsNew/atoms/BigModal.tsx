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
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `;
  const CloseBtn = styled.button<{ primary?: boolean }>`
    background: ${props => (props.primary ? 'palevioletred' : 'white')};
    color: ${props => (props.primary ? 'white' : 'palevioletred')};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    align-self: flex-end;
  `;
  const TitleInput = styled.input`
    width: 75vw;
    height: 5vh;
    border: 0px;
    border-bottom: solid 5px yellowgreen;
    background-color: white;
  `;
  const ContextArea = styled.textarea`
    width: 75vw;
    height: 60vh;
    border: 0;
    border-radius: 3px;
    background-color: white;
  `;
  const SubmitBtn = styled.button<{ primary?: boolean }>`
    width: 5vw;
    height: 5vh;
    background: green;
    color: white;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid green;
    border-radius: 3px;
    align-self: flex-end;
  `;

  return (
    <ModalMask>
      <Modal>
        <CloseBtn primary>X</CloseBtn>
        <TitleInput placeholder="제목"></TitleInput>
        <ContextArea placeholder="쓰고 싶은 내용을 자유롭게 남겨주세요"></ContextArea>
        <SubmitBtn>submit</SubmitBtn>
      </Modal>
    </ModalMask>
  );
}
