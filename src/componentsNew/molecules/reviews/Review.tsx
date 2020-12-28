import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';

import { RootState } from '../../../modules';
import { useSelector, useDispatch } from 'react-redux';
// VscCircleOutline

import { BigModalForUpdateReview, ModalChoice } from '../../atoms';

//형태만 만든다고 하면 어떤 모양일까?

interface scheduleDateI {
  year: number;
  month: number;
  day: number;
}

interface scheduleTimeI {
  hour: number;
  min: number;
}
interface Props {
  title: string;
  context: string;
  imageUrl: string | null;
  scheduleDate: scheduleDateI;
  scheduleTime: scheduleTimeI;
  id: number;
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
  handleDel: any;
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
}

export default function Review({
  id,
  title,
  context,
  imageUrl,
  scheduleDate,
  scheduleTime,
  calendarId,
  handleDel,
  reviewTags,
  defaultArrayOfTagsId,
  handleUpdate,
}: Props) {
  const handleDelReview = () => {
    handleDel(id, calendarId);
  };

  // let tags: any = [];
  // const handleUpdateReview = () => {
  //   handleUpdate(reviewId, calendarId, scheduleTime, title, context, imageUrl, tags);
  // };

  const [handleModalChoice, setHandleModalChoice] = useState(false);

  const [showUpdateReviewModal, setShowUpdateReviewModal] = useState(false);
  const onHide = () => {
    setShowUpdateReviewModal(false);
  };

  let updateReviewModal = !showUpdateReviewModal ? (
    ''
  ) : (
    <BigModalForUpdateReview
      show={showUpdateReviewModal}
      onHide={onHide}
      handleUpdate={handleUpdate}
      id={id}
      title={title}
      context={context}
      imageUrl={imageUrl === null ? '' : imageUrl}
      scheduleDate={scheduleDate}
      scheduleTime={scheduleTime}
      calendarId={calendarId}
      reviewTags={reviewTags}
      defaultArrayOfTagsId={defaultArrayOfTagsId}
    />
  );

  let attachedTags = reviewTags.map(eachTag => {
    if (eachTag.tag !== null) {
      return (
        <TagIcon key={eachTag.tag.id} tagId={eachTag.tag.id} tagColor={eachTag.tag.tagColor}>
          {eachTag.tag.tagName}
        </TagIcon>
      );
    }
  });

  const handleDeleteAction = () => {
    handleDelReview();
    setHandleModalChoice(false);
  };

  const handleCloseModal = () => {
    setHandleModalChoice(false);
  };

  return (
    <Box>
      <ReviewBox>
        <FaCheckCircle
          style={{
            marginLeft: '5px',
            zIndex: 100,
            background: 'white',
            position: 'absolute',
            margin: '5px',
          }}
        ></FaCheckCircle>
        <TimeLine
        // style={{ border: '1px solid red' }}
        >
          <TimeAndTitle>
            <Time>{scheduleTime.hour + ':' + scheduleTime.min}</Time>
            <Title>{title}</Title>
            <div
              style={{
                display: 'flex',
                flex: 4.5,
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
                // marginRight: '5px',
              }}
            >
              {attachedTags}
            </div>
            <Edit onClick={() => setShowUpdateReviewModal(true)}>수정</Edit>
            {/* <Del onClick={() => setHandleModalChoice(true)}>삭제</Del> */}
            <Del onClick={handleDelReview}>삭제</Del>
          </TimeAndTitle>
          <ContexAndLine show={context.length === 0 ? false : true}>
            <Context>{context}</Context>
          </ContexAndLine>
          <ReviewSetting>{/* <Edit onClick={hadleUpdateReview}>수정</Edit> */}</ReviewSetting>
        </TimeLine>
        {updateReviewModal}
        <ModalChoice
          title={`'${title}' Review를 삭제하시겠습니까?`}
          isVisible={handleModalChoice}
          actionFunction={handleDeleteAction}
          handleCloseModal={handleCloseModal}
        />
      </ReviewBox>
    </Box>
  );
}
const Box = styled.div``;
const TimeLine = styled.div`
  background: white;
  margin-left: 10px;
  border-left: 2px solid black;
  z-index: 1;
`;

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimeAndTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
`;

const Time = styled.div`
  margin-left: 6px;
  width: 50px;
  position: block;
  text-align: center;
  color: #3c4043;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
`;
const Title = styled.div`
  margin-left: 10px;
  font-size: 15px;
  display: flex;
  flex: 1.5;
  color: black;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 40px;
`;

const ContexAndLine = styled.div<{ show?: boolean }>`
  display: ${props => (props.show ? 'flex' : 'none')};
`;
const Context = styled.div`
  margin-top: 3px;
  margin-bottom: 3px;
  flex: 1;
  margin-left: 15px;
  margin-right: 2vw;
  border: 1px solid gray;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  white-space: pre;
`;

const ReviewSetting = styled.div`
  margin-left: 10px;
`;

const Edit = styled.span`
  flex: 0.5;
  margin-left: 20px;
  text-align: flex-end;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;
const Del = styled.div`
  flex: 0.5;
  margin-left: 20px;
  text-align: flex-end;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: red;
  }
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
