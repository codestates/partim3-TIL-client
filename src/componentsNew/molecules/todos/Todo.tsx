import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

interface TodoProps {
  title: string;
  id: number;
  key: number;
}

export default function Todo({ title }: TodoProps) {
  return (
    <Container fluid className="m-1" style={{ border: '1px solid black' }}>
      title : {title}
    </Container>
  );
}
