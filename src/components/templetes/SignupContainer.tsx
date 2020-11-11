import React from 'react';
import Button from '../UI/atoms/Button';
import Text from '../UI/atoms/Text';
import FormBoot from '../UI/atoms/FormBoot';

import { Container, Row, Col } from 'react-bootstrap';

export default function SignupContainer() {
  return (
    <Container className="py-5">
      <Row>
        <Col className="m-auto" xs={10} sm={8} md={6}>
          <Button color="red"></Button>
          <Text text="red"></Text>
          <Text text="kkk"></Text>
          <FormBoot type="email" placeholder="email"></FormBoot>
          <FormBoot type="nickname" placeholder="nickname"></FormBoot>
          <FormBoot type="password" placeholder="password"></FormBoot>
        </Col>
      </Row>
    </Container>
  );
}
