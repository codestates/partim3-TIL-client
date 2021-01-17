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
}

export default function MypageHeaderAndSidebar({ childComponent }: MypageHeaderAndSidebarProps) {
  //라우팅 주소로 calendar가 찍혔을 때 함수가 props로 내려옴.
  //내려오고 난 다음부터는 문제가 없음
  //바로 이동하게 되면 사이드바로 넘어가게 되서 문제가됨.

  //변경된 후 뭔가 이상함.
  const { calendarDay_rerendered } = useSelector(
    (state: RootState) => state.handle_rerenderCalendarDay,
  );

  const [myCalendarsNames, setMyCalendarsNames] = useState([]);
  const [shareCalendarsNames, setShareCalendarsNames] = useState([]);

  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);

  const dispatch = useDispatch();
  const history = useHistory();

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
        // console.log(myCalendars);
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
          <Btn onClick={() => history.push('/calendar/day')}>완료</Btn>
        </Space>
      </Header>
      <Body>
        <Sidebar>
          <Text
            onClick={() => history.push('/mypage/profile')}
            isLocated={window.location.pathname === '/mypage/profile' ? true : false}
          >
            Profile
          </Text>
          <Text
            onClick={() => history.push('/mypage/tags')}
            isLocated={window.location.pathname === '/mypage/tags' ? true : false}
          >
            Tags
          </Text>
          <Text
            isLocated={window.location.pathname.indexOf('/mypage/calendar') !== -1 ? true : false}
          >
            Calendars
          </Text>

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
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: black;
  color: white;
`;

const Title = styled.h2`
  flex: 1;
  font-size: 40px;
  margin-left: 20px;
`;
const Space = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Btn = styled.button`
  flex: 0.1;
  margin-right: 2vw;
  height: 40px;
  width: 5vw;
  color: white;
  outline: none;
  border: 2px;
  border-radius: 2px;
  background: #6ab04c;
  font-size: 20px;
  font-weight: 500;
`;

const Body = styled.div`
  flex: 14;
  display: flex;
  /* flex-direction: row; */
`;
// 사이드바는 고정값을 가지게 할 수 없을까
// 미디어 쿼리를 써야하나?
// 사이드바의 명칭을 더 명확히 하는게 좋을까?
const Sidebar = styled.div`
  flex: 0 0 auto;
  width: 250px;
  /* border-right: 2px solid lightgrey; */
  background-color: #102027;
`;
const Text = styled.h5<{ isLocated: boolean }>`
  margin: 25px 0px 10px 20px;
  font-size: 30px;
  padding-left: 5px;
  border-left: ${props => (props.isLocated ? '4px solid white' : '4px solid #102027')};
  color: white;
`;
const Main = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
`;
