import React, { useState } from 'react';
import { PostTodoModal } from '../Atoms';
import { Col } from 'react-bootstrap';

export default function TodosDayAndPostModalMolecule() {
  const [modalShow, setModalShow] = useState(false);

  const openModal = () => {
    setModalShow(true);
  };

  const closeModal = () => {
    console.log('여기는 실행되는데 왜 이 뒤는 실행이 안되는건가');
    setModalShow(false);
  };

  return (
    <>
      <Col onClick={openModal} xs={2} className="m-1" style={{ border: '1px solid black' }}>
        <div>요일</div>
        <div>날짜</div>
      </Col>
      <Col onClick={openModal} className="m-1" style={{ border: '1px solid black' }}>
        <PostTodoModal show={modalShow} closeModal={closeModal} />
      </Col>
    </>
  );
}
