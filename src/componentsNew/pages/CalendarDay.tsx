// Todos, Reviews, Sidebar, Header
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import { Header, Todos, Reviews } from '../oraganisms';
import Sidebar from '../oraganisms/Sidebar';

import { todayProps } from '../../types';

interface CalendarDayProps {
  sidebar: boolean;
  today: todayProps;
  setNewPosted: (newPosted: boolean) => void;
  setNewCalPosted: (trueOrFalse: boolean) => void;
  setCalDeleted: (trueOrFalse: boolean) => void;
}

export default function CalendarDay({
  sidebar,
  today,
  setNewPosted,
  setNewCalPosted,
  setCalDeleted,
}: CalendarDayProps) {
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
          <Row style={{ border: '1px solid black', height: '80px' }}>
            <Header {...today} />
          </Row>
          <Row style={{ border: '1px solid black', height: '200px' }}>
            <Col>
              <Todos setNewPosted={setNewPosted} />
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
