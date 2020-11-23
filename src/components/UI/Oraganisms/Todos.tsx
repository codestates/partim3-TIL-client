import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { TodosDayAndPostModalMolecule } from '../Molecules';

export default function Todos() {
  return (
    <>
      <Row className="m-1" style={{ border: '1px solid black' }}>
        <TodosDayAndPostModalMolecule />
      </Row>
      <Row className="m-1" style={{ border: '1px solid black' }}>
        Todo
        {/* 개별 todo들이 나열되어야 함 */}
      </Row>
    </>
  );
}
