import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../modules';
import { MakeNewCal, RenderCalendars } from './sidebarCalUnits';
import axios from 'axios';
import REACT_APP_URL from '../../../config';

interface SidebarSharedCalProps {
  setCalDeleted: (trueOrFalse: boolean) => void;
}

export default function SidebarSharedCal({ setCalDeleted }: SidebarSharedCalProps) {
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);
  const { shareCalendar } = useSelector((state: RootState) => state.getAllCalendars.allCalendars);

  const delCalendar = (calID: number) => {
    console.log({ calID });
    if (typeof currentUser !== 'number') {
      alert('로그인 후 시도해 주세요.');
      return;
    }

    // [궁금한 점] calendar day의 sidebar에 있는 '공유받은 캘린더들'에서, 휴지통 버튼에는 '캘린더 삭제'기능을 붙여야 할지, '공유받은걸 취소'하는걸 붙여야 할지 모르겠음.
    // 아예 휴지통버튼 자체를 지우고 공유받은 캘린더는 설정창에서 컨트롤하는것도 좋아보임
    // 일단은 console.log() 함수만 연결해 뒀음

    // return axios
    //   .delete(`${REACT_APP_URL}/calendar/deletecalendar`, {
    //     data: {
    //       userId: currentUser,
    //       calendarId: calID,
    //     },
    //     withCredentials: true,
    //   })
    //   .then(res => {
    //     console.log(`${calID}번 캘린더 삭제 요청의 결과 : `, res.data);
    //     setCalDeleted(true);
    //     dispatch(handleCheckedCalSuccess_del(checkedCalArray.indexOf(calID)));
    //   })
    //   .catch(err => {
    //     console.log({ err });
    //     alert(`${err}`);
    //   });
  };

  return (
    <SidebarSharedCalWrap>
      <SharedCalTitle>공유 캘린더</SharedCalTitle>
      <RenderCalendars calendars={shareCalendar} delCalendar={delCalendar} isMyCalendar={false} />
    </SidebarSharedCalWrap>
  );
}

const SidebarSharedCalWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const SharedCalTitle = styled.h6`
  flex: 1;
  margin-top: 15px;
  color: white;
`;
