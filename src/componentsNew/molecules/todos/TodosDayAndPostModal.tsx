import React, { useState } from 'react';
import PostTodoModal from './PostTodoModal';
import { Col } from 'react-bootstrap';

interface TodosDayAndPostModalProps {
  setNewPosted: (newPosted: boolean) => void;
}

export default function TodosDayAndPostModal({ setNewPosted }: TodosDayAndPostModalProps) {
  const [modalShow, setModalShow] = useState(false);

  const openModal = () => {
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <>
      <Col onClick={openModal} xs={2} className="m-1" style={{ border: '1px solid black' }}>
        <div>요일</div>
        <div>날짜</div>
      </Col>
      <Col onClick={openModal} className="m-1" style={{ border: '1px solid black' }}></Col>
      <PostTodoModal showModal={modalShow} closeModal={closeModal} setNewPosted={setNewPosted} />
    </>
  );
}
