import React, { useState } from 'react';
import styled from 'styled-components';
import AutoSaveInput from './AutoSaveInput';

// interface ModalChoiceProps {
//   title: string;
//   isVisible: boolean;
//   actionFunction: () => void;
//   handleCloseModal: () => void;
// }

/*  ModalChoice 사용법 
    - 기능 : 타이틀, 검색하고자 하는 이름, 드롭박스, 버튼: 취소, 보내기

  * ModalChoice을 사용할 상위 컴포넌트에서 이 컴포넌트를 불러오기 (import ... )
    - import { ModalDropbox } from '../componentsNew/atoms';

  * 상위 컴포넌트에서 useState 활용하여 모달 open/close 처리하기
    - 상위 컴포넌트에서 모달 열기 기능 넣기 : setHandleModalDropbox(true) 등등 
    - const [handleModalDropbox, setHandleModalDropbox] = useState(false);
    
  * ModalDropbox에 내려줄 props는 다음과 같습니다.
    - props.title (string) : 모달에 표시할 메세지
    - props.isVisible (boolean) : 모달 표시 여부를 결정함
    - props.actionFunction (function) : 확인버튼 클릭 후 실행될 내용들
        (로그아웃하기, 삭제하기 등등 연결해 줄 기능의 함수)
    - props.handleCloseModal (function) : 취소버튼 클릭 후 실행될 내용들 
        (모달 닫기 기능 넣기)
    - props.dropboxMenus (array) : 드롭박스 선택지들

        let logoutModal = (
          <ModalDropbox 
            title="로그아웃 하시겠습니까?"
            isVisible={handleModalDropbox}
            actionFunction={actionFunction}
            handleCloseModal={handleCloseModal} 
            dropboxMenus = ["캘린더 보기","보기 & 편집","보기 & 편집 & 공유"]
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

export default function ModalDropbox({
  title,
  isVisible,
  actionFunction,
  handleCloseModal,
  dropboxMenus,
  value,
  handleChange,
}: any) {
  const autoInputHandleChange = (inputVal: string) => {
    // console.log('5번 : ', inputVal, '상위로 전달');
    handleChange(inputVal);
  };
  const getDropboxValue = (e: any) => {
    console.log(e.target.value);
  };

  const dropboxlist = dropboxMenus.map((el: any) => {
    return (
      <option key={el} value={el}>
        {el}
      </option>
    );
  });

  return (
    <ModalDropboxWrap isVisible={isVisible}>
      <ModalDropboxBackground>
        <ModalDropboxContents>
          <div>
            <Title>{title}</Title>
            <hr style={{ borderColor: 'black' }}></hr>
            <Changebox>
              <Space>
                <AutoSaveInput
                  value={value}
                  handleChange={autoInputHandleChange}
                  padding={'5px'}
                ></AutoSaveInput>
              </Space>
              <DropboxArea>
                <DropboxTitle>권한설정</DropboxTitle>
                <DropBox onClick={getDropboxValue}>{dropboxlist}</DropBox>
              </DropboxArea>
              <BtnArea>
                <BtnCanCel onClick={() => handleCloseModal()}>취소</BtnCanCel>
                <BtnSubmit onClick={() => actionFunction()}>보내기</BtnSubmit>
              </BtnArea>
            </Changebox>
          </div>
        </ModalDropboxContents>
      </ModalDropboxBackground>
    </ModalDropboxWrap>
  );
}

const ModalDropboxWrap = styled.div<{ isVisible: boolean }>`
  position: 'absolute';
  z-index: 1;
  display: ${props => (props.isVisible ? 'flex' : 'none')};
`;

const ModalDropboxBackground = styled.div`
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

const ModalDropboxContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  width: 400px;
  height: 200px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: white;
  z-index: 5;
  margin-top: 150px;
`;

const Title = styled.h5`
  margin-top: 5px;
  margin-bottom: -5px;
`;

const Changebox = styled.div`
  flex: 1;
  height: 130px;
  border-radius: 2px;
  margin-top: -8px;
  display: flex;
  flex-direction: column;
  justify-contents: center;
`;

//#f0f2f1;
const Space = styled.div`
  flex: 0.8;
  background: #f0f2f1;
  display: flex;
  flex-direction: column;
  justify-contents: flex-start;
`;

const DropboxArea = styled.div`
  flex: 1;
  margin-top: 8px;
  background: #f0f2f1;
  display: flex;
  flex-direction: column;
  justify-contents: flex-start;
`;
const DropboxTitle = styled.div`
  padding-left: 4px;
`;

const DropBox = styled.select`
  flex: 1;
  background: #f0f2f1;
  outline: none;
  border: 0px;

  option {
    height: 5px;
    outline: none;
  }
`;

const BtnArea = styled.div`
  flex: 0.5;
  padding-top: 8px;
`;

const BtnCanCel = styled.span`
  margin-left: 275px;
  text-align: right;
`;

const BtnSubmit = styled.span`
  margin-left: 20px;
  text-align: right;
`;

//select option 설정법
//https://codesandbox.io/s/qk8r8l7w54?file=/src/index.js

//option값을 설정해주고 싶은데 방법을 모르겠다.
