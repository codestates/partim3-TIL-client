import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//형태만 만든다고 하면 어떤 모양일까?
type Props = {
  title: string;
  context: string;
  imageUrl: string | null;
  scheduleTime: string;
  id: number;
};

type parseStT = {
  year: number;
  month: number;
  hour: number;
  min: number;
};

export default function Review({ id, title, context, imageUrl, scheduleTime }: Props) {
  if (scheduleTime) {
    const parseSt: parseStT = JSON.parse(scheduleTime);

    return (
      <Container fluid>
        <Row>
          <Col className="m-auto" xs={5} sm={5} md={5}>
            {parseSt.hour + ' : ' + parseSt.min}
          </Col>
          <Col className="m-auto" xs={7} sm={7} md={7}>
            {title}
          </Col>
        </Row>
        <Row className="m-auto" xs={12} sm={12} md={12}>
          {context}
        </Row>
      </Container>
    );
  }

  return <div></div>;
}
