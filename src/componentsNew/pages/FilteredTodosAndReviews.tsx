import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import {
  handle_filteredTodosAndReviews_Start,
  handle_filteredTodosAndReviews_Success,
  handle_filteredTodosAndReviews_Failure,
} from '../../modules/handle_filteredTodosAndReviews';
import {
  handle_tags_ArrayForFiltering_Starts,
  handle_tags_ArrayForFiltering_Success_Add,
  handle_tags_ArrayForFiltering_Success_Del,
} from '../../modules/handle_TagsAndCalsArrayForFiltering';
import axios from 'axios';
import REACT_APP_URL from '../../config';

import {
  FliteredTodos,
  MyCalendarsForFiltering,
  AllTagsListRendering,
  SelectedTagsListRendering,
} from '../oraganisms/FilteredTagsAndReviews';

export default function FilteredTodosAndReviews() {
  const { currentUser } = useSelector((state: RootState) => state.loginOut.status);

  const { tags_ArrayForFiltering } = useSelector(
    (state: RootState) => state.handle_TagsAndCalsArrayForFiltering,
  );

  const { filteredTodosAndReviews } = useSelector(
    (state: RootState) => state.handle_filteredTodosAndReviews,
  );

  const dispatch = useDispatch();
  const history = useHistory();

  if (typeof currentUser !== 'number') {
    alert('먼저 로그인을 해 주세요.');
    history.push('/login');
  }

  const getFilteredTodosAndReviews = () => {
    dispatch(handle_filteredTodosAndReviews_Start());

    axios
      .get(`${REACT_APP_URL}/calendar/filtertags`, {
        params: {
          userId: currentUser,
        },
        withCredentials: true,
      })
      .then(res => {
        let filteredTodosAndReviews = res.data.tags;
        dispatch(handle_filteredTodosAndReviews_Success(filteredTodosAndReviews));
      })
      .catch(err => {
        dispatch(handle_filteredTodosAndReviews_Failure());
        console.log({ err });
      });
  };

  const handleClickTagIcon = (tagId: number) => {
    if (tags_ArrayForFiltering.indexOf(tagId) === -1) {
      dispatch(handle_tags_ArrayForFiltering_Starts());
      dispatch(handle_tags_ArrayForFiltering_Success_Add(tagId));
    } else {
      dispatch(handle_tags_ArrayForFiltering_Starts());
      dispatch(handle_tags_ArrayForFiltering_Success_Del(tags_ArrayForFiltering.indexOf(tagId)));
    }
  };

  useEffect(() => getFilteredTodosAndReviews(), [currentUser]);

  return (
    <FilteredTodosAndReviewsWrap>
      <FilteredTodosAndReviewsHeader>
        {/* <Link to="/calendar/day">/calendar/day 로 돌아가기(임시)</Link> */}
        <Link to="/calendar/day">
          <img
            src="/img/cat.jpeg"
            height="90"
            width="110"
            style={{ borderRadius: '50%', margin: '5px' }}
          />
        </Link>
      </FilteredTodosAndReviewsHeader>
      <FilteredTodosAndReviewsMain>
        <FilteredTodosAndReviewsSidebar>
          <SideBarTags>
            <AllTagsListRendering handleClickTagIcon={handleClickTagIcon} />
            {/* <HrLine />
            <SelectedTagsListRendering handleClickTagIcon={handleClickTagIcon} /> */}
          </SideBarTags>
          {/* <HrLine /> */}
          <SideBarCalendars>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              필터링할 캘린더를 선택하세요.
            </div>
            <HrLine />
            <MyCalendarsForFiltering />
          </SideBarCalendars>
        </FilteredTodosAndReviewsSidebar>
        <FilteredTodosAndReviewsBody>
          {/* FliteredTodos */}
          <SelectedTagsListRendering handleClickTagIcon={handleClickTagIcon} />
          {filteredTodosAndReviews === undefined ? <></> : <FliteredTodos />}
          {/* <FliteredTodos />
            원럐는 위와 같이 넣고 싶었으나, 
            이렇게 하면 filteredTodosAndReviews가 갱신되기 전에 FliteredTodos를 렌더링해서 
            filteredTodosAndReviews가 undefined로 잡힘 
          */}
          <HrLine />
          <FliteredReviews>FliteredReviews - coming soon</FliteredReviews>
        </FilteredTodosAndReviewsBody>
      </FilteredTodosAndReviewsMain>
    </FilteredTodosAndReviewsWrap>
  );
}

const FilteredTodosAndReviewsWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const HrLine = styled.hr`
  border: 0;
  clear: both;
  display: block;
  width: 100%;
  background-color: gray;
  height: 2px;
  margin: 10px 0px;
`;

const FilteredTodosAndReviewsHeader = styled.div`
  display: flex;
  /* border: 1px solid red; */
  border-bottom: 2px solid lightgrey;
  width: 100%;
  height: 100px;
`;

const FilteredTodosAndReviewsMain = styled.div`
  flex: 1;

  display: flex;
  /* border: 1px solid purple; */
`;

const FilteredTodosAndReviewsSidebar = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
  border-right: 2px solid lightgrey;
  flex: 0 0 auto;
  height: 100%;
  width: 250px;
`;

const FilteredTodosAndReviewsBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  /* border: 5px solid yellow; */
  padding: 10px;
`;

const FliteredReviews = styled.div``;

const SideBarTags = styled.div`
  flex: 0 0 40%;
  /* border: 1px solid blue; */
  width: 100%;
  padding: 10px;
`;

const SideBarCalendars = styled.div`
  /* flex: 1; */
  /* border: 1px solid blue; */
  width: 100%;
  padding: 10px;
`;

const TagIcon = styled.div<{ tagColor: string; tagId: number }>`
  border-radius: 5px;
  background-color: ${props => props.tagColor};
  color: white;
  font-weight: bold;
  padding: 4px;
  margin: 4px;
  box-shadow: 1px 1px 1px grey;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
