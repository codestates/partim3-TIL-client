import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

interface AutoSaveInputProps {
  value: string;
  handleChange: (newValue: string) => void;
  padding?: string;
}

export default function AutoSaveInput({ value, handleChange }: AutoSaveInputProps) {
  const inputEl = useRef<HTMLInputElement>(null);
  const [isEditMode, setEditMode] = useState(false);
  const [isErrMode, setisErrMode] = useState(false);
  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    // '컴포넌트 내에서 useRef의 반환값을 사용할 땐 null check가 필수입니다.'
    // 출처: https://kjwsx23.tistory.com/469 [香格里拉]
    if (isEditMode && inputEl && inputEl.current) {
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

  const handleInputChange = (
    e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
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

const InputContainer = styled.div<{ padding?: number }>`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${props => props.padding};
`;

const Input = styled.input<{ isErrMode?: boolean }>`
  flex: 1;
  outline: none;
  border: 0px;
  background: ${props => (props.isErrMode === true ? '#fce8e6' : '#f0f2f1')};
  border-bottom: 2px solid #1a73e8;
`;

const Span = styled.span`
  margin-left: 3px;
`;
