import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MypageCalSidebar from '../oraganisms/MypageCalSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import axios from 'axios';
import REACT_APP_URL from '../../config';
import {
  handle_rerenderCalendarDay_Start,
  handle_rerenderCalendarDay_Success,
  handle_rerenderCalendarDay_Failure,
} from '../../modules/handle_rerenderCalendarDay';

interface MypageHeaderAndSidebarProps {
  childComponent: React.ReactNode;
  changeCalComponent: any;
}

export default function MypageHeaderAndSidebar({ childComponent, handleGetMessage }: any) {
  //라우팅 주소로 calendar가 찍혔을 때 함수가 props로 내려옴.
  //내려오고 난 다음부터는 문제가 없음
  //바로 이동하게 되면 사이드바로 넘어가게 되서 문제가됨.

  const { calendarDay_rerendered } = useSelector(
    (state: RootState) => state.handle_rerenderCalendarDay,
  );

  const [myCalendarsNames, setMyCalendarsNames] = useState([]);
  const [shareCalendarsNames, setShareCalendarsNames] = useState([]);

  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);

  const dispatch = useDispatch();

  const getAllCals = () => {
    axios
      .get(`${REACT_APP_URL}/calendar/calendars`, {
        params: {
          userId: currentUser,
        },
        withCredentials: true,
      })
      .then(res => {
        const { myCalendars, shareCalendars } = res.data;
        setMyCalendarsNames(myCalendars);
        setShareCalendarsNames(shareCalendars);
      });
  };

  useEffect(() => {
    getAllCals();
    dispatch(handle_rerenderCalendarDay_Success(false));
  }, [calendarDay_rerendered]);

  return (
    <Container>
      <Header>
        <Title>Setting</Title>
        <Space>
          <Link to="/calendar/day">
            <Btn>완료</Btn>
          </Link>
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
          <Text>Calendars</Text>

          <MypageCalSidebar
            myCalendar={myCalendarsNames}
            shareCalendar={shareCalendarsNames}
          ></MypageCalSidebar>
        </Sidebar>
        <Main>{childComponent}</Main>
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
