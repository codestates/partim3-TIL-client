import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import Review from '../molecules/reviews/Review';
import ReviewModal from '../molecules/reviews/ReviewModal';
import BigModal from '../atoms/BigModal';
import getToday from '../../componentsNew/utils/todayF';
import styled from 'styled-components';
import { BiPen } from 'react-icons/bi';

interface ReviewsProps {
  setNewPosted: (newPosted: boolean) => void;
}

export default function Reviews({ setNewPosted }: ReviewsProps) {
  const { reviews } = useSelector((state: RootState) => state.calendarDay.todosAndReviews);
  const [modalShow, setModalShow] = React.useState(false);

  let reviewList;

  if (reviews === []) {
    reviewList = '';
  } else {
    //시간 순서대로 랜더링.. 후..
    //시간과 분을 숫자로 변환
    // console.log('reviews');

    let addTotalTime = reviews.map((el: any) => {
      let date = el.scheduleDate;
      let time = el.scheduleTime;
      let total = date.year + '/' + date.month + '/' + date.day + ' ' + time.hour + ':' + time.min;
      let parseTime = Date.parse(total);
      el['totalTime'] = parseTime;
      return el;
    });
    let sortedList = addTotalTime.sort(function (a, b) {
      return parseFloat(a.totalTime) - parseFloat(b.totalTime);
    });
    const hadleModalShow = () => {
      setModalShow(true);
    };

    reviewList = sortedList.map((el: any) => {
      const { id, title, context, imageUrl, scheduleDate, scheduleTime } = el;
      //  {/* <BiGame style={{ flex: 1, zIndex: 100, background: 'red' }}></BiGame> */}
      //       {/* <TimeLine></TimeLine> */}
      return (
        <div>
          <Review
            key={id}
            id={id}
            title={title}
            context={context}
            imageUrl={imageUrl}
            scheduleDate={scheduleDate}
            scheduleTime={scheduleTime}
          ></Review>
        </div>
      );
    });
  }

  return (
    <Box>
      <ReviewContainer>
        <TitleAndBtn>
          <ReviewTitle>
            TIL-오늘 하루종일 무얼했나?{'  '}
            <AddReviewBtn
              onClick={() => {
                setModalShow(true);
              }}
            >
              기록하기 <BiPen></BiPen>
            </AddReviewBtn>
          </ReviewTitle>
        </TitleAndBtn>
        <div>{reviewList}</div>
        <BigModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          setNewPosted={setNewPosted}
          time={getToday()}
        ></BigModal>
      </ReviewContainer>
    </Box>
  );
}
// margin-left: 10px;

const Box = styled.div`
  padding-top: 10px;
  border-top: 1px solid #dadce0;
`;

const ReviewContainer = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;

const TitleAndBtn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ReviewTitle = styled.div`
  flex: 0.5;
`;

const AddReviewBtn = styled.button`
  width: 100px;
  height: 30px;
  font-size: 13px;
  outline: none;
  border: 0px;
  border-bottom: 1px solid #dadce0;
  color: #3c4043;
  background-color: white;
  border-radius: 2px;
  &:hover {
    outline: none;
    background-color: #f0f2f1;
    color: black;
  }
`;
// render review get요청으로 받아와서, 화면에 리뷰들을 뿌려주는 부분을 구현해야함.
// molecules로 review를 구현
// post review 비어있는 부분을 만들어서 공란을 선택시에 해당 함수가 동작하도록 해야하고, 값을 어떻게 받아올지도 고민해야함.

// sendReview는 어떤 인자값을 받지않는 함수여야 함.
// axios에 리턴이 있으면 Promise<void>, 없으면 그냥 void인데 차이가 뭔지 모르겠음.
