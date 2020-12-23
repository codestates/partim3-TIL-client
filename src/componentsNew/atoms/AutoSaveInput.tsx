import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

export default function AutoSaveInput({ handleChange, value }: any) {
  const inputEl = useRef<any>(null);
  const [isEditMode, setEditMode] = useState(false);
  const [isErrMode, setisErrMode] = useState(false);
  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    if (isEditMode) {
      // console.log('1번: isEditMode');
      // console.log('2번:', newValue);
      inputEl.current.focus();
    }
  }, [isEditMode]);

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  const handleClick = () => {
    // console.log('0번');
    setEditMode(!isEditMode);
  };

  const handleBlur = () => {
    console.log('4번 :', newValue, 'container로 newValue전달');
    if (newValue.length === 0) {
      alert('1글자 이상 입력해주세요');
      setisErrMode(true);
    } else {
      setisErrMode(false);
      setEditMode(false);
      handleChange(newValue);
    }
  };

  const handleInputChange = (e: any) => {
    console.log('3번 :', e.target.value);
    setNewValue(e.target.value);
  };

  return (
    <InputContainer>
      {isEditMode ? (
        <Input
          type="text"
          value={newValue}
          ref={inputEl}
          // onblur- 포커스를 잃었을때 이벤트가 발생합니다.
          onBlur={handleBlur}
          onChange={handleInputChange}
          isErrMode={isErrMode}
        ></Input>
      ) : (
        <Span onClick={handleClick}>{newValue}</Span>
      )}
    </InputContainer>
  );
}

const InputContainer = styled.div<{ padding?: any }>`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${props => props.padding};
`;

const Input = styled.input<{ isErrMode?: any }>`
  flex: 1;
  outline: none;
  border: 0px;
  background: ${props => (props.isErrMode === true ? '#fce8e6' : '#f0f2f1')};
  border-bottom: 2px solid #1a73e8;
`;

const Span = styled.span`
  margin-left: 3px;
`;
