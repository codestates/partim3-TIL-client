import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { Modal, Button } from 'react-bootstrap';
import sendReview from '../Atoms/sendReviewF';

//디자인은 추후 업데이트 해야함.

//modal에서 작성한 내용들을 서버로 보내기.
export default function ReviewModal(props: any) {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { today } = useSelector((state: RootState) => state.handleToday);

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const contextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(e.target.value);
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input placeholder="title" onChange={titleChange}></input>
        <p>
          <textarea placeholder="context" onChange={contextChange}></textarea>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>cancel</Button>
        <Button
          onClick={() => {
            sendReview(title, context, currentUser, today);
            alert('hoho');
            props.onHide();
          }}
        >
          submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
