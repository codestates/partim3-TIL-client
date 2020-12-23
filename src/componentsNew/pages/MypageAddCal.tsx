import React from 'react';
import styled from 'styled-components';

export default function MypageAddCalendar({ messages, connectcalendarauthority }: any) {
  const judgeAuth = (message: any) => {
    if (message.read && message.write && message.auth) {
      return '보기&수정&공유';
    } else if (message.read && message.write && !message.auth) {
      return '보기&수정';
    } else if (message.read && !message.write && !message.auth) {
      return '캘린더 보기';
    }
  };

  let messageList = messages.map((el: any) => {
    return (
      <Userbox key={el.id}>
        <UserBoxSetting>{el.fromUserNickname}</UserBoxSetting>
        <UserBoxSetting>{el.shareCalendar}</UserBoxSetting>
        <UserBoxAuth>{judgeAuth(el) + ' 권한'}</UserBoxAuth>
        <Admit
          onClick={() => {
            connectcalendarauthority(el.id, true);
          }}
        >
          수락
        </Admit>
        <Admit
          onClick={() => {
            // connectcalendarauthority(el.id, false);
            // handleMessage();
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
          {messages.length === 0 ? <div>캘린더 공유 요청이 없습니다</div> : messageList}
        </Changebox>
      </CalendarShare>
      <CalendarShare>
        <SmallTitle>공유받은 캘린더</SmallTitle>
      </CalendarShare>
    </CalendarContainer>
  );
}

const CalendarContainer = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  margin: 1.5vh;
`;

//캘린더 공유 수락 페이지
const Admit = styled.button`
  outline: none;
  border: 0px;
  background-color: #f0f2f1;
  color: black;
  margin-left: 0.7vw;
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

const UserBoxAuth = styled.div`
  flex: 2;
  margin-right: 0.5vw;
`;

const Changebox = styled.div`
  padding: 0.5vw;
  background: #f0f2f1;
  border-radius: 2px;
  margin-top: 1vh;
  display: flex;
  flex-direction: column;
`;
