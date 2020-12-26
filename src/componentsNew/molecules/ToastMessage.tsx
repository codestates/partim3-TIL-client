import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';

interface ToastMessageProps {
  eachMessageId: number;
  fromUserNickname: string;
  shareCalendarName: string;
  bottom: number;
}

export default function ToastMessage({
  eachMessageId,
  fromUserNickname,
  shareCalendarName,
  bottom,
}: ToastMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  const history = useHistory();

  return (
    <ToastMessageWrap isVisible={isVisible} bottom={bottom}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        {fromUserNickname} 님께서
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        &nbsp;&nbsp;{shareCalendarName} 캘린더를 공유하셨습니다.
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
          marginTop: '5px',
        }}
      >
        <button style={{ marginLeft: '5px' }} onClick={() => history.push('/mypage/calendar')}>
          캘린더 확인
        </button>
        <button
          style={{ marginLeft: '5px' }}
          onClick={() => {
            setIsVisible(false);
          }}
        >
          닫기
        </button>
      </div>
    </ToastMessageWrap>
  );
}

const ToastMessageWrap = styled.div<{ isVisible: boolean; bottom: number }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 300px;
  height: 100px;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  margin: 5px;
  padding: 10px;

  position: fixed;
  right: 30px;
  bottom: ${props => `${props.bottom}px`};
  z-index: 1;

  -webkit-animation: ${props =>
    props.isVisible
      ? css`
          ${fadeIn} 0.5s linear
        `
      : css`
          ${fadeOut} 0.5s linear
        `};
  animation: ${props =>
    props.isVisible
      ? css`
          ${fadeIn} 0.5s linear
        `
      : css`
          ${fadeOut} 0.5s linear
        `};
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  transition: visibility 0.5s linear;
`;

// https://styled-components.com/docs/api#css
// https://styled-components.com/docs/api#keyframes

const fadeIn = keyframes`
  from {
    /* bottom: 0px; */
    right: 0px;
    opacity: 0;
  }
  to {
    /* bottom: 30px; */
    right: 30px;
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    /* bottom: 30px; */
    right: 30px;
    opacity: 1;
  }
  to {
    /* bottom: 0px; */
    right: 60px;
    opacity: 0;
  }
`;
