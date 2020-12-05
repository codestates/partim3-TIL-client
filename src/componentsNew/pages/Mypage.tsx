import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MypageTags from './MypageTags';
import MypageCalendar from './MypageCalendar';
import MypageSettingContainer from '../../container/MypageSettingContainer';

export default function Mypage() {
  //   const Page = styled.body`
  //     height: 100vh;
  //   `;

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

  const [curComponent, setcurComponent] = useState(<MypageTags></MypageTags>);
  const goProfile = (component: any) => {
    setcurComponent(component);
  };

  let mypageCalendar = <MypageCalendar></MypageCalendar>;
  let mypageSetting = <MypageSettingContainer></MypageSettingContainer>;
  let mypageTags = <MypageTags></MypageTags>;

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
          <Text
            onClick={() => {
              goProfile(mypageCalendar);
            }}
          >
            Calendar
          </Text>
        </Sidebar>
        <Main>{curComponent}</Main>
      </Body>
    </Container>
  );
}
