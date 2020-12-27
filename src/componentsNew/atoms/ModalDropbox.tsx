import React, { useEffect, useState, useRef } from 'react';
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
  const [isEditMode, setEditMode] = useState(false);
  const [dropboxValue, setDropboxValue] = useState('');
  // useEffect(() => {
  //   //처음에는 isEditMode가 아니지만 클릭시에는 isEditMode가 true가 되면서 이쪽으로 들어오게 된다.
  //   //그리고 컴포넌트는 리랜더링이 된다.
  //   // console.log(inputEl);
  //   // inputEl.current.focus();
  //   // 왜 오류가 날까;;
  // }, [isEditMode]);

  const handleClick = () => {
    setEditMode(true);
  };
  const handleBlur = () => {
    setEditMode(false);
  };

  const autoInputHandleChange = (inputVal: string) => {
    // console.log('5번 : ', inputVal, '상위로 전달');
    handleChange(inputVal);
  };
  const getDropboxValue = (e: any) => {
    // actionFunction(e.target.value);
    // setEditMode(false);
    setDropboxValue(e.target.value);
  };

  const dropboxlist = dropboxMenus.map((el: any) => {
    return (
      <option key={el} value={el}>
        {el}
      </option>
    );
  });

  // 드롭박스 변경 -> 취소버튼 클릭 -> 사용자 추가버튼 누르면 -> 변경한 드롭박스 값이 남아 있음.
  // 드롭박스의 값이 변경되면, 상위로 변경된 드롭박스의 내용이 전달됨

  // 취소버튼을 눌렀을때, 상위에서 권한 설정을 초기버전으로 state값 변경
  // state값이 변경되지만, 리랜더링이 되지는 않는 것으로 보임.
  // 모달은 클릭이 되었을때, 값이 세팅이 되는건가?
  // 모달 버튼을 클릭할 때마다 재실행이 되는데
  // 재실행은 되는데, select박스의 값이 그대로 남아 있는 이유가 뭘까.

  // 이해는 안되지만 다른 방식으로 코드 도입
  // idEditMode일때와 아닐 때 랜더링을 다르게 했다.

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
                {isEditMode ? (
                  <DropBox onChange={getDropboxValue}>{dropboxlist}</DropBox>
                ) : (
                  <DropBox onClick={handleClick}>
                    <option>값을 선택해주세요</option>
                  </DropBox>
                )}
              </DropboxArea>
              <BtnArea>
                <BtnCanCel
                  onClick={() => {
                    handleCloseModal();
                    setEditMode(false);
                  }}
                >
                  취소
                </BtnCanCel>
                <BtnSubmit onClick={() => actionFunction(dropboxValue)}>보내기</BtnSubmit>
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
  justify-content: center;
`;

//#f0f2f1;
const Space = styled.div`
  flex: 0.8;
  background: #f0f2f1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const DropboxArea = styled.div`
  flex: 1;
  margin-top: 8px;
  background: #f0f2f1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
