import React from 'react';

import styled from 'styled-components';

interface ModalChoiceProps {
  title: string;
  isVisible: boolean;
  actionFunction: () => void;
  handleCloseModal: () => void;
}

/*  ModalChoice 사용법 (이 모달은 '확인 또는 취소'의 두 선택지를 결정하게 하기 위한 용도입니다.)

  * ModalChoice을 사용할 상위 컴포넌트에서 이 컴포넌트를 불러오기 (import ... )
    - import { ModalChoice } from '../componentsNew/atoms';

  * 상위 컴포넌트에서 useState 활용하여 모달 open/close 처리하기
    - 상위 컴포넌트에서 모달 열기 기능 넣기 : setHandleModalChoice(true) 등등 
    - const [handleModalChoice, setHandleModalChoice] = useState(false);
    
  * ModalChoice에 내려줄 props는 다음과 같습니다.
    - props.title (string) : 모달에 표시할 메세지
    - props.isVisible (boolean) : 모달 표시 여부를 결정함
    - props.actionFunction (function) : 확인버튼 클릭 후 실행될 내용들
        (로그아웃하기, 삭제하기 등등 연결해 줄 기능의 함수)
    - props.handleCloseModal (function) : 취소버튼 클릭 후 실행될 내용들 
        (모달 닫기 기능 넣기)

        let logoutModal = (
          <ModalChoice 
            <ModalChoice 
          <ModalChoice 
            title="로그아웃 하시겠습니까?"
            isVisible={handleModalChoice}
            actionFunction={actionFunction}
            handleCloseModal={handleCloseModal} 
              handleCloseModal={handleCloseModal} 
            handleCloseModal={handleCloseModal} 
          />
        );

  * 모달을 닫은 이후에 처리할 내용들을, 다른 함수에 담고 이 함수를 ModalChoice에 넘겨줍니다.
        const handleCloseModal = () => {
          setLogoutModalOpen(false);

          history.push('/');
          dispatch(logout());
          dispatch(handleTodaySuccess(resetDayF()));
          dispatch(getCalendarsSuccess([], []));
        };

*/

export default function ModalChoice({
  title,
  isVisible,
  actionFunction,
  handleCloseModal,
}: ModalChoiceProps) {
  return (
    <ModalChoiceWrap isVisible={isVisible}>
      <ModalChoiceBackground>
        <ModalChoiceContents>
          <div>
            <div>
              <h5>{title}</h5>
            </div>
            <HrLine />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => actionFunction()} style={{ margin: '5px' }}>
                확인
              </button>
              <button onClick={() => handleCloseModal()} style={{ margin: '5px' }}>
                취소
              </button>
            </div>
          </div>
        </ModalChoiceContents>
      </ModalChoiceBackground>
    </ModalChoiceWrap>
  );
}

const ModalChoiceWrap = styled.div<{ isVisible: boolean }>`
  position: 'absolute';
  z-index: 1;
  display: ${props => (props.isVisible ? 'flex' : 'none')};
`;

const ModalChoiceBackground = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
`;

const ModalChoiceContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  width: 350px;
  height: 120px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: #102027;
  color: white;
  z-index: 5;
  margin-top: 150px;
`;

const HrLine = styled.hr`
  border: 0;
  clear: both;
  display: block;
  width: 100%;
  background-color: white;
  height: 1px;
  margin: 10px 0px;
`;
