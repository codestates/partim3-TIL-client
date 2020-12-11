import React, { useState } from 'react';
import { Modal, Container, Row, Col, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import axios from 'axios';
import DatePicker from 'react-datepicker';

interface PostTodoModalProp {
  show: React.ReactNode;
  closeModal: () => void;
  setNewPosted: (newPosted: boolean) => void;
}

export default function PostTodoModal({ show, closeModal, setNewPosted }: PostTodoModalProp) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date()); // startDate : Date 객체 상태임
  const { myCalendar } = useSelector((state: RootState) => state.getAllCalendars.allCalendars);
  const [selectedCalendar, setSelectedCalendar] = useState(NaN); // startDate : Date 객체 상태임
  // console.log({ myCalendar });

  let defaultmyCalendersForSelectOptions;

  if (myCalendar === []) {
    // myCalendar가 1개 남은 경우 이를 삭제할 수 없도록 막았으니까, 빈 배열일 경우는 고려할 필요가 없지 않나?
    defaultmyCalendersForSelectOptions = '';
  } else {
    defaultmyCalendersForSelectOptions = <option>캘린더를 선택해 주세요.</option>;
  }

  let myCalendersForSelectOptions;

  if (myCalendar === []) {
    // myCalendar가 1개 남은 경우 이를 삭제할 수 없도록 막았으니까, 빈 배열일 경우는 고려할 필요가 없지 않나?
    myCalendersForSelectOptions = <option>먼저 캘린더를 만들어 주세요.</option>;
  } else {
    myCalendersForSelectOptions = myCalendar.map(calendar => {
      return (
        <option key={calendar.id} value={calendar.id}>
          {calendar.name}
        </option>
      );
    });
  }

  // = myCalendar[0].id

  const handleSelectOption = (
    e: React.ChangeEvent<HTMLSelectElement> & { target: HTMLSelectElement },
  ) => {
    setSelectedCalendar(Number(e.target.value));
  };

  const handleDate = (date: Date | null) => {
    if (date !== null) {
      setStartDate(date);
    }
  };

  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { today } = useSelector((state: RootState) => state.handleToday);

  let TodayForAxios = {
    year: today.year,
    month: today.month,
    day: today.day,
  };

  const handleTitleInput = (
    e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    let targetName = e.target.name;
    if (targetName === 'title') {
      setTitle(e.target.value);
    }
  };

  const handleCloseModal = () => {
    setStartDate(new Date()); // 모달을 닫을 때, 모달 안의 날짜선택 창을 '오늘'로 되돌리는 기능 : 미완성임
    closeModal();
  };

  let scheduleTime = `${startDate.getFullYear()}-${
    startDate.getMonth() + 1
  }-${startDate.getDate()}`;

  const PostNewTodo = (calendarId: number | null, title: string, scheduleDate: string) => {
    // console.log({ calendarId, title, scheduleDate });
    if (typeof calendarId !== 'number' || Number.isNaN(calendarId)) {
      alert('캘린더가 선택되어 있지 않습니다.');
      return;
    }
    if (title.length === 0) {
      alert('제목을 입력해 주세요');
      return;
    }
    return axios
      .post(
        `http://localhost:5000/calendar/todo`,
        { calendarId, title, scheduleDate },
        { withCredentials: true },
      )
      .then(res => {
        alert(`${res.data}`);
        setNewPosted(true);
        handleCloseModal(); // 여기는 잘 작동한다.
      })
      .catch(err => {
        alert(`${err}`);
      });
  };

  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      backdrop="static" // 모달 바깥의 배경 부분에 관여함
      keyboard={true} // esc로 닫을 수 있는지 결정함
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
            <div>
              언제 하실 일인가요?{' '}
              <DatePicker selected={startDate} onChange={handleDate} dateFormat="yyyy/MM/dd" />
            </div>
            <div>(클릭하여 선택하시거나 '연도/월/일' 방식으로 입력해 주세요.)</div>
          </Row>
          <Row className="m-1" style={{ border: '1px solid black' }}>
            <span>Calendar 선택 : </span>
            <select className="selectedCalendar" onChange={handleSelectOption}>
              {defaultmyCalendersForSelectOptions}
              {myCalendersForSelectOptions}
            </select>
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
        <Button onClick={handleCloseModal}>Close Modal</Button>
        <Button onClick={() => PostNewTodo(selectedCalendar, title, JSON.stringify(TodayForAxios))}>
          Post new Todo!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
