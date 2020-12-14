import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import axios from 'axios';
import styled from 'styled-components';
import { Input } from '../../atoms';

interface TodoProps {
  title: string;
  id: number;
  key: number;
  calendarId: number;
  setTodoDeletedOrUpdated: (todoDeleted: boolean) => void;
}

export default function Todo({ title, id, calendarId, setTodoDeletedOrUpdated }: TodoProps) {
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const [displayFixOrDelTodoModal, setDisplayFixOrDelTodoModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleChange = (
    e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    setNewTitle(e.target.value);
  };

  const deleteTodo = (todoId: number) => {
    if (currentUser === null) {
      alert('로그인이 되어있지 않습니다.');
      return;
    } else {
      axios
        .delete(`http://localhost:5000/calendar/deletetodo`, {
          data: {
            userId: currentUser,
            todoId: todoId,
            calendarId: calendarId,
          },
        })
        .then(res => {
          alert(`'${title}' todo가 삭제되었습니다.`);
          setDisplayFixOrDelTodoModal(false);
          setTodoDeletedOrUpdated(true);
        })
        .catch(err => {
          console.log(`Todo del err : `, err);
        });
    }
  };

  const updateTodo = (todoId: number, newTitle: string) => {
    if (currentUser === null) {
      alert('로그인이 되어있지 않습니다.');
      return;
    } else {
      axios
        .put(
          `http://localhost:5000/calendar/updatetodo`,
          {
            userId: currentUser,
            todoId: todoId,
            title: newTitle,
            calendarId: calendarId,
          },
          { withCredentials: true },
        )
        .then(res => {
          alert(`'${title}' todo가 '${newTitle}' todo로 수정되었습니다.`);
          setDisplayFixOrDelTodoModal(false);
          setTodoDeletedOrUpdated(true);
        })
        .catch(err => {
          console.log(`Todo del err : `, err);
        });
    }
  };

  let fixOrDelTodoModal;

  if (displayFixOrDelTodoModal === false) {
    fixOrDelTodoModal = '';
  } else {
    fixOrDelTodoModal = (
      <div>
        <header>
          <h5>작성하신 Todo를 수정/삭제하실 수 있습니다.</h5>
        </header>
        <hr style={{ borderColor: 'black' }}></hr>
        <main
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <label
            style={{
              flex: 1,
              margin: 0,
              flexDirection: 'column',
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              marginLeft: '5px',
              marginRight: '5px',
            }}
          >
            title :{' '}
          </label>
          <Input
            type="text"
            name="title"
            placeholder={title}
            smInput={7}
            handleChange={handleChange}
            autoFocus={true}
          />
          <button
            onClick={() => updateTodo(id, newTitle)}
            style={{
              flex: 3,
              marginLeft: '5px',
              marginRight: '5px',
              padding: '0',
            }}
          >
            todo 수정하기
          </button>
        </main>
        <hr style={{ borderColor: 'black' }}></hr>
        <footer
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <button onClick={() => deleteTodo(id)}>todo 삭제하기</button>
          <button onClick={() => setDisplayFixOrDelTodoModal(false)}>닫기</button>
        </footer>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, margin: '1px' }}>
      <TodoWrap onClick={() => setDisplayFixOrDelTodoModal(true)}>title : {title}</TodoWrap>
      {displayFixOrDelTodoModal ? (
        <FixOrDelTodoModalWrap
          style={{
            position: 'absolute',
            zIndex: 1,
          }}
        >
          <FixOrDelTodoModalBackground>
            <FixOrDelTodoModalContents>{fixOrDelTodoModal}</FixOrDelTodoModalContents>
          </FixOrDelTodoModalBackground>
        </FixOrDelTodoModalWrap>
      ) : null}
    </div>
  );
}

const TodoWrap = styled.div`
  width: 100%;
  border: 1px solid black;
`;

const FixOrDelTodoModalWrap = styled.div`
  position: 'absolute';
  z-index: 1;
`;

const FixOrDelTodoModalBackground = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
`;

const FixOrDelTodoModalContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  width: 500px;
  height: 400px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: white;
  z-index: 5;
`;
