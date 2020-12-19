import React from 'react';

import styled from 'styled-components';

interface ModalAlertProps {
  title: string;
  isVisible: boolean;
  handleCloseModal: () => void;
}

/*  ModalAlert 사용법 (이 모달은 단순히 확인창을 띄우기 위한 용도입니다.)

  * ModalAlert을 사용할 상위 컴포넌트에서 이 컴포넌트를 불러오기 (import ... )
    - import { ModalAlert } from '../componentsNew/atoms';


  * 상위 컴포넌트에서 useState 활용하여 모달 open/close 처리하기
    - 상위 컴포넌트에서 모달 열기 기능 넣기
    - const [handleModalAlert, setHandleModalAlert] = useState(false);

    
  * ModalAlert에 내려줄 props는 다음과 같습니다.
    - props.title (string) : 모달에 표시할 메세지
    - props.isVisible (boolean) : 모달 표시 여부를 결정함
    - props.handleCloseModal (function) : 모달 닫기 기능 넣기
      (확인버튼 클릭 후 실행될 내용들이 있다면, 이를 반영하여 함수로 전달)

        let logoutModal = (
          <ModalChoice 
            title="로그아웃 되었습니다."
            isVisible={handleModalAlert}
            handleCloseModal={handleCloseModal} 
          />
        );

        let logoutModal =
          logoutModalOpen === true ? (
            <ModalAlert title="로그아웃 되었습니다." handleCloseModal={handleCloseModal} />
          ) : (
            ''
          );

  * 모달을 닫은 이후에 처리할 내용들을, 다른 함수에 담고 이 함수를 ModalAlert에 넘겨줍니다.

        const handleCloseModal = () => {
          setLogoutModalOpen(false);

          history.push('/');
          dispatch(logout());
          dispatch(handleTodaySuccess(resetDayF()));
          dispatch(getCalendarsSuccess([], []));
        };

*/

export default function ModalAlert({ title, isVisible, handleCloseModal }: ModalAlertProps) {
  return (
    <ModalAlertWrap isVisible={isVisible}>
      <ModalAlertBackground>
        <ModalAlertContents>
          <div>
            <div>
              <h5>{title}</h5>
            </div>
            <hr style={{ borderColor: 'black' }}></hr>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => handleCloseModal()} style={{ margin: '5px' }}>
                확인
              </button>
            </div>
          </div>
        </ModalAlertContents>
      </ModalAlertBackground>
    </ModalAlertWrap>
  );
}

const ModalAlertWrap = styled.div<{ isVisible: boolean }>`
  position: 'absolute';
  z-index: 1;
  display: ${props => (props.isVisible ? 'flex' : 'none')};
`;

const ModalAlertBackground = styled.div`
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
  margin-top: 150px;
`;
