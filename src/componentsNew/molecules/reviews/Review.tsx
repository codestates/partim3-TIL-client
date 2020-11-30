import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//형태만 만든다고 하면 어떤 모양일까?
type Props = {
  list: {
    title: string | null;
    context: string | null;
    imageUrl: string | null;
    scheduleTime: string | null;
    id: number;
  };
};
//여기에서 결국 props를 정의해 주어야, 상위에서도 사용할 수 있다.
//으으으.. 타입스크립트... 정말 이게 시간을 줄여준다는게 맞는건가..

type parseStT = {
  year: number;
  month: number;
  hour: number;
  min: number;
};

export default function Review(props: Props) {
  if (props.list.scheduleTime) {
    const parseSt: parseStT = JSON.parse(props.list.scheduleTime);

    return (
      <Container fluid>
        <Row>
          <Col className="m-auto" xs={5} sm={5} md={5}>
            {parseSt.hour + ' : ' + parseSt.min}
          </Col>
          <Col className="m-auto" xs={7} sm={7} md={7}>
            {props.list.title}
          </Col>
        </Row>
        <Row className="m-auto" xs={12} sm={12} md={12}>
          {props.list.context}
        </Row>
      </Container>
    );
  }

  return <div></div>;
}
