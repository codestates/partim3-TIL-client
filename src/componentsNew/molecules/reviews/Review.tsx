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
