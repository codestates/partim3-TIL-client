import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../modules';
import axios from 'axios';
import styled from 'styled-components';
import { Label, Input } from '../../atoms';
import EachTagForTodoModal from './EachTagForTodoModal';
import DatePicker from 'react-datepicker';
import REACT_APP_URL from '../../../config';
import { AiFillTags } from 'react-icons/ai';
import UpdateTodoModal from './UpdateTodoModal';

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
  calendarColor: string;
  scheduleDate: scheduleDateType;
  defaultArrayOfTagsId: number[];
  setTodoDeletedOrUpdated: (todoDeleted: boolean) => void;
  todoTags: Array<{
    tag: {
      id: number;
      tagName: string;
      tagColor: string;
      description: string;
    };
  }>;
}

export default function Todo({
  title,
  id,
  calendarId,
  calendarColor,
  scheduleDate,
  defaultArrayOfTagsId,
  setTodoDeletedOrUpdated,
  todoTags,
}: TodoProps) {
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { tags } = useSelector((state: RootState) => state.handleTags);

  const [displayFixOrDelTodoModal, setDisplayFixOrDelTodoModal] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { myCalendar } = useSelector((state: RootState) => state.getAllCalendars.allCalendars);
  const [newCalendarId, setNewcalendarId] = useState(calendarId);
  const [startDate, setStartDate] = useState(
    new Date(`${scheduleDate.year} ${scheduleDate.month} ${scheduleDate.day}`),
  ); // startDate : Date 객체 상태임
  const [showTagsSelectOptions, setShowTagsSelectOptions] = useState(false);

  // 받아온 todo들의 id로만 구성된 배열

  const [newArrayOfTagsId, setNewArrayOfTagsId] = useState<number[]>(defaultArrayOfTagsId);
  // const [preservedArrayOfTagsId, setPreservedArrayOfTagsId] = useState<number[]>(newArrayOfTagsId);

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
        .delete(`${REACT_APP_URL}/calendar/todo`, {
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

  const updateTodo = (todoId: number) => {
    // startDate에는 기본적으로 해당 todo의 날짜가 자동으로 잡혀 있음
    // 유자가 이를 수정하지 않으면 기존 날짜가 나가고, 수정하면 수정된 날짜로 교체됨
    // 그러므로 updateTodo에서 날짜를 별도로 넘겨줄 필요가 없다
    // 위 사항은 title(newTitle), tags(newArrayOfTagsId) 역시 마찬가지임
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
          `${REACT_APP_URL}/calendar/todo`,
          {
            userId: currentUser,
            calendarId: newCalendarId,
            title: newTitle,
            scheduleDate: JSON.stringify(TodayForAxios),
            todoId: todoId,
            tags: newArrayOfTagsId,
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

  // 내가 가진 tag는 모두 다 표시하고,
  let concattedTagsArray = tags.slice();
  let concattedTagsArrayId: Array<number> = [];

  for (let j = 0; j < concattedTagsArray.length; j++) {
    concattedTagsArrayId.push(concattedTagsArray[j].id);
  }

  // 공유받은 todo에 걸려있는 tag는, 내꺼는 중복되지 않게 필터링해서, 합친 tag 목록을 만듬
  for (let i = 0; i < todoTags.length; i++) {
    if (todoTags[i].tag !== null) {
      if (concattedTagsArrayId.indexOf(todoTags[i].tag.id) === -1) {
        concattedTagsArray.push(todoTags[i].tag);
      }
    }
  }

  // 이건 서버에서 받아온 todo에 이미 연결된 tag들을 나열하는 것이므로,
  // todo 수정 모달에서 tag를 다르게 선택하더라도 실제 수정요청이 나가지 않으면 여기는 수정되면 안된다
  let attachedTags = todoTags.map(eachTag => {
    if (eachTag.tag !== null) {
      return (
        <TagIcon key={eachTag.tag.id} tagId={eachTag.tag.id} tagColor={eachTag.tag.tagColor}>
          {eachTag.tag.tagName}
        </TagIcon>
      );
    }
  });

  const handleSelectOption = (
    e: React.ChangeEvent<HTMLSelectElement> & { target: HTMLSelectElement },
  ) => {
    setNewcalendarId(Number(e.target.value));
  };

  return (
    <>
      <TodoWrap onClick={() => setDisplayFixOrDelTodoModal(true)}>
        <div style={{ display: 'flex', flex: 2.5, margin: '10px', fontSize: '15px' }}>{title}</div>
        <div
          style={{
            display: 'flex',
            flex: 1.5,
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            marginRight: '5px',
          }}
        >
          {attachedTags}
        </div>
      </TodoWrap>
      <UpdateTodoModal
        title={title}
        displayFixOrDelTodoModal={displayFixOrDelTodoModal}
        handleChange={handleChange}
        startDate={startDate}
        handleDate={handleDate}
        calendarId={calendarId}
        handleSelectOption={handleSelectOption}
        showTagsSelectOptions={showTagsSelectOptions}
        setShowTagsSelectOptions={setShowTagsSelectOptions}
        newArrayOfTagsId={newArrayOfTagsId}
        setNewArrayOfTagsId={setNewArrayOfTagsId}
        todoTags={todoTags}
        updateTodo={updateTodo}
        id={id}
        deleteTodo={deleteTodo}
        defaultArrayOfTagsId={defaultArrayOfTagsId}
        setDisplayFixOrDelTodoModal={setDisplayFixOrDelTodoModal}
      />
    </>
  );
}

const TodoWrap = styled.div`
  display: flex;
  width: 100%;
  height: 35px;
  align-items: center;
  justify-content: 'space-between';
  border: 2px solid lightgrey;
  margin: 2px 0px;
  border-radius: 10px;
`;

const TagIcon = styled.div<{ tagId: number; tagColor: string }>`
  border-radius: 5px;
  background-color: ${props => props.tagColor};
  color: white;
  font-weight: bold;
  padding: 4px;
  margin: 4px;
  box-shadow: 1px 1px 1px grey;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
