import React, { useState } from 'react';
import { Modal, Container, Row, Col, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import axios from 'axios';

interface PostTodoModalProp {
  show: React.ReactNode;
  closeModal: () => void;
}

export default function PostTodoModal({ show, closeModal }: PostTodoModalProp) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);

  const handleTitleInput = (
    e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    let targetName = e.target.name;
    if (targetName === 'title') {
      setTitle(e.target.value);
    }
  };

  const handleCloseModal = () => {
    console.log('왜안됨??');
    closeModal();
  };

  const PostNewTodo = (userId: number | null, title: string, scheduleTime: string) => {
    if (typeof userId !== 'number') {
      alert('로그인이 되어있지 않습니다.');
      return;
    }
    if (title.length === 0) {
      alert('제목을 입력해 주세요');
      return;
    }
    return axios
      .post(
        `http://localhost:5000/calendar/todo`,
        { userId, title, scheduleTime },
        { withCredentials: true },
      )
      .then(res => {
        alert(`${res.data}`);
        closeModal(); // 여기는 잘 작동한다.
      })
      .catch(err => {
        alert(`${err}`);
      });
  };

  return (
    <Modal
      show={show}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">새로운 Todo를 작성해 보세요!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row className="m-1" style={{ border: '1px solid black' }}>
            <Form.Check type="checkbox" label="축하합니다! 오늘 하루도 성공!" />
          </Row>
          <Row className="m-1" style={{ border: '1px solid black' }}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">title</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="title"
                onChange={handleTitleInput}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
          </Row>
          <Row className="m-1" style={{ border: '1px solid black' }}>
            언제 하실 일인가요? : https://reactdatepicker.com/ 를 사용하는 편이 어떨까요?
          </Row>
          <Row className="m-1" style={{ border: '1px solid black' }}>
            tag 선택창 : tag 구현이 필요합니다.
          </Row>
          <Row className="m-1" style={{ border: '1px solid black' }}>
            그 외 부분들은 어떤 것이 들어가면 좋을까요?
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => closeModal()}>Close Modal</Button>
        <Button onClick={() => PostNewTodo(currentUser, title, '2020-11-22')}>
          Post new Todo!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
