import React from 'react';
import styled from 'styled-components';

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
    <SidebarContainer>
      <SidebarHeader></SidebarHeader>
      <SidebarTag></SidebarTag>
      <SidebarCal></SidebarCal>
      <SidebarMyCal setNewCalPosted={setNewCalPosted} setCalDeleted={setCalDeleted}></SidebarMyCal>
      <SidebarSharedCal setCalDeleted={setCalDeleted}></SidebarSharedCal>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  /* margin: 5px; */
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
