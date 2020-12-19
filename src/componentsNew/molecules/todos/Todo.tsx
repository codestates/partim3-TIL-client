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
  defaultArrayOfTagsId: number[];
  setTodoDeletedOrUpdated: (todoDeleted: boolean) => void;
}

export default function Todo({
  title,
  id,
  calendarId,
  scheduleDate,
  defaultArrayOfTagsId,
  setTodoDeletedOrUpdated,
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

  const handleCheckedTags = (tagId: number, isChecked: boolean) => {
    let checkedTagIndex = newArrayOfTagsId.indexOf(tagId);
    if (checkedTagIndex === -1 && isChecked === true) {
      setNewArrayOfTagsId([...newArrayOfTagsId, tagId]);
    } else {
      let delBefore = newArrayOfTagsId.slice(0, checkedTagIndex);
      let delAfter = newArrayOfTagsId.slice(checkedTagIndex + 1);
      setNewArrayOfTagsId([...delBefore, ...delAfter]);
    }
  };

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
          `${REACT_APP_URL}/calendar/updatetodo`,
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

  let tagsList =
    tags.length === 0 ? (
      <span>
        <Link to="/mypage/tags">태그를 먼저 만들어 주세요</Link>
      </span>
    ) : (
      tags.map(eachTag => {
        let alreadyChecked = newArrayOfTagsId.indexOf(eachTag.id) !== -1 ? true : false;
        return (
          <EachTagForTodoModal
            key={eachTag.id}
            tagId={eachTag.id}
            tagName={eachTag.tagName}
            tagColor={eachTag.tagColor}
            handleCheckedTags={handleCheckedTags}
            alreadyChecked={alreadyChecked}
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
        // 태그선택 드롭다운의 바깥을 클릭하면 닫히도록 하는 기능
        className="rock"
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
    newArrayOfTagsId.length === 0 ? (
      <span>(선택된 태그가 없습니다.)</span>
    ) : (
      // 추가/삭제를 해야 하니, tags와 비교할수밖에 없다.
      tags.map(eachTag => {
        if (newArrayOfTagsId.indexOf(eachTag.id) !== -1) {
          return (
            <TagIcon key={eachTag.id} tagColor={eachTag.tagColor}>
              {eachTag.tagName}
            </TagIcon>
          );
        }
      })
    );

  const handleSelectOption = (
    e: React.ChangeEvent<HTMLSelectElement> & { target: HTMLSelectElement },
  ) => {
    setNewcalendarId(Number(e.target.value));
  };

  let defaultmyCalendersForSelectOptions = <option>클릭해서 선택해 주세요.</option>;
  let myCalendersForSelectOptions = myCalendar.map(calendar => {
    let selected = false;
    if (calendar.id === calendarId) {
      selected = true;
    }
    return (
      // selected 대신 value를 쓰라고 해서, 어쩔수없이 value의 기능을 className으로 대신해야 할 듯
      <option key={calendar.id} value={calendar.id} selected={selected}>
        {calendar.name}
      </option>
    );
  });

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

          <div style={{ flex: 1, margin: '5px' }}>
            <Label text="캘린더를 선택해 주세요." smLabel={1}></Label>
            <select className="selectedCalendar" onChange={handleSelectOption}>
              {defaultmyCalendersForSelectOptions}
              {myCalendersForSelectOptions}
            </select>
          </div>

          <div style={{ flex: 1, margin: '5px', position: 'relative' }}>
            <div onClick={() => setShowTagsSelectOptions(!showTagsSelectOptions)}>
              <Label text="태그를 추가/삭제하실 수 있습니다." smLabel={1}></Label>
            </div>
            {tagsSelectOptions}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '40px',
                flexWrap: 'wrap',
              }}
            >
              {selectedTags}
            </div>
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
            onClick={() => updateTodo(id)}
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
            onClick={() => {
              setNewArrayOfTagsId(defaultArrayOfTagsId);
              setDisplayFixOrDelTodoModal(false);
            }}
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
