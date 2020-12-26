import React, { useState } from 'react';
import styled from 'styled-components';
import { RootState } from '../../modules';
import { useSelector, useDispatch } from 'react-redux';

export default function MypageAddCalendar({
  connectcalendarauthority,
  getMessage,
  handleGetMessage,
}: any) {
  const judgeAuth = (message: any) => {
    if (message.read && message.write && message.auth) {
      return '보기&수정&공유';
    } else if (message.read && message.write && !message.auth) {
      return '보기&수정';
    } else if (message.read && !message.write && !message.auth) {
      return '캘린더 보기';
    }
  };
  const { messages } = useSelector((state: RootState) => state.mypageCalendarMessagesM);
  const [newMessage, setNewMessage] = useState(messages);
  let messageList = messages.map((el: any) => {
    return (
      <Userbox key={el.id}>
        <UserBoxSetting>{el.fromUserNickname}</UserBoxSetting>
        <UserBoxSetting>{el.shareCalendarName}</UserBoxSetting>
        <UserBoxSetting>{judgeAuth(el) + ' 권한'}</UserBoxSetting>
        <Admit
          onClick={async () => {
            connectcalendarauthority(el.id, true);
            await getMessage();
            await handleGetMessage(true);
          }}
        >
          수락
        </Admit>
        <Admit
          onClick={async () => {
            connectcalendarauthority(el.id, false);
            await getMessage();
            await handleGetMessage(true);
          }}
        >
          거절
        </Admit>
      </Userbox>
    );
  });

  return (
    <CalendarContainer>
      <CalendarShare>
        <SmallTitle>캘린더 공유요청 수락</SmallTitle>
        <Changebox>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: '40px',
              borderBottom: '4px solid grey',
              marginBottom: '10px',
            }}
          >
            <UserBoxSetting>Calendar Owner</UserBoxSetting>
            <UserBoxSetting>Calendar Name</UserBoxSetting>
            <UserBoxSetting>Given Auth</UserBoxSetting>
            <div
              style={{ flex: 1, marginRight: '10px', display: 'flex', justifyContent: 'flex-end' }}
            >
              Accept
            </div>
            <div
              style={{ flex: 1, marginRight: '10px', display: 'flex', justifyContent: 'flex-end' }}
            >
              Refuse
            </div>
          </div>
          <div>{messages.length === 0 ? <div>캘린더 공유 요청이 없습니다</div> : messageList}</div>
        </Changebox>
      </CalendarShare>
      {/* <CalendarShare>
        <SmallTitle>공유받은 캘린더</SmallTitle>
      </CalendarShare> */}
    </CalendarContainer>
  );
}

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

//캘린더 공유 수락 페이지
const Admit = styled.button`
  flex: 1;
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
  outline: none;
  border: 0px;
  background-color: #f0f2f1;
  color: black;
  /* margin-left: 0.7vw; */
  font-size: 15px;
  &:hover {
    color: #1a73e8;
    border-radius: 3px;
  }
`;

//캘린더 공유 페이지

const CalendarShare = styled.div`
  margin-top: 2vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SmallTitle = styled.div`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 0.5vh;
`;

const Userbox = styled.div`
  border-bottom: 1px solid gray;
  /* padding: 0.5vh; */
  padding: 10px 0px;
  display: flex;

  /* justify-content: flex-start; */
  /* align-items: center; */
`;
const UserBoxSetting = styled.div`
  flex: 2;
  margin-left: 10px;
`;

const Changebox = styled.div`
  padding: 0.5vw;
  background: #f0f2f1;
  border-radius: 2px;
  margin: 15px 20px;
  display: flex;
  flex-direction: column;
`;
