// Todos, Reviews, Sidebar, Header
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import { Header, Todos, Reviews } from '../oraganisms';
import Sidebar from '../oraganisms/Sidebar';

import { CalendarDayProps } from '../../types';

export default function CalendarDay({ sidebar, today }: CalendarDayProps) {
  return (
    <Container fluid style={{ border: '1px solid black' }}>
      <Row>
        {sidebar ? (
          <Col xs={3.5} sm={3.5} md={3.5}>
            <Sidebar />
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
              <Todos />
            </Col>
          </Row>
          <Row style={{ border: '1px solid black' }}>
            <Reviews />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
