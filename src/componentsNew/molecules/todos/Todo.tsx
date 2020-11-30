import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

interface TodoProps {
  todoTitle: string | null;
  id: number;
  key: number;
}

export default function Todo({ todoTitle }: TodoProps) {
  return (
    <Container fluid className="m-1" style={{ border: '1px solid black' }}>
      title : {todoTitle}
    </Container>
  );
}
