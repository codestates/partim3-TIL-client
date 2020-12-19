import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

export default function AutoSaveInput({ handleChange, value }: any) {
  const inputEl = useRef<any>(null);
  const [isEditMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(value);

  // 왜 useEffect를 두번이나 쓸까?
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
    setEditMode(false);
    // console.log('4번 :', newValue, '상위로 newValue전달');
    handleChange(newValue);
  };

  const handleInputChange = (e: any) => {
    // console.log('3번 :', e.target.value);
    if (e.target.value.length !== 0) {
      setNewValue(e.target.value);
    } else {
      alert('이름은 최소 한글자 입니다.');
    }
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
        ></Input>
      ) : (
        <Span onClick={handleClick}>{newValue}</Span>
      )}
    </InputContainer>
  );
}

const InputContainer = styled.div<{ padding?: any }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0.5vw;
  justify-content: center;
  border: 1px solid blue;
  padding: ${props => props.padding};
`;

const Input = styled.input`
  flex: 1;
  outline: none;
  border: 0px;
  background: #f0f2f1;
  border-bottom: 2px solid #1a73e8;
`;

const Span = styled.span``;
