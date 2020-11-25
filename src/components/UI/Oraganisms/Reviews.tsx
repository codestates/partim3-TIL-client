import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import Review from '../Molecules/Review';
import sendReview from '../Atoms/sendReviewF';
import ReviewModal from '../Molecules/ReviewModal';

import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Reviews() {
  const { reviews } = useSelector((state: RootState) => state.calendarDay.todosAndReviews);

  const reviewList = reviews.map(el => {
    return <Review key={el.id} list={el} />;
  });

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container fluid>
      <Row className="m-auto">
        <Col xs={4} sm={4} md={4}>
          무얼 하고 있나?
        </Col>
        <Col xs={8} sm={8} md={8}>
          이 공간을 누르면 리뷰 생성??
        </Col>
      </Row>
      <Row className="m-auto" xs={12} sm={12} md={12}>
        {reviewList}
      </Row>
      <Row>
        {/* <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button> */}
        {/* <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} /> */}
        <div
          onClick={() => {
            setModalShow(true);
          }}
        >
          빈공간을 어떻게 넣지.
        </div>
        <ReviewModal show={modalShow} onHide={() => setModalShow(false)}></ReviewModal>
      </Row>
    </Container>
  );
}

// render review get요청으로 받아와서, 화면에 리뷰들을 뿌려주는 부분을 구현해야함.
// molecules로 review를 구현
// post review 비어있는 부분을 만들어서 공란을 선택시에 해당 함수가 동작하도록 해야하고, 값을 어떻게 받아올지도 고민해야함.

// sendReview는 어떤 인자값을 받지않는 함수여야 함.
// axios에 리턴이 있으면 Promise<void>, 없으면 그냥 void인데 차이가 뭔지 모르겠음.
