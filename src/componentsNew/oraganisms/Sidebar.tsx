import React from 'react';
import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap';

import {
  SidebarCal,
  SidebarHeader,
  SidebarMyCal,
  SidebarSharedCal,
  SidebarTag,
} from '../molecules/sidebar';

interface SidebarProps {
  setNewCalPosted: (trueOrFalse: boolean) => void;
  setCalDeleted: (trueOrFalse: boolean) => void;
}

export default function Sidebar({ setNewCalPosted, setCalDeleted }: SidebarProps) {
  return (
    <Container>
      <Row>
        <SidebarHeader></SidebarHeader>
      </Row>
      <HrLine />
      <Row>
        <SidebarTag></SidebarTag>
      </Row>
      <HrLine />
      <Row>
        <SidebarCal></SidebarCal>
      </Row>
      <HrLine />
      <Row>
        <SidebarMyCal
          setNewCalPosted={setNewCalPosted}
          setCalDeleted={setCalDeleted}
        ></SidebarMyCal>
      </Row>
      <HrLine />
      <Row>
        <SidebarSharedCal></SidebarSharedCal>
      </Row>
    </Container>
  );
}

const HrLine = styled.hr`
  border: 0;
  clear: both;
  display: block;
  width: 100%;
  background-color: gray;
  height: 1px;
  margin: 5px 0px;
  padding: 0px;
`;
