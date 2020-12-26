import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import axios from 'axios';
import { RootState } from '../../../modules';
import DatePicker from 'react-datepicker';

import { Label, Input } from '../../atoms';
import EachTagForTodoModal from './EachTagForTodoModal';

import REACT_APP_URL from '../../../config';

interface PostTodoModalProp {
  showModal: boolean;
  closeModal: () => void;
  setNewPosted: (newPosted: boolean) => void;
}

export default function PostTodoModal({ showModal, closeModal, setNewPosted }: PostTodoModalProp) {
  const [title, setTitle] = useState('');

  const { myCalendar } = useSelector((state: RootState) => state.getAllCalendars.allCalendars);
  const { shareCalendar } = useSelector((state: RootState) => state.getAllCalendars.allCalendars);
  const { tags } = useSelector((state: RootState) => state.handleTags);
  const [checkedTagArray, setCheckedTagArray] = useState<number[]>([]);
  const [selectedCalendar, setSelectedCalendar] = useState(NaN); // startDate : Date 객체 상태임
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { today } = useSelector((state: RootState) => state.handleToday);
  const [startDate, setStartDate] = useState(new Date(`${today.year} ${today.month} ${today.day}`)); // startDate : Date 객체 상태임
  const [showTagsSelectOptions, setShowTagsSelectOptions] = useState(false);

  let defaultCalendersForSelectOptions = <option>클릭해서 선택해 주세요.</option>;
  let calendersForSelectOptions = [...myCalendar, ...shareCalendar].map(calendar => {
    return (
      <option key={calendar.id} value={calendar.id}>
        {calendar.name}
      </option>
    );
  });

  // Post요청시에 넘겨주고자 하는 '태그 배열(checkedTagArray)'을 처리하는 코드
  // checkedTagArray 배열은, 모달창을 닫거나 Post 요청이 성공하면, 빈 배열로 초기화됨
  const handleCheckedTags = (tagId: number, isChecked: boolean) => {
    let checkedTagIndex = checkedTagArray.indexOf(tagId);
    if (checkedTagIndex === -1 && isChecked === true) {
      setCheckedTagArray([...checkedTagArray, tagId]);
    } else {
      let delBefore = checkedTagArray.slice(0, checkedTagIndex);
      let delAfter = checkedTagArray.slice(checkedTagIndex + 1);
      setCheckedTagArray([...delBefore, ...delAfter]);
    }
  };

  // 태그 선택을 위한 드롭다운 창에 나열될, 유저가 가지고 있는 모든 태그들
  let tagsList =
    tags.length === 0 ? (
      <span>
        <Link to="/mypage/tags">태그를 먼저 만들어 주세요</Link>
      </span>
    ) : (
      tags.map(eachTag => {
        let alreadyChecked = checkedTagArray.indexOf(eachTag.id) !== -1 ? true : false;
        return (
          <EachTagForTodoModal
            key={eachTag.id}
            tagId={eachTag.id}
            tagName={eachTag.tagName}
            tagColor={eachTag.tagColor}
            handleCheckedTags={handleCheckedTags!}
            alreadyChecked={alreadyChecked}
          />
        );
      })
    );

  // 드롭다운 창에서 유저가 선택한 태그들(tags에서 checkedTagArray를 기준으로 필터링한 결과물임)
  let selectedTags =
    tags.length === 0 ? (
      <span>
        <Link to="/mypage/tags">태그를 먼저 만들어 주세요</Link>
      </span>
    ) : (
      tags.map(eachTag => {
        if (checkedTagArray.indexOf(eachTag.id) !== -1) {
          return (
            <TagIcon key={eachTag.id} tagId={eachTag.id} tagColor={eachTag.tagColor}>
              {eachTag.tagName}
            </TagIcon>
          );
        }
      })
    );

  // 태그 선택을 위한 드롭다운 창(onClick 이벤트로 이 창을 토글)
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

  let TodayForAxios = {
    year: startDate.getFullYear(),
    month: startDate.getMonth() + 1,
    day: startDate.getDate(),
  };

  const handleTitleInput = (
    e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    let targetName = e.target.name;
    if (targetName === 'title') {
      setTitle(e.target.value);
    }
  };

  const PostNewTodo = (calendarId: number | null, title: string, scheduleDate: string) => {
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
        `${REACT_APP_URL}/calendar/todo`,
        {
          userId: currentUser,
          title: title,
          scheduleDate: scheduleDate,
          calendarId: calendarId,
          tags: checkedTagArray,
        },
        { withCredentials: true },
      )
      .then(res => {
        alert(`${res.data}`);
        setSelectedCalendar(NaN); // post에 성공하면 '선택된 캘린더'를 초기화함
        setCheckedTagArray([]); // post에 성공하면 '선택된 태그' 배열을 초기화함
        closeModal(); // PostTodoModal 모달창을 닫음
        setNewPosted(true); // 다시 렌더링하기 위해 상위 컴포넌트를 조작함(?)
      })
      .catch(err => {
        if (err.response.data === '쓰기 권한 없음') {
          alert(
            `이 캘린더에서의 Todo 작성 권한을 보유하지 않고 있습니다. \r\n캘린더 설정 버튼을 눌러 권한을 확인하시거나, 다른 캘린더를 선택해 주세요.`,
          );
        }
      });
  };

  useEffect(() => {
    setStartDate(new Date(`${today.year} ${today.month} ${today.day}`));
    setCheckedTagArray([]);
  }, [showModal]);

  let modalContents = (
    <>
      <header style={{ display: 'flex', justifyContent: 'center' }}>
        <h5>새로운 Todo를 작성해 보세요!</h5>
      </header>
      <HrLine />
      <main style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ flex: 1, margin: '5px' }}>
          <input type="checkbox" />
          축하합니다! 오늘 하루도 성공!
        </div>
        <div
          style={{
            flex: 1,
            margin: '5px',
            alignItems: 'center',
          }}
        >
          <Label text="제목을 입력해 주세요" smLabel={1}></Label>
          <Input
            type="text"
            name="title"
            placeholder="제목을 입력해 주세요."
            smInput={1.5}
            handleChange={handleTitleInput}
            autoFocus={true}
            className="PostTodoModal__titleInput"
          ></Input>
        </div>
        <div style={{ flex: 1, margin: '5px' }}>
          <div>
            <Label text="언제 하실 일인가요?" smLabel={1}></Label>
            <DatePicker selected={startDate} onChange={handleDate} dateFormat="yyyy/MM/dd" />
          </div>
          <div>(클릭하여 선택하시거나 '연도/월/일' 방식으로 입력해 주세요.)</div>{' '}
          {/* 이 부분이 필요할까? */}
        </div>
        <div style={{ flex: 1, margin: '5px' }}>
          <Label text="캘린더를 선택해 주세요." smLabel={1}></Label>
          <select className="selectedCalendar" onChange={handleSelectOption}>
            {defaultCalendersForSelectOptions}
            {calendersForSelectOptions}
          </select>
        </div>
        <div style={{ flex: 1, margin: '5px', position: 'relative' }}>
          <div onClick={() => setShowTagsSelectOptions(!showTagsSelectOptions)}>
            <Label text="이 영역을 클릭하여 태그를 선택해 주세요." smLabel={1}></Label>
          </div>
          {tagsSelectOptions}
          <div style={{ display: 'flex' }}>{selectedTags}</div>
        </div>
        <div style={{ flex: 1, margin: '5px' }}>그 외 부분들은 어떤 것이 들어가면 좋을까요?</div>
      </main>
      <HrLine />
      <footer style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => PostNewTodo(selectedCalendar, title, JSON.stringify(TodayForAxios))}
          style={{ margin: '5px' }}
        >
          Post new Todo!
        </button>
        <button onClick={closeModal} style={{ margin: '5px' }}>
          Close Modal
        </button>
      </footer>
    </>
  );

  if (!showModal) {
    return <></>;
  } else {
    return (
      <PostTodoModalWrap>
        <PostTodoModalBackground>
          <PostTodoModalContents>{modalContents}</PostTodoModalContents>
        </PostTodoModalBackground>
      </PostTodoModalWrap>
    );
  }
}

const PostTodoModalWrap = styled.div`
  position: 'absolute';
  z-index: 2;
`;

const PostTodoModalBackground = styled.div`
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
  z-index: 3;
`;

const PostTodoModalContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  width: 450px;
  /* height: 450px; */
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

const TagOption = styled.div``;

const TagIcon = styled.div<{ tagColor: string; tagId: number }>`
  border-radius: 10px;
  background-color: ${props => props.tagColor};
  color: white;
  font-weight: bold;
  padding: 4px;
  margin: 4px;
`;
