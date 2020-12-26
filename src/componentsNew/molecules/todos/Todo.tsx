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
import { GiConsoleController } from 'react-icons/gi';

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

  // todo를 수정할 때, 내 tag는 언제든 넣고 뺄 수 있지만,
  // 공유받을 때 따라온 태그는, 내가 삭제해서 todo를 수정하면 다시 열어서는 붙일 수 없고,
  // 공유해준 소유자한테 다시 태그를 붙여달라고 요청해야 함
  let tagsList =
    concattedTagsArray.length === 0 ? (
      <span>
        <Link to="/mypage/tags">태그를 먼저 만들어 주세요</Link>
      </span>
    ) : (
      concattedTagsArray.map(eachTag => {
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
      // concattedTagsArray : 내가 가진 모든 태그들과, 공유받은 todo라면 그에 붙어서 온 태그들
      concattedTagsArray.map(eachTag => {
        if (eachTag !== null) {
          if (newArrayOfTagsId.indexOf(eachTag.id) !== -1) {
            return (
              <TagIcon key={eachTag.id} tagId={eachTag.id} tagColor={eachTag.tagColor}>
                {eachTag.tagName}
              </TagIcon>
            );
          }
        }
      })
    );

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

  let myCalendersForSelectOptions = myCalendar.map(calendar => {
    return (
      // selected(option 태그) 대신 defaultValue(select 태그)/value(option 태그)를 쓰라는 react의 에러가 있었음
      // 질문 글 및 블로그 글을 올려 기록에 남겼음
      <option key={calendar.id} value={calendar.id}>
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
            <select
              defaultValue={calendarId}
              className="selectedCalendar"
              onChange={handleSelectOption}
            >
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
    <>
      <TodoWrap onClick={() => setDisplayFixOrDelTodoModal(true)}>
        <div style={{ display: 'flex', flex: 1, margin: '10px', fontSize: '20px' }}>{title}</div>
        <div
          style={{
            display: 'flex',
            flex: 2,
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            marginRight: '5px',
          }}
        >
          {attachedTags}
        </div>
      </TodoWrap>
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
    </>
  );
}

const TodoWrap = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: 'space-between';
  border: 2px solid lightgrey;
  margin: 3px 0px;
  border-radius: 10px;
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

const TagIcon = styled.div<{ tagId: number; tagColor: string }>`
  border-radius: 10px;
  background-color: ${props => props.tagColor};
  color: white;
  font-weight: bold;
  padding: 4px;
  margin: 4px;
  box-shadow: 5px 5px 5px grey; // 클릭한 것만 이런 강조 효과를 주고 싶었는데,
`;
