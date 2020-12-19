import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../modules';
import axios from 'axios';
import styled from 'styled-components';
import { Label, Input } from '../../atoms';
import EachTagForTodoModal from './EachTagForTodoModal';
import DatePicker from 'react-datepicker';
import REACT_APP_URL from '../../../config';

interface scheduleDateType {
  year: number;
  month: number;
  day: number;
}

interface TodoProps {
  title: string;
  id: number;
  key: number;
  calendarId: number;
  scheduleDate: scheduleDateType;
  setTodoDeletedOrUpdated: (todoDeleted: boolean) => void;
}

export default function Todo({
  title,
  id,
  calendarId,
  scheduleDate,
  setTodoDeletedOrUpdated,
}: TodoProps) {
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { tags } = useSelector((state: RootState) => state.handleTags);
  const { checkedTagArray } = useSelector((state: RootState) => state.handleCheckedTags);
  // checkedTagArray 이거는 태그들마다 따로 관리해야 하는구나
  const [displayFixOrDelTodoModal, setDisplayFixOrDelTodoModal] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [startDate, setStartDate] = useState(
    new Date(`${scheduleDate.year} ${scheduleDate.month} ${scheduleDate.day}`),
  ); // startDate : Date 객체 상태임
  const [showTagsSelectOptions, setShowTagsSelectOptions] = useState(false);

  const handleChange = (
    e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    setNewTitle(e.target.value);
  };

  const handleDate = (date: Date | null) => {
    if (date !== null) {
      setStartDate(date);
    }
  };

  const deleteTodo = (todoId: number) => {
    if (currentUser === null) {
      alert('로그인이 되어있지 않습니다.');
      return;
    } else {
      axios
        .delete(`${REACT_APP_URL}/calendar/deletetodo`, {
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
    if (newTitle === '') {
      newTitle = title; // newTitle을 비워서 요청하면, 기존 title을 넣어준다
    }

    let TodayForAxios = {
      year: startDate.getFullYear(),
      month: startDate.getMonth() + 1,
      day: startDate.getDate(),
    };

    if (currentUser === null) {
      alert('로그인이 되어있지 않습니다.');
      return;
    } else {
      axios
        .put(
          `${REACT_APP_URL}/calendar/updatetodo`,
          {
            userId: currentUser,
            calendarId: calendarId,
            title: newTitle,
            scheduleDate: JSON.stringify(TodayForAxios),
            todoId: todoId,
          },
          { withCredentials: true },
        )
        .then(res => {
          alert(
            `'${title}(${scheduleDate.year}/${scheduleDate.month}/${
              scheduleDate.day
            })' todo가 '${newTitle}(${startDate.getFullYear()}/${
              startDate.getMonth() + 1
            }/${startDate.getDate()})' todo로 수정되었습니다.`,
          );
          setDisplayFixOrDelTodoModal(false);
          setTodoDeletedOrUpdated(true);
        })
        .catch(err => {
          console.log(`Todo del err : `, err);
        });
    }
  };

  let tagsList =
    tags.length === 0 ? (
      <span>
        <Link to="/mypage/tags">태그를 먼저 만들어 주세요</Link>
      </span>
    ) : (
      tags.map(eachTag => {
        return (
          <EachTagForTodoModal
            key={eachTag.id}
            tagId={eachTag.id}
            tagName={eachTag.tagName}
            tagColor={eachTag.tagColor}
          />
        );
      })
    );

  let tagsSelectOptions = showTagsSelectOptions ? (
    <div
      style={{
        position: 'absolute',
        right: '0px',
        zIndex: 2,
      }}
    >
      <div
        // 바깥을 클릭하면 닫히도록 하는 기능인 듯
        style={{
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        }}
        onClick={() => {
          setShowTagsSelectOptions(false);
        }}
      ></div>
      <TagSelectWindow>
        <div
          className="TagSettingIcon"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div>(검색창이 들어올 자리?)</div>
          <Link to="/mypage/tags">
            <button type="button" style={{ border: 'none', padding: '0px' }}>
              <img
                src="/img/settingIcon.png"
                alt="캘린더 설정하기"
                width="23px"
                height="23px"
              ></img>
            </button>
          </Link>
        </div>
        <HrLine style={{ margin: '5px', width: '95%' }} />
        {tagsList}
      </TagSelectWindow>
    </div>
  ) : null;

  let selectedTags =
    tags.length === 0 ? (
      <span>
        <Link to="/mypage/tags">태그를 먼저 만들어 주세요</Link>
      </span>
    ) : (
      tags.map(eachTag => {
        if (checkedTagArray.indexOf(eachTag.id) !== -1) {
          return <TagIcon tagColor={eachTag.tagColor}>{eachTag.tagName}</TagIcon>;
        }
      })
    );

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
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              margin: '5px',
              flex: 1,
              display: 'flex',
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
          </div>
          <div
            style={{
              margin: '5px',
              flex: 1,
              // display: 'flex',
            }}
          >
            <div>
              언제 하실 일인가요?{' '}
              <DatePicker selected={startDate} onChange={handleDate} dateFormat="yyyy/MM/dd" />
            </div>
            <div>(클릭하여 선택하시거나 '연도/월/일' 방식으로 입력해 주세요.)</div>
          </div>
          {/* todo를 다른 캘린더로 변경하는 기능이 필요할까?
          <div style={{ flex: 1, margin: '5px' }}>
            <Label text="캘린더를 선택해 주세요." smLabel={1}></Label>
            <select className="selectedCalendar" onChange={handleSelectOption}>
              {defaultmyCalendersForSelectOptions}
              {myCalendersForSelectOptions}
            </select>
          </div> */}
          <div style={{ flex: 1, margin: '5px', position: 'relative' }}>
            <div onClick={() => setShowTagsSelectOptions(!showTagsSelectOptions)}>
              <Label text="태그를 선택해 주세요." smLabel={1}></Label>
            </div>
            {tagsSelectOptions}
            <div style={{ display: 'flex' }}>{selectedTags}</div>
          </div>
          <div style={{ flex: 1, margin: '5px' }}>그 외 부분들은 어떤 것이 들어가면 좋을까요?</div>
        </main>
        <hr style={{ borderColor: 'black' }}></hr>
        <footer
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={() => updateTodo(id, newTitle)}
            // style={{
            //   flex: 3,
            //   marginLeft: '5px',
            //   marginRight: '5px',
            //   padding: '0',
            // }}
            style={{ marginLeft: '5px', marginRight: '5px' }}
          >
            todo 수정하기
          </button>
          <button onClick={() => deleteTodo(id)} style={{ marginLeft: '5px', marginRight: '5px' }}>
            todo 삭제하기
          </button>
          <button
            onClick={() => setDisplayFixOrDelTodoModal(false)}
            style={{ marginLeft: '5px', marginRight: '5px' }}
          >
            닫기
          </button>
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
  z-index: 3; // 이렇게 해도 리뷰가 더 위에 올라온다.
`;

const FixOrDelTodoModalContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  width: 500px;
  /* height: 400px; */
  border-radius: 10px;
  border: 1px solid black;
  background-color: white;
  z-index: 5;
`;

const HrLine = styled.hr`
  border: 0;
  clear: both;
  display: block;
  width: 100%;
  background-color: gray;
  height: 1px;
`;

const TagSelectWindow = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 10px;
  border: 1px solid red;
  background-color: white;
  width: 250px;
  z-index: 7;
  padding: 5px;
`;

const TagIcon = styled.div<{ tagColor: string }>`
  border-radius: 10px;
  background-color: ${props => props.tagColor};
  color: white;
  font-weight: bold;
  padding: 4px;
  margin: 4px;
`;
