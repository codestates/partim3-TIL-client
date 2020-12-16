import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

export default function AutoSaveInput({ value, handleChange }: any) {
  const inputEl = useRef<any>(null);
  const [isEditMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(value);

  // 왜 useEffect를 두번이나 쓸까?
  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  const handleClick = () => {
    setEditMode(!isEditMode);
  };

  const handleBlur = () => {
    setEditMode(false);
    handleChange(newValue);
  };

  const handleInputChange = (e: any) => {
    setNewValue(e.target.value);
  };

  return (
    <InputContainer>
      {isEditMode ? (
        <Input
          type="text"
          value={newValue}
          ref={inputEl}
          onBlur={handleBlur}
          onChange={handleInputChange}
        ></Input>
      ) : (
        <span onClick={handleClick}>{newValue}</span>
      )}
    </InputContainer>
  );
}

const InputContainer = styled.div`
  flex: 1;
  margin-bottom: 1vh;
  display: flex;
  flex-direction: column;
  margin-left: 0.5vw;
`;

const Input = styled.input`
  flex: 1;
  outline: none;
  border: 0px;
  background: #f0f2f1;
  border-bottom: 2px solid #1a73e8;
`;
