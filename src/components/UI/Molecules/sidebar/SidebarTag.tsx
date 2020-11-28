import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';

export default function SidebarTag() {
  const [smShow, setSmShow] = useState(false);
  return (
    <Col className="m-3">
      Tag
      <Row onClick={() => setSmShow(true)}>tag 선택하기</Row>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Todo나 Review에 달아보세요</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input placeholder="tag 검색하기"></input>
          <div>서버로부터 tagTitle, tagColor받아와야함</div>
          {/* 유저가 가진 모든 tag를 보여줄 건지? 캘린더별로 필터할건지 정해야함 */}
          <div>tag</div>
          <div>tag</div>
          <div>tag</div>
        </Modal.Body>
      </Modal>
    </Col>
  );
}
