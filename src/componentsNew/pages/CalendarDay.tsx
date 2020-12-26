// Todos, Reviews, Sidebar, Header
import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { Header, Todos, Reviews, Sidebar } from '../oraganisms';
import { ToastMessage } from '../molecules';

import { todayProps } from '../../types';

interface CalendarDayProps {
  sidebar: boolean;
  today: todayProps;
  setNewPosted: (newPosted: boolean) => void;
  setNewCalPosted: (trueOrFalse: boolean) => void;
  setCalDeleted: (trueOrFalse: boolean) => void;
  setTodoDeletedOrUpdated: (trueOrFalse: boolean) => void;
}

interface toastType {
  id: number;
  fromUser: number;
  fromUserNickname: string;
  shareCalendarName: string;
  read: boolean;
  write: boolean;
  auth: boolean;
  shareCalendar: number;
  description: string;
}

export default function CalendarDay({
  sidebar,
  today,
  setNewPosted,
  setNewCalPosted,
  setCalDeleted,
  setTodoDeletedOrUpdated,
}: CalendarDayProps) {
  const { messages } = useSelector((state: RootState) => state.mypageCalendarMessagesM);

  let toastsList = messages.map((eachMessage: toastType, index: number) => {
    return (
      <ToastMessage
        key={eachMessage.id}
        eachMessageId={eachMessage.id}
        fromUserNickname={eachMessage.fromUserNickname}
        shareCalendarName={eachMessage.shareCalendarName}
        bottom={index * 110 + 30}
      />
    );
  });

  return (
    <Container>
      {sidebar ? (
        <SidebarArea>
          <Sidebar setNewCalPosted={setNewCalPosted} setCalDeleted={setCalDeleted} />
        </SidebarArea>
      ) : (
        <span></span>
      )}
      <MainArea>
        <Header {...today} />
        <Todos setNewPosted={setNewPosted} setTodoDeletedOrUpdated={setTodoDeletedOrUpdated} />
        <Reviews setNewPosted={setNewPosted} />
        {toastsList}
      </MainArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: row;
`;
const SidebarArea = styled.div`
  width: 250px;
  background-color: #aed581;
`;

const MainArea = styled.div`
  flex: 2;
  background-color: white;
`;
