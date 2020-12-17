import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MypageCalSidebar from '../oraganisms/MypageCalSidebar';

interface MypageHeaderAndSidebarProps {
  childComponent: React.ReactNode;
}

export default function MypageHeaderAndSidebar({ childComponent }: MypageHeaderAndSidebarProps) {
  const [curComponent, setChildComponent] = useState(childComponent);

  const changeChildComponent = (component: any) => {
    setChildComponent(component);
  };
  return (
    <Container>
      <Header>
        <Title>Setting</Title>
        <Space>
          <Btn>완료</Btn>
        </Space>
      </Header>
      <Body>
        <Sidebar>
          <Text>
            <Link to="/mypage/profile">Profile</Link>
          </Text>
          <Text>
            <Link to="/mypage/tags">Tags</Link>
          </Text>
          <Text>
            <Link to="/mypage/calendar">Calendar</Link>
          </Text>
          <MypageCalSidebar changeChildComponent={changeChildComponent}></MypageCalSidebar>
        </Sidebar>

        <Main>{curComponent}</Main>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;

  flex-direction: column;
`;
// 화면의 비율이 항상 100%인가? 그 이상으로도 높이를 조정할 수 있는데
const Header = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border-bottom: 1px solid;
`;

const Title = styled.h2`
  flex: 5;
`;
const Space = styled.span`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Btn = styled.button`
  height: 5vh;
  width: 13vw;
  color: white;
  border: 0.1px;
  border-radius: 8px;
  background: green;
`;

const Body = styled.div`
  flex: 14;
  display: flex;
  flex-direction: row;
`;
// 사이드바는 고정값을 가지게 할 수 없을까
// 미디어 쿼리를 써야하나?
// 사이드바의 명칭을 더 명확히 하는게 좋을까?
const Sidebar = styled.div`
  flex: 1;
  border-right: 0.1px solid gray;
`;
const Text = styled.h5`
  margin: 10px;
`;
const Main = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
`;
