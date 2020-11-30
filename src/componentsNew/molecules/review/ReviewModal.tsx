import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

import sendReview from '../../utils/sendReviewF';
import date from '../../utils/todayF';

import { RootState } from '../../../modules';
import calendarDay, {
  calendarStart,
  calendarSuccess,
  calendarFailure,
} from '../../../modules/calendarM';

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

  const dispatch = useDispatch();
  const reRender = (id: number | null, today: object) => {
    dispatch(calendarStart());

    return axios
      .get(`http://localhost:5000/calendar/day`, {
        params: {
          userId: id,
          // date: JSON.stringify(date),
          date: today,
        },
        withCredentials: true,
      })
      .then(res => {
        const { todos, reviews } = res.data;
        dispatch(calendarSuccess(todos, reviews));
      })
      .catch(err => {
        console.log(err);
        dispatch(calendarFailure());
      });
  };

  useEffect(() => {
    reRender(currentUser, today);
  }, []);

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
          onClick={async () => {
            await sendReview(title, context, currentUser, today);
            props.onHide();
            await reRender(currentUser, today);
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
