import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../modules';
import { TwitterPicker } from 'react-color';

interface CalDeleteButtonProps {
  calId: number;
  calName: string;
  delCalendar: (calId: number) => void;
  displayDeleteModal: boolean;
  setDisplayDeleteModal: (trueOrFalse: boolean) => void;
}

export default function CalDeleteButton({
  calId,
  calName,
  delCalendar,
  displayDeleteModal,
  setDisplayDeleteModal,
}: CalDeleteButtonProps) {
  const { myCalendar } = useSelector((state: RootState) => state.getAllCalendars.allCalendars);

  const handleClose = () => {
    setDisplayDeleteModal(false);
  };

  let DeleteModal;

  if (myCalendar.length === 1) {
    DeleteModal = (
      <>
        <div>1개 남은 캘린더는 삭제할 수 없습니다</div>
        <div>새로운 캘린더를 먼저 만드신 뒤 삭제해 주세요.</div>
        <div style={{ marginTop: 'auto', marginLeft: 'auto' }}>
          <button onClick={handleClose} style={{ margin: '5px' }}>
            확인
          </button>
        </div>
      </>
    );
  } else {
    DeleteModal = (
      <>
        {' '}
        <div>'{calName}' 캘린더를 삭제하시겠습니까?</div>
        <div style={{ marginTop: 'auto', marginLeft: 'auto' }}>
          <button onClick={() => delCalendar(calId)} style={{ margin: '5px' }}>
            삭제
          </button>
          <button onClick={handleClose} style={{ margin: '5px' }}>
            취소
          </button>
        </div>
      </>
    );
  }

  return (
    <div>
      <button
        type="button"
        style={{ border: 'none', padding: '0px' }}
        onClick={() => {
          setDisplayDeleteModal(!displayDeleteModal);
        }}
      >
        <img src="/img/deleteIcon.png" alt="캘린더 삭제하기" width="23px" height="23px"></img>
      </button>

      {displayDeleteModal ? (
        <DeleteModalWrap
          style={{
            position: 'absolute',
            zIndex: 1,
          }}
        >
          <DeleteModalBackground>
            <DeleteModalContents>{DeleteModal}</DeleteModalContents>
          </DeleteModalBackground>
        </DeleteModalWrap>
      ) : null}
    </div>
  );
}

const DeleteModalWrap = styled.div`
  position: 'absolute';
  z-index: 1;
`;

const DeleteModalBackground = styled.div`
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

const DeleteModalContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  width: 350px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: white;
  z-index: 5;
`;
