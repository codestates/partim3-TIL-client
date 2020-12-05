import React from 'react';

import { Container, Row } from 'react-bootstrap';

import {
  SidebarCal,
  SidebarHeader,
  SidebarMyCal,
  SidebarOtherCal,
  SidebarTag,
} from '../molecules/sidebar';

interface SidebarProps {
  setNewCalPosted: (trueOrFalse: boolean) => void;
}

export default function Sidebar({ setNewCalPosted }: SidebarProps) {
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
        <SidebarMyCal setNewCalPosted={setNewCalPosted}></SidebarMyCal>
      </Row>
      <Row>
        <SidebarOtherCal></SidebarOtherCal>
      </Row>
    </Container>
  );
}
