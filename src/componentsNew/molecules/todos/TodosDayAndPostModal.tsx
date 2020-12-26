import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../modules';
import PostTodoModal from './PostTodoModal';

interface TodosDayAndPostModalProps {
  setNewPosted: (newPosted: boolean) => void;
}

export default function TodosDayAndPostModal({ setNewPosted }: TodosDayAndPostModalProps) {
  const [modalShow, setModalShow] = useState(false);
  const { today } = useSelector((state: RootState) => state.handleToday);

  let todayView = new Date(today.year, today.month - 1, today.day);

  let DateOfToday = today.day;
  let DayOfTheWeek = todayView.getDay();
  let DayOfTheWeekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const openModal = () => {
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <div
        onClick={openModal}
        style={{
          // border: '1px solid black',
          margin: '3px 3px 3px 30px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          fontSize: '20px',
        }}
      >
        {DateOfToday}, {DayOfTheWeekArray[DayOfTheWeek]}
      </div>
      <HrLine />
      <PostTodoModal showModal={modalShow} closeModal={closeModal} setNewPosted={setNewPosted} />
    </div>
  );
}

const HrLine = styled.hr`
  border: 0;
  clear: both;
  display: block;
  width: 100%;
  background-color: gray;
  height: 2px;
  margin: 0px 0px;
`;
