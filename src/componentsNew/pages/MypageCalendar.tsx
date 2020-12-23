import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import styled from 'styled-components';
import axios from 'axios';
import ColorPicker from '../molecules/sidebar/sidebarCalUnits/ColorPicker';
import AutoSaveInput from '../atoms/AutoSaveInput';
import REACT_APP_URL from '../../config';
import getToday from '../utils/todayF';
import {
  getCalendarsStart,
  getCalendarsSuccess,
  getCalendarsFailure,
} from '../../modules/getAllCalendars';
import { ModalDropbox } from '../atoms';

export default function MypageCalendar({
  curCal,
  curCalColor,
  handleNewName,
  handleNewCalColor,
  currentUser,
  curCalId,
  shareId,
  shareCalName,
}: any) {
  //유저추가 모달

  const [handleModalDropbox, setHandleModalDropbox] = useState(false);
  const [serchNickName, setSerchNickName] = useState('닉네임 검색');
  const [dropboxDefaltValue, setDropboxDefaultValue] = useState('캘린더 보기');
  // console.log('5번 닉네임 변경확인   :', serchNickName);

  const handleCloseModal = () => {
    setHandleModalDropbox(false);
    setSerchNickName('닉네임 검색');
  };
  const openAddUserModal = () => {
    setHandleModalDropbox(true);
  };
  const actionFunction = (select: string) => {
    console.log('mypagecalendar 값 받음  :', select);
    postMessage(select);
    setHandleModalDropbox(false);
  };

  const serchUser = (serchNickName: string) => {
    axios
      .post(
        `${REACT_APP_URL}/user/isuser`,
        {
          nickname: serchNickName,
        },
        { withCredentials: true },
      )
      .then(res => {
        // console.log(res.data);
      })
      .catch(err => {
        setSerchNickName('존재하지 않는 유저입니다.');
        console.log(err);
      });
  };

  const postMessage = (select: string) => {
    // 하드코딩인가..
    let read = false;
    let write = false;
    let auth = false;
    if (select === '캘린더 보기') {
      read = true;
    }
    if (select === '보기 & 편집') {
      read = true;
      write = true;
    }
    if (select === '보기 & 편집 & 공유') {
      read = true;
      write = true;
      auth = true;
    }
    console.log({ select }, { read }, { write }, { auth });
    axios
      .post(
        `${REACT_APP_URL}/user/message`,
        {
          userId: currentUser,
          otherNickname: serchNickName,
          read,
          write,
          auth,
          calendarId: curCalId,
        },
        { withCredentials: true },
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        alert('닉네임을 입력해주세요');
        console.log(err);
      });
  };

  const addUserModalDropbox = (
    <ModalDropbox
      title="친구 추가"
      isVisible={handleModalDropbox}
      actionFunction={actionFunction}
      handleCloseModal={handleCloseModal}
      dropboxMenus={['캘린더 보기', '보기 & 편집', '보기 & 편집 & 공유']}
      dropboxDefaltValue={dropboxDefaltValue}
      value={serchNickName}
      handleChange={async (inputVal: string) => {
        // console.log('6번 :', inputVal, '최종전달지로 받음');
        await setSerchNickName(inputVal);
        await serchUser(inputVal);
      }}
    />
  );

  return (
    <CalendarContainer>
      <CurCal>
        <ColorCircle color={curCalColor}></ColorCircle>
        <CurCalTitle>{curCal} 캘린더 설정변경</CurCalTitle>
      </CurCal>
      <SmallTitle>캘린더 수정</SmallTitle>
      <Changebox>
        <ChangeBoxNameTitle>이름</ChangeBoxNameTitle>
        <AutoSaveInput
          value={curCal}
          handleChange={async (newValue: any) => {
            handleNewName(newValue);
          }}
        ></AutoSaveInput>
      </Changebox>
      <Changebox>
        <ChangeboxForRow>
          <ChangeCalTitle>캘린더 색</ChangeCalTitle>
          <ColorPicker
            handleNewCalColor={handleNewCalColor}
            currentColor={curCalColor}
          ></ColorPicker>
        </ChangeboxForRow>
      </Changebox>
      <CalendarShare>
        <SmallTitle>캘린더 공유</SmallTitle>
        <Userbox>
          <UserBoxSetting>닉네임1</UserBoxSetting>
          <UserBoxDropbox>
            <option value="캘린더 보기">캘린더 보기</option>
            <option value="보기 및 수정">보기 및 수정</option>
            <option value="보기,수정 및 공유">보기,수정 및 공유</option>
          </UserBoxDropbox>
        </Userbox>
        <Userbox>
          <UserBoxSetting>닉네임1</UserBoxSetting>
          <UserBoxDropbox>
            <option value="캘린더 보기">캘린더 보기</option>
            <option value="보기 및 수정">보기 및 수정</option>
            <option value="보기,수정 및 공유">보기,수정 및 공유</option>
          </UserBoxDropbox>
        </Userbox>
        <Btn onClick={openAddUserModal}> + 사용자 추가</Btn>
        {addUserModalDropbox}
      </CalendarShare>
      <DeleteCal>
        <SmallTitle>캘린더 삭제</SmallTitle>
        <div>이 캘린더의 모든 내용이 삭제됩니다.삭제 후 내용은 복원할 수 없습니다.</div>
        <Btn>삭제하기</Btn>
      </DeleteCal>
    </CalendarContainer>
  );
}

// 유저 권한 설정 드롭박스 : 캘린더 보기 / 보기 & 편집/ 보기 & 편집 & 공유
// 삭제 권한은 오너에게만 있음.
// 삭제할 때 뭔가를 입력하게 하면 좋을 듯. 이 캘린더를 진짜로 삭제하겠습니다. 정신 차림용 문구
//캘린더리스트 랜더링
const CalendarContainer = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: column;
  margin: 1.5vh;
`;

const CurCal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1vh;
`;
const ColorCircle = styled.span<{ color?: string }>`
  margin-right: 3px;
  text-align: center;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${props => props.color};
`;
const ColorPickerStyle = styled.span<{ color?: string }>`
  margin-right: 3px;
  text-align: center;
  height: 20px;
  width: 20px;
  background-color: ${props => props.color};
  border-radius: 50%;
  display: inline-block;
`;

const CurCalTitle = styled.div``;

const Changebox = styled.div`
  padding: 0.5vw;
  background: #f0f2f1;
  border-radius: 2px;
  margin-top: 1vh;
  display: flex;
  flex-direction: column;
`;

const ChangeBoxNameTitle = styled.div``;

const ChangeboxForRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 5vh;
  align-items: center;
`;

const ChangeCalTitle = styled.div`
  margin-right: 1vh;
`;

//캘린더 공유 수락 페이지
const Admit = styled.button`
  border: 0px;
  outline: none;
  background-color: white;
`;

//캘린더 공유 페이지

const CalendarShare = styled.div`
  margin-top: 2vh;
  flex: 1;
`;

const SmallTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 0.5vh;
`;

const Userbox = styled.div`
  border-bottom: 1px solid gray;
  padding: 0.5vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const UserBoxSetting = styled.div`
  flex: 1;
  margin-right: 0.5vw;
`;
const UserBoxDropbox = styled.select`
  justify-self: flex-end;
  margin-right: 0.5vh;
`;

const DeleteCal = styled.div`
  margin-top: 2vh;
`;

const Btn = styled.button`
  margin-top: 1vh;
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 5px 5px;
  font-size: 15px;
  cursor: pointer;
  border-color: #e7e7e7;
  color: #1a73e8;
`;
