import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../modules';
import { TwitterPicker } from 'react-color';
import { GoTrashcan } from 'react-icons/go';

interface CalDeleteButtonProps {
  calId: number;
  calName: string;
  delCalendar: (calId: number) => void;
  mouseOver: boolean;
}

export default function CalDeleteButton({
  calId,
  calName,
  delCalendar,
  mouseOver,
}: CalDeleteButtonProps) {
  const { myCalendar } = useSelector((state: RootState) => state.getAllCalendars.allCalendars);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);

  // console.log({ calId, calName });

  // [궁금한 점] calendar day의 sidebar에 있는 '공유받은 캘린더들'에서, 휴지통 버튼에는 '캘린더 삭제'기능을 붙여야 할지, '공유받은걸 취소'하는걸 붙여야 할지 모르겠음.
  // 아예 휴지통버튼 자체를 지우고 공유받은 캘린더는 설정창에서 컨트롤하는것도 좋아보임
  // 일단은 console.log() 함수만 연결해 뒀음

  let DeleteModal;

  if (myCalendar.length === 1) {
    DeleteModal = (
      <>
        <div>1개 남은 캘린더는 삭제할 수 없습니다</div>
        <div>새로운 캘린더를 먼저 만드신 뒤 삭제해 주세요.</div>
        <div style={{ marginTop: 'auto', marginLeft: 'auto' }}>
          <button onClick={() => setDisplayDeleteModal(false)} style={{ margin: '5px' }}>
            확인
          </button>
        </div>
      </>
    );
  } else {
    DeleteModal = (
      <>
        <div>'{calName}' 캘린더를 삭제하시겠습니까?</div>
        <div style={{ marginTop: 'auto', marginLeft: 'auto' }}>
          <button
            onClick={() => {
              delCalendar(calId);
              setDisplayDeleteModal(false);
              // then / catch 분기에 따라 다르게 처리하고 있지 않은데, 분기처리가 필요없다면 이렇게 마무리하면 됨
              // 지금은 서버가 까져있어서 catch로 갔을 때, 'Error: Network Error' 라고 뜨고 모달이 꺼짐
              // 다른 err가 뜨는 경우를 생각해 봐야 하지 않나?
            }}
            style={{ margin: '5px' }}
          >
            삭제
          </button>
          <button onClick={() => setDisplayDeleteModal(false)} style={{ margin: '5px' }}>
            취소
          </button>
        </div>
      </>
    );
  }

  return (
    <div style={{ flex: 1 }}>
      <Btn
        onClick={() => {
          setDisplayDeleteModal(true);
        }}
      >
        {/* <img
          src="/img/deleteIcon.png"
          alt="캘린더 삭제하기"
          width="25px"
          height="25px"
          color="white"
        ></img> */}
        <GoTrashcan size="1.2em" color={mouseOver ? 'black' : 'white'} />
      </Btn>

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

const Btn = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  padding: 0px;
  margin-right: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  background-color: #102027;
  z-index: 5;
  color: white;
`;
