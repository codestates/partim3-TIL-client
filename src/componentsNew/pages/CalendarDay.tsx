// Todos, Reviews, Sidebar, Header
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';

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
    <Container fluid style={{ border: '1px solid black' }}>
      <Row>
        {sidebar ? (
          <Col xs={3.5} sm={3.5} md={3.5}>
            <Sidebar setNewCalPosted={setNewCalPosted} setCalDeleted={setCalDeleted} />
          </Col>
        ) : (
          <span></span>
        )}

        <Col>
          <Row style={{ border: '1px solid black', height: '50px' }}>
            <Header {...today} />
          </Row>
          <Row style={{ border: '1px solid black', height: '300px', overflow: 'auto' }}>
            <Col>
              <Todos
                setNewPosted={setNewPosted}
                setTodoDeletedOrUpdated={setTodoDeletedOrUpdated}
              />
            </Col>
          </Row>
          <Row style={{ border: '1px solid black' }}>
            <Reviews setNewPosted={setNewPosted} />
          </Row>
        </Col>
      </Row>
      {toastsList}
    </Container>
  );
}
