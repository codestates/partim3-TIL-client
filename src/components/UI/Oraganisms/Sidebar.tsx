import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  SidebarCal,
  SidebarHeader,
  SidebarMyCal,
  SidebarOtherCal,
  SidebarTag,
} from '../Molecules/sidebar';

export default function Sidebar() {
  return (
    <Container>
      <Row>
        <SidebarHeader></SidebarHeader>
      </Row>
      <Row>
        <SidebarTag></SidebarTag>
      </Row>
      <Row>
        <SidebarCal></SidebarCal>
      </Row>
      <Row>
        <SidebarMyCal></SidebarMyCal>
      </Row>
      <Row>
        <SidebarOtherCal></SidebarOtherCal>
      </Row>
    </Container>
  );
}
