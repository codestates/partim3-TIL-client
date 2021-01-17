import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import sendReview from '../utils/sendReviewF';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../modules';
import getToday from '../../componentsNew/utils/todayF';
import { useForm } from 'react-hook-form';
import { AiFillTags } from 'react-icons/ai';
import EachTagForTodoModal from '../molecules/todos/EachTagForTodoModal';
import { FcCalendar } from 'react-icons/fc';
import DatePicker from 'react-datepicker';

interface BigModalForUpdateReviewProps {
  show: boolean;
  onHide: () => void;
  handleUpdate: (
    reviewId: number,
    calendarId: number,
    scheduleDate: string,
    scheduleTime: string,
    title: string,
    context: string,
    imageUrl: string,
    tags: number[],
  ) => void;
  id: number;
  title: string;
  context: string;
  imageUrl: string;
  scheduleDate: {
    year: number;
    month: number;
    day: number;
  };
  scheduleTime: { hour: number; min: number };
  calendarId: number;
  reviewTags: Array<{
    tag: {
      id: number;
      tagName: string;
      tagColor: string;
      description: string;
    };
  }>;
  defaultArrayOfTagsId: number[];
}

export default function BigModalForUpdateReview({
  show,
  onHide,
  handleUpdate,
  id,
  title,
  context,
  imageUrl,
  scheduleDate,
  scheduleTime,
  calendarId,
  reviewTags,
  defaultArrayOfTagsId,
}: BigModalForUpdateReviewProps) {
  // console.log({ scheduleDate, scheduleTime });

  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { myCalendar, shareCalendar } = useSelector(
    (state: RootState) => state.getAllCalendars.allCalendars,
  );
  const { tags } = useSelector((state: RootState) => state.handleTags);

  const [year, setYear] = useState(scheduleDate.year);
  const [month, setMonth] = useState(scheduleDate.month);
  const [day, setDay] = useState(scheduleDate.day);

  const { today } = useSelector((state: RootState) => state.handleToday);
  const [startDate, setStartDate] = useState(new Date(`${year} ${month} ${day}`)); // startDate : Date 객체 상태임
  const handleDate = (date: Date | null) => {
    if (date !== null) {
      setStartDate(date);
      setMonth(date.getMonth() + 1);
      setDay(date.getDate());
    }
  };

  const [hour, setHour] = useState(scheduleTime.hour);
  const [min, setMin] = useState(scheduleTime.min);

  const [showTagsSelectOptions, setShowTagsSelectOptions] = useState(false);
  const [checkedTagArray, setCheckedTagArray] = useState<number[]>([]);
  const [selectedCalendar, setSelectedCalendar] = useState(calendarId);
  // const { register, handleSubmit, reset, errors } = useForm();
  // 나중에 div테그만 랜더링하게 바꾸고 싶을때. ( 구글 캘린더 처럼 )
  // const [timeChange, settimeChange] = React.useState(false);

  const [divHour, setDivHour] = useState(true);
  const [inputHour, setInputHour] = useState(false);
  const [divMin, setDivMin] = useState(true);
  const [inputMin, setInputMin] = useState(false);

  const [titleValue, setTitleValue] = useState(title);
  const [contextValue, setContextValue] = useState(context);

  let myCalendersForSelectOptions;

  if (myCalendar === []) {
    myCalendersForSelectOptions = <option>먼저 캘린더를 만들어 주세요.</option>;
  } else {
    myCalendersForSelectOptions = [...myCalendar, ...shareCalendar].map(calendar => {
      return (
        <option key={calendar.id} value={calendar.id}>
          {calendar.name}
        </option>
      );
    });
  }

  const handleSelectOption = (
    e: React.ChangeEvent<HTMLSelectElement> & { target: HTMLSelectElement },
  ) => {
    setSelectedCalendar(Number(e.target.value));
  };

  const [errShow, setShow] = useState(false);

  // 에러를 2번 반복해야 에러메세지가 사라짐.
  // 에러가 한번 일어난 후, 전부 지우면 에러메세지를 지워주기.
  const handleHour = (e: React.ChangeEvent<HTMLInputElement>) => {
    //React.ChangeEvent<HTMLInputElement>
    // const regex = /^[0-9]$/;
    // console.log(e.target.value);
    // if (regex.test(e.target.value)) {
    //   console.log('regex');
    // }

    let newhour = Number(e.target.value);

    if (isNaN(newhour)) {
      // 정규표현식을 해주지 않아도 텍스트 입력은 여기서 방어가 됨.
      console.log(newhour);
      setShow(true);
      return;
    }
    if (newhour > 24 || newhour < 0) {
      // clearInput();
      // 잘못된 시간은 아예 입력 방지
      setShow(true);
      return;
    } else {
      setShow(false);
      setHour(newhour);
    }
  };
  // 서버로 보낼때 한번 검증이 필요함.
  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMin = Number(e.target.value);
    if (!newMin && newMin !== 0) {
      setShow(!errShow);
    }
    if (newMin > 59 || newMin < 0) {
      setShow(!errShow);
    } else {
      setMin(newMin);
    }
  };

  const handleCloseBtn = () => {
    setShow(false);
    setHour(0);
    onHide();
    setCheckedTagArray([]);
    setTitleValue('');
    setContextValue('');
  };

  // useEffect(() => {
  //   setHour(String(getToday().hour));
  // }, []);

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const contextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContextValue(e.target.value);
  };

  const hideInput = () => {
    // 범위는 나중에 고민해 봐야할듯 하다..
    setDivHour(true);
    setInputHour(false);
    setDivMin(true);
    setInputMin(false);
  };
  const renderInputHour = () => {
    setDivHour(false);
    setInputHour(true);
  };

  const handleOnBlurHour = () => {
    setDivHour(true);
    setInputHour(false);
  };

  const renderInputMin = () => {
    setDivMin(false);
    setInputMin(true);
  };

  const handleOnBlurMin = () => {
    setDivMin(true);
    setInputMin(false);
  };
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

  // 내가 가진 tag는 모두 다 표시하고,
  let concattedTagsArray = tags.slice();
  let concattedTagsArrayId: Array<number> = [];

  for (let j = 0; j < concattedTagsArray.length; j++) {
    concattedTagsArrayId.push(concattedTagsArray[j].id);
  }

  // 공유받은 todo에 걸려있는 tag는, 내꺼는 중복되지 않게 필터링해서, 합친 tag 목록을 만듬
  for (let i = 0; i < reviewTags.length; i++) {
    if (reviewTags[i].tag !== null) {
      if (concattedTagsArrayId.indexOf(reviewTags[i].tag.id) === -1) {
        concattedTagsArray.push(reviewTags[i].tag);
      }
    }
  }

  const [newArrayOfTagsId, setNewArrayOfTagsId] = useState<number[]>(defaultArrayOfTagsId);

  // 태그 선택을 위한 드롭다운 창에 나열될, 유저가 가지고 있는 모든 태그들
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

  // 드롭다운 창에서 유저가 선택한 태그들(tags에서 checkedTagArray를 기준으로 필터링한 결과물임)
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

  // 태그 선택을 위한 드롭다운 창(onClick 이벤트로 이 창을 토글)
  let tagsSelectOptions = showTagsSelectOptions ? (
    <div
      style={{
        position: 'absolute',
        left: '5px',
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
        <div>
          {/* <div>(검색창이 들어올 자리?)</div> */}
          <Link to="/mypage/tags">
            <TagBtn>+ new tag</TagBtn>
          </Link>
        </div>
        {tagsList}
      </TagSelectWindow>
    </div>
  ) : null;

  let TodayForAxios = {
    year: startDate.getFullYear(),
    month: startDate.getMonth() + 1,
    day: startDate.getDate(),
  };

  // background-color: #f2f2f2;
  // &:hover {
  //   outline: none;
  //   background-color: #f0f2f1;// 흐릿한 회색
  //   color: black;
  // }
  //#1a73e8 버튼 하늘색
  return (
    <ModalMask show={show}>
      <Modal>
        <ModalSetting>
          <MonthAndDay>{`${month}월 ${day}일`}</MonthAndDay>

          {/* 시간 */}
          <TimeHeader>
            <HourInput value={hour} onClick={renderInputHour} show={divHour} readOnly></HourInput>
            <HourInput
              show={inputHour}
              value={hour}
              onBlur={handleOnBlurHour}
              onChange={handleHour}
            ></HourInput>
            <SpaceTime>시</SpaceTime>
            <MinInput value={min} onClick={renderInputMin} show={divMin} readOnly></MinInput>
            <MinInput
              show={inputMin}
              value={min}
              onBlur={handleOnBlurMin}
              onChange={handleMin}
            ></MinInput>
            <span>분</span>
          </TimeHeader>
          {/* 에러메세지 */}
          <ModalAndArrow onClick={hideInput}>
            <ErrModal show={errShow}>잘못된 시간</ErrModal>
          </ModalAndArrow>

          {/* 날짜 수정을 위한 달력 필요 */}
          <div style={{ fontSize: '18px', margin: '10px 0px' }}>
            <span style={{ marginLeft: '2px' }}>리뷰 날짜 선택</span>
            <DatePicker selected={startDate} onChange={handleDate} dateFormat="yyyy/MM/dd" />
          </div>

          {/* 캘린더 선택 */}
          <CalText>
            <FcCalendar size="1.8em"></FcCalendar>
            <span style={{ marginLeft: '2px' }}>리뷰를 남길 캘린더</span>
          </CalText>
          <SelectCal onChange={handleSelectOption} defaultValue={calendarId}>
            {myCalendersForSelectOptions}
          </SelectCal>
          {/* TagSelectOption : 여기가 태그 넣는 부분입니다. 위치 수정하시면 됩니다. */}
          <TagSelectOption>
            <div style={{ flex: 1, position: 'relative' }}>
              <div
                style={{ display: 'flex', justifyContent: 'flex-start' }}
                onClick={() => setShowTagsSelectOptions(!showTagsSelectOptions)}
              >
                <div>
                  <AiFillTags size="1.8em" />
                </div>
                <div>
                  <label>Tag 선택</label>
                </div>
              </div>
              <div>{tagsSelectOptions}</div>
              <div style={{ display: 'flex', marginLeft: '10px', flexWrap: 'wrap' }}>
                {selectedTags}
              </div>
            </div>
          </TagSelectOption>
          <Space></Space>
          <BtnArea>
            <CloseBtn onClick={handleCloseBtn}>cancel</CloseBtn>
            <SubmitBtn
              onClick={() => {
                handleUpdate(
                  id,
                  selectedCalendar,
                  JSON.stringify(TodayForAxios),
                  JSON.stringify({ hour, min }),
                  titleValue,
                  contextValue,
                  imageUrl,
                  newArrayOfTagsId,
                );
                onHide();
              }}
              // onClick={async () => {
              //   const today = getToday();
              //   const userId = currentUser;
              //   const scheduleDate = {
              //     year: today.year,
              //     month: today.month,
              //     day: today.day,
              //   };
              //   const scheduleTime = { hour: hour, min: min };
              //   const imageUrl = 'www.';
              //   const calendarId = selectedCalendar;
              //   await sendReview(
              //     userId,
              //     titleValue,
              //     contextValue,
              //     imageUrl,
              //     scheduleDate,
              //     scheduleTime,
              //     calendarId,
              //     checkedTagArray,
              //   );
              //   //scheduleTime, calendarId
              //   // 스케줄데이트(3) / 스케줄타임(2)으로 나눠서 보내야 함
              //   await setTitleValue('');
              //   await setContextValue('');
              //   // setNewPosted(true); // update 함수 안에 이미 있음
              //   onHide();
              // }}
            >
              update
            </SubmitBtn>
          </BtnArea>
        </ModalSetting>
        <TitleAndContext>
          <TitleInput placeholder="제목" onChange={titleChange} value={titleValue}></TitleInput>
          {/* <div style={{ border: '1px solid grey', margin: '10px 0px' }} /> */}
          <ContextArea
            placeholder="쓰고 싶은 내용을 자유롭게 남겨주세요"
            onChange={contextChange}
            value={contextValue}
          ></ContextArea>
        </TitleAndContext>
      </Modal>
    </ModalMask>
  );
}

const BtnArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TagBtn = styled.button`
  outline: none;
  border: 0px;
  background-color: white;
  &:hover {
    color: #1a73e8;
  }
`;

const CalText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;
`;

const ErrModal = styled.span<{ show?: boolean }>`
  border-bottom: 2px solid red;
  padding-top: 3px;
  padding-left: 5px;
  text-align: left;
  background: black;
  color: white;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
`;

const ModalAndArrow = styled.span`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 30px;
  background: #f2f2f2;
  color: white;
`;

const ModalMask = styled.div<{ show?: boolean }>`
  display: ${props => (props.show ? 'grid' : 'none')};
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  place-items: center;
`;

const Modal = styled.div`
  width: 90vw;
  height: 85vh;
  padding: 2vh;
  background-color: #f2f2f2;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  position: absolute;
  z-index: 500;
`;

const ModalSetting = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;
const TitleAndContext = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
`;
const CloseBtn = styled.button`
  width: 100px;
  height: 5vh;
  background: black;
  outline: none;
  color: white;
  font-size: 20px;
  border: 2px solid black;
  border-radius: 2px;
  margin-right: 2vw;
  &:hover {
  }
`;
const TitleInput = styled.input`
  flex: 1;
  border: 0px;
  outline: none;
  background-color: white;
  /* font-size: 25px;
  font-weight: bold; */
`;

const ContextArea = styled.textarea`
  flex: 16;
  border: 0px;
  border-radius: 3px;
  background-color: white;
  outline: none;
`;

const SubmitBtn = styled.button`
  flex: 1;
  width: 100px;
  height: 5vh;
  background: black;
  outline: none;
  color: white;
  font-size: 20px;
  margin-left: -15px;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 2px;
  justify-self: flex-end;
  align-self: flex-end;
`;

const TimeHeader = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 23px;
`;

const MonthAndDay = styled.div`
  flex: 1;
  text-align: center;
  font-size: 33px;
  font-weight: 600;
  background: #f2f2f2;
  justify-self: flex-start;
`;
const HourInput = styled.input<{ show?: boolean }>`
  display: ${props => (props.show ? 'block' : 'none')};
  background: #f2f2f2;
  width: 30px;
  border: 0px;
  outline: none;
`;
const MinInput = styled.input<{ show?: boolean }>`
  display: ${props => (props.show ? 'block' : 'none')};
  background: #f2f2f2;
  width: 30px;
  border: 0px;
  outline: none;
`;
const Space = styled.div`
  flex: 10;
`;

const SpaceTime = styled.div`
  margin-right: 10px;
`;
const SelectCal = styled.select`
  flex: 1;
`;

const TagSelectOption = styled.div`
  flex: 1;
  margin-top: 2vh;
  font-size: 18px;
`;

const TagSelectWindow = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid grey;
  border-radius: 10px;
  background-color: white;
  z-index: 7;
  padding: 5px;
  width: 250px;
`;

const TagIcon = styled.div<{ tagColor: string; tagId: number }>`
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
