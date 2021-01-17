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

interface authorityType {
  auth: boolean;
  id: number;
  ownerId: number;
  ownerNickname: string;
  read: boolean;
  user: { nickname: string };
  write: boolean;
}

interface MypageCalendarProps {
  curCal: string;
  curCalColor: string;
  handleNewName: (newValue: string) => void;
  handleNewCalColor: (newColor: string) => void;
  currentUser: number;
  curCalId: number;
  shareId?: number;
  shareCalName?: string;
}

export default function MypageCalendar({
  curCal,
  curCalColor,
  handleNewName,
  handleNewCalColor,
  currentUser,
  curCalId,
  shareId,
  shareCalName,
}: MypageCalendarProps) {
  const history = useHistory();

  const [handleModalDropbox, setHandleModalDropbox] = useState(false);
  const [searchNickName, setsearchNickName] = useState('닉네임 검색');
  const [dropboxDefaltValue, setDropboxDefaultValue] = useState('캘린더 보기');
  // console.log('5번 닉네임 변경확인   :', searchNickName);

  const { calAuth } = useSelector((state: RootState) => state.calendarAuthM);

  const handleCloseModal = () => {
    setHandleModalDropbox(false);
    setsearchNickName('닉네임 검색');
  };
  const openAddUserModal = () => {
    setHandleModalDropbox(true);
  };
  const actionFunction = (select: string) => {
    console.log('mypagecalendar 값 받음  :', select);
    postMessage(select);
    setHandleModalDropbox(false);
  };

  const searchUser = (searchNickName: string) => {
    axios
      .post(
        `${REACT_APP_URL}/user/isuser`,
        {
          nickname: searchNickName,
        },
        { withCredentials: true },
      )
      .then(res => {
        // console.log(res.data);
      })
      .catch(err => {
        setsearchNickName('존재하지 않는 유저입니다.');
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
    console.log({ searchNickName });
    axios
      .post(
        `${REACT_APP_URL}/user/message`,
        {
          userId: currentUser,
          SharedNickname: searchNickName,
          read,
          write,
          auth,
          calendarId: curCalId,
          otherNickname: searchNickName,
          description: '',
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
  let shareUsers = calAuth.map((el: authorityType) => {
    return el.ownerNickname === el.user.nickname ? (
      <Userbox key={el.id}>
        <UserBoxSetting>{el.user.nickname}: 소유자</UserBoxSetting>
        {el.read ? <UserBoxShare>보기</UserBoxShare> : <UserBoxShare></UserBoxShare>}
        {el.write ? <UserBoxShare>편집</UserBoxShare> : <UserBoxShare></UserBoxShare>}
        {el.auth ? <UserBoxShare>공유</UserBoxShare> : <UserBoxShare></UserBoxShare>}
      </Userbox>
    ) : (
      <Userbox key={el.id}>
        <UserBoxSetting>{el.user.nickname}</UserBoxSetting>
        {el.read ? <UserBoxShare>보기</UserBoxShare> : <UserBoxShare></UserBoxShare>}
        {el.write ? <UserBoxShare>편집</UserBoxShare> : <UserBoxShare></UserBoxShare>}
        {el.auth ? <UserBoxShare>공유</UserBoxShare> : <UserBoxShare></UserBoxShare>}
      </Userbox>
    );
  });

  const deletecalendar = () => {
    axios
      .delete(`${REACT_APP_URL}/calendar/calendar`, {
        data: { userId: currentUser, calendarId: curCalId },
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data);
        history.push('/mypage/calendar');
      })
      .catch(err => {
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
      value={searchNickName}
      handleChange={async (inputVal: string) => {
        // console.log('6번 :', inputVal, '최종전달지로 받음');
        await setsearchNickName(inputVal);
        await searchUser(inputVal);
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
          handleChange={async (newValue: string) => {
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
        <UserboxCol>{shareUsers}</UserboxCol>
        <Btn onClick={openAddUserModal}> + 사용자 추가</Btn>
        {addUserModalDropbox}
      </CalendarShare>
      <DeleteCal>
        <SmallTitle>캘린더 삭제</SmallTitle>
        <div>이 캘린더의 모든 내용이 삭제됩니다.삭제 후 내용은 복원할 수 없습니다.</div>
        <Btn
          onClick={() => {
            deletecalendar();
          }}
        >
          삭제하기
        </Btn>
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
  margin: 1.5vw;
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

const UserboxCol = styled.div`
  flex-direction: column;
  justify-content: flex-start;
`;

const Userbox = styled.div`
  border-bottom: 1px solid gray;
  padding: 0.5vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const UserBoxSetting = styled.div`
  flex: 2;
  margin-right: 0.5vw;
`;
const UserBoxDropbox = styled.select`
  justify-self: flex-end;
  margin-right: 0.5vh;
`;
const UserBoxShare = styled.div`
  flex: 0.2;
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
