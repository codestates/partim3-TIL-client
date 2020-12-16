import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

import sendReview from '../../utils/sendReviewF';
// 스케줄데이트(3) / 스케줄타임(2)으로 나눠서 보내야 함

import { RootState } from '../../../modules';
import calendarDay, {
  calendarStart,
  calendarSuccess,
  calendarFailure,
} from '../../../modules/calendarM';

import BigModal from '../../atoms/BigModal';

export default function ReviewModal(props: any) {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [show, setShow] = useState(true);
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { today } = useSelector((state: RootState) => state.handleToday);

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const contextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(e.target.value);
  };
  // props

  enum ModalType {
    OkOnly,
    OKCancel,
  }

  const changeShow = (s: any) => {
    setShow(s);
  };
  const BigModalProps = {
    show: show,
    changeShow: changeShow,
    type: ModalType.OkOnly,
  };

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  // 왜 항상 이렇게 넘겨주어야 할까? 흠.
  return (
    // <BigModal {...BigModalProps}></BigModal>
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
          onClick={async () => {
            // await sendReview(title, context, today);
            // 스케줄데이트(3) / 스케줄타임(2)으로 나눠서 보내야 함
            props.setNewPosted(true);
            props.onHide();
            await setTitle('');
            await setContext('');
          }}
        >
          submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
