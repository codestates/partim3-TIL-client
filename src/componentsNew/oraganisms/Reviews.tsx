import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import Review from '../molecules/reviews/Review';
import ReviewModal from '../molecules/reviews/ReviewModal';
import BigModal from '../atoms/BigModal';

import { Container, Row, Col, Button } from 'react-bootstrap';

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
    reviewList = reviews.map(el => {
      const { id, title, context, imageUrl, scheduleTime } = el;
      return (
        <Review
          key={id}
          id={id}
          title={title}
          context={context}
          imageUrl={imageUrl}
          scheduleTime={scheduleTime}
        />
      );
    });
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Row>
            <Col>TIL-오늘 하루종일 무얼했나?</Col>
            <Col>여기에 기록하기</Col>
          </Row>
          <Row>{reviewList}</Row>
        </Col>
      </Row>
      <Row>
        <Col
          onClick={() => {
            setModalShow(true);
          }}
        >
          이어서 쓰기
        </Col>
        {/* <ReviewModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          setNewPosted={setNewPosted}
        ></ReviewModal> */}
        <BigModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          setNewPosted={setNewPosted}
        ></BigModal>
      </Row>
    </Container>
  );
}

// render review get요청으로 받아와서, 화면에 리뷰들을 뿌려주는 부분을 구현해야함.
// molecules로 review를 구현
// post review 비어있는 부분을 만들어서 공란을 선택시에 해당 함수가 동작하도록 해야하고, 값을 어떻게 받아올지도 고민해야함.

// sendReview는 어떤 인자값을 받지않는 함수여야 함.
// axios에 리턴이 있으면 Promise<void>, 없으면 그냥 void인데 차이가 뭔지 모르겠음.
