import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MypageTagsContainer from '../../container/MypageTagsContainer';
import MypageCalendar from './MypageCalendar';
import MypageSettingContainer from '../../container/MypageSettingContainer';
import MypageCalSidebar from '../oraganisms/MypageCalSidebar';

export default function Mypage() {
  const [curComponent, setcurComponent] = useState(
    <MypageSettingContainer></MypageSettingContainer>,
  );
  const [curCal, setCurCal] = useState('curCal');

  const goProfile = (component: any) => {
    setcurComponent(component);
  };
  let mypageSetting = <MypageSettingContainer></MypageSettingContainer>;
  let mypageTags = <MypageTagsContainer></MypageTagsContainer>;

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
          <Text
            onClick={() => {
              goProfile(mypageSetting);
            }}
          >
            Profile
          </Text>
          <Text
            onClick={() => {
              goProfile(mypageTags);
            }}
          >
            Tags
          </Text>
          <Text>Calendar</Text>
          {/* 하위에서 useEffect 때문에 curCal이 바뀌면 해당 페이지가 랜더링이 됨 */}
          {/* 처음에는 세팅이 되었다가, 하위에서 curCal이 세팅이 되면서 useEffect가 실행되면 컴포넌트가 바뀌어버림 */}
          {/* goProfile을 useEffect에서 제거해주면 문제가 해결됨 */}
          <MypageCalSidebar goProfile={goProfile}></MypageCalSidebar>
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
  justify-contents: center;
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
  width: 200px;
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
