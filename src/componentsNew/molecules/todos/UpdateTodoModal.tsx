import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../modules';
import { Label, Input, ModalChoice } from '../../atoms';
import DatePicker from 'react-datepicker';
import { AiFillTags } from 'react-icons/ai';
import EachTagForTodoModal from './EachTagForTodoModal';

interface UpdateTodoModalProps {
  title: string;
  displayFixOrDelTodoModal: boolean;
  handleChange: (e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }) => void;
  startDate: Date;
  handleDate: (date: Date | null) => void;
  calendarId: number;
  handleSelectOption: (
    e: React.ChangeEvent<HTMLSelectElement> & { target: HTMLSelectElement },
  ) => void;
  showTagsSelectOptions: boolean;
  setShowTagsSelectOptions: (showTagsSelectOptions: boolean) => void;
  newArrayOfTagsId: number[];
  setNewArrayOfTagsId: (newArrayOfTagsId: number[]) => void;
  todoTags: Array<{
    tag: {
      id: number;
      tagName: string;
      tagColor: string;
      description: string;
    };
  }>;
  updateTodo: (todoId: number) => void;
  id: number;
  deleteTodo: (todoId: number) => void;
  defaultArrayOfTagsId: number[];
  setDisplayFixOrDelTodoModal: (displayFixOrDelTodoModal: boolean) => void;
}

export default function UpdateTodoModal({
  title,
  displayFixOrDelTodoModal,
  handleChange,
  startDate,
  handleDate,
  calendarId,
  handleSelectOption,
  showTagsSelectOptions,
  setShowTagsSelectOptions,
  newArrayOfTagsId,
  setNewArrayOfTagsId,
  todoTags,
  updateTodo,
  id,
  deleteTodo,
  defaultArrayOfTagsId,
  setDisplayFixOrDelTodoModal,
}: UpdateTodoModalProps) {
  const { myCalendar, shareCalendar } = useSelector(
    (state: RootState) => state.getAllCalendars.allCalendars,
  );
  const { tags } = useSelector((state: RootState) => state.handleTags);

  const [handleModalChoice, setHandleModalChoice] = useState(false);

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

  let myCalendersForSelectOptions = [...myCalendar, ...shareCalendar].map(calendar => {
    return (
      // selected(option 태그) 대신 defaultValue(select 태그)/value(option 태그)를 쓰라는 react의 에러가 있었음
      // 질문 글 및 블로그 글을 올려 기록에 남겼음
      <option key={calendar.id} value={calendar.id}>
        {calendar.name}
      </option>
    );
  });

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
          style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
        >
          {/* <div>(검색창이 들어올 자리?)</div> */}
          <Link to="/mypage/tags">
            <button type="button" style={{ border: 'none', padding: '0px', marginRight: '5px' }}>
              <img
                src="/img/settingIcon.png"
                alt="캘린더 설정하기"
                width="25px"
                height="25px"
              ></img>
            </button>
          </Link>
        </div>
        <HrLine style={{ margin: '5px', width: '95%' }} />
        {tagsList}
      </TagSelectWindow>
    </div>
  ) : null;

  let fixOrDelTodoModal;

  if (displayFixOrDelTodoModal === false) {
    fixOrDelTodoModal = '';
  } else {
    fixOrDelTodoModal = (
      <div>
        <header style={{ display: 'flex', justifyContent: 'center', margin: '0px' }}>
          <h5 style={{ margin: '0px' }}>작성하신 Todo를 수정/삭제하실 수 있습니다.</h5>
        </header>
        <HrLine />
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
              display: 'flex',
              flex: 1,
              margin: '10px',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <Label text="제목을 입력해 주세요." smLabel={1}></Label>
            </div>
            <div style={{ width: '210px' }}>
              <Input
                defaultValue={title}
                type="text"
                name="title"
                placeholder={title}
                smInput={7}
                handleChange={handleChange}
                autoFocus={true}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flex: 1,
              margin: '10px',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <Label text="날짜를 선택하세요." smLabel={1}></Label>
            </div>
            <div style={{ flex: 1.5, display: 'flex', justifyContent: 'flex-end', width: '210px' }}>
              <DatePicker selected={startDate} onChange={handleDate} dateFormat="yyyy/MM/dd" />
            </div>
            {/* <div>(클릭하여 선택하시거나 '연도/월/일' 방식으로 입력해 주세요.)</div> */}
          </div>

          <div
            style={{
              display: 'flex',
              flex: 1,
              margin: '10px',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <Label text="캘린더를 선택하세요." smLabel={1}></Label>
            </div>
            <div>
              <select
                style={{ width: '210px', height: '30px' }}
                defaultValue={calendarId}
                className="selectedCalendar"
                onChange={handleSelectOption}
              >
                {myCalendersForSelectOptions}
              </select>
            </div>
          </div>

          <div style={{ flex: 1, margin: '10px', position: 'relative' }}>
            <div
              style={{ display: 'flex', justifyContent: 'space-between' }}
              onClick={() => setShowTagsSelectOptions(!showTagsSelectOptions)}
            >
              <div>
                <Label text="태그를 선택해 주세요." smLabel={1}></Label>
              </div>
              <div>
                <AiFillTags size="1.5em" />
              </div>
            </div>
            {tagsSelectOptions}
            <div style={{ display: 'flex', marginLeft: '10px' }}>{selectedTags}</div>
          </div>
          {/* <div style={{ flex: 1, margin: '5px' }}>그 외 부분들은 어떤 것이 들어가면 좋을까요?</div> */}
        </main>
        <HrLine />
        <footer
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <ModalButton onClick={() => updateTodo(id)}>Update Todo</ModalButton>
          <ModalButton onClick={() => setHandleModalChoice(true)}>Delete Todo</ModalButton>
          <ModalButton
            onClick={() => {
              setNewArrayOfTagsId(defaultArrayOfTagsId);
              setDisplayFixOrDelTodoModal(false);
            }}
            style={{ width: '80px' }}
          >
            Close
          </ModalButton>
        </footer>
      </div>
    );
  }

  const handleDeleteAction = () => {
    deleteTodo(id);
    setHandleModalChoice(false);
  };

  const handleCloseModal = () => {
    setHandleModalChoice(false);
  };

  return (
    <>
      {displayFixOrDelTodoModal ? (
        <FixOrDelTodoModalWrap>
          <FixOrDelTodoModalBackground>
            <FixOrDelTodoModalContents>{fixOrDelTodoModal}</FixOrDelTodoModalContents>
          </FixOrDelTodoModalBackground>
        </FixOrDelTodoModalWrap>
      ) : null}
      <ModalChoice
        title={`'${title}' Todo를 삭제하시겠습니까?`}
        isVisible={handleModalChoice}
        actionFunction={handleDeleteAction}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

const FixOrDelTodoModalWrap = styled.div`
  position: 'absolute';
  z-index: 2;
`;

const FixOrDelTodoModalBackground = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3; // 이렇게 해도 리뷰가 더 위에 올라온다.
`;

const FixOrDelTodoModalContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 420px;
  /* height: 400px; */
  border-radius: 10px;
  border: 1px solid black;
  background-color: white;
  z-index: 5;
  margin-top: 150px;
`;

const HrLine = styled.hr`
  border: 0;
  clear: both;
  display: block;
  width: 100%;
  background-color: gray;
  height: 1px;
  margin: 8px 0px;
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

const ModalButton = styled.button`
  background-color: grey;
  color: white;
  border-radius: 5px;
  width: 110px;
  height: 30px;
  margin: 5px;
`;
