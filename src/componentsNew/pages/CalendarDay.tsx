// Todos, Reviews, Sidebar, Header
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import { Header, Todos, Reviews, Sidebar } from '../oraganisms';

import { todayProps } from '../../types';

interface CalendarDayProps {
  sidebar: boolean;
  today: todayProps;
  setNewPosted: (newPosted: boolean) => void;
  setNewCalPosted: (trueOrFalse: boolean) => void;
  setCalDeleted: (trueOrFalse: boolean) => void;
  setTodoDeletedOrUpdated: (trueOrFalse: boolean) => void;
}

export default function CalendarDay({
  sidebar,
  today,
  setNewPosted,
  setNewCalPosted,
  setCalDeleted,
  setTodoDeletedOrUpdated,
}: CalendarDayProps) {
  // console.log('calendarDay');
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
    </Container>
  );
}
