import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../modules';
import styled from 'styled-components';

import {
  handleTodayStart,
  handleTodaySuccess,
  handleTodayFailure,
} from '../../../modules/handleToday';
import {
  handleCheckedCalStart,
  handleCheckedCalSuccess_add,
  handleCheckedCalSuccess_del,
  handleCheckedCalFailure,
} from '../../../modules/handleCheckedCal';
import { todayProps } from '../../../types';

interface andFilteredReviewIdType {
  [name: string]: number;
}

export default function FliteredReviews() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { filteredTodosAndReviews } = useSelector(
    (state: RootState) => state.handle_filteredTodosAndReviews,
  );
  const { tags_ArrayForFiltering } = useSelector(
    (state: RootState) => state.handle_TagsAndCalsArrayForFiltering,
  );
  const { cals_ArrayForFiltering } = useSelector(
    (state: RootState) => state.handle_TagsAndCalsArrayForFiltering,
  );
  const { checkedCalArray } = useSelector((state: RootState) => state.handleCheckedCal);

  const goToClickedReview_CalendarDayPage = (
    eachReviewCalendarId: number,
    clickedReview_Date: todayProps,
  ) => {
    dispatch(handleTodayStart());
    dispatch(handleTodaySuccess(clickedReview_Date));

    let delTime = checkedCalArray.length - 1;

    for (let i = delTime; i >= 0; i--) {
      dispatch(handleCheckedCalStart());
      dispatch(handleCheckedCalSuccess_del(checkedCalArray.indexOf(checkedCalArray[i])));
    }

    dispatch(handleCheckedCalSuccess_add(eachReviewCalendarId));

    history.push('/calendar/day');
  };

  let andFilteredReviewId: andFilteredReviewIdType = {};

  let filteredReviewsList =
    filteredTodosAndReviews.length === 0
      ? 'Tag가 없습니다. 먼저 Tag를 만들고, Todo에 등록해 보세요!'
      : filteredTodosAndReviews.map(eachTagsResult => {
          if (tags_ArrayForFiltering.indexOf(eachTagsResult.id) !== -1) {
            let tagId = eachTagsResult.id;
            let tagColor = eachTagsResult.tagColor;
            let tagName = eachTagsResult.tagName;
            let ReviewsFilteredByTag = eachTagsResult.reviewTags;
            return ReviewsFilteredByTag.map(eachReview => {
              if (eachReview.review === null) {
                ('');
              } else {
                if (cals_ArrayForFiltering.indexOf(eachReview.review.calendar.id) !== -1) {
                  let eachReviewId = eachReview.review.id;
                  let eachReviewTitle = eachReview.review.title;
                  let eachReviewScheduleDate = JSON.parse(eachReview.review.scheduleDate);
                  let eachReviewCalendarId = eachReview.review.calendar.id;
                  let eachReviewCalendarName = eachReview.review.calendar.name;
                  let eachReviewCalendarColor = eachReview.review.calendar.color;

                  andFilteredReviewId[eachReviewId] === undefined
                    ? (andFilteredReviewId[eachReviewId] = 1)
                    : andFilteredReviewId[eachReviewId]++;

                  if (andFilteredReviewId[eachReviewId] === tags_ArrayForFiltering.length) {
                    return (
                      <FilteredReviews_byTags
                        key={eachReviewId}
                        tagId={eachReviewId}
                        onClick={() => {
                          goToClickedReview_CalendarDayPage(
                            eachReviewCalendarId,
                            eachReviewScheduleDate,
                          );
                        }}
                      >
                        <div style={{ display: 'flex', flex: 2, margin: '10px' }}>
                          {/* Title :  */}
                          {eachReviewTitle}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flex: 1,
                            margin: '10px',
                            justifyContent: 'flex-end',
                          }}
                        >
                          {/* Date&nbsp;:&nbsp; */}
                          {`${eachReviewScheduleDate.year}. ${eachReviewScheduleDate.month}. ${eachReviewScheduleDate.day}`}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flex: 1,
                            margin: '10px',
                            justifyContent: 'flex-end',
                          }}
                        >
                          {/* {`(서버 요청) review 별로 캘린더아이디가 따라와야, 캘린더별 필터링 가능`} */}
                          {/* <span>Calendar&nbsp;:&nbsp;</span> */}
                          <span style={{ color: `${eachReviewCalendarColor}` }}>
                            {eachReviewCalendarName}
                          </span>
                        </div>
                      </FilteredReviews_byTags>
                    );
                  }
                }
              }
            });
          }
        });

  let filteredReviewEmpty;

  for (let passedTime in andFilteredReviewId) {
    if (andFilteredReviewId[passedTime] === tags_ArrayForFiltering.length) {
      filteredReviewEmpty = '';
      break;
    } else {
      filteredReviewEmpty = '필터링된 결과가 없습니다.';
    }
  }

  if (Object.keys(andFilteredReviewId).length === 0) {
    filteredReviewEmpty = '필터링된 결과가 없습니다.';
  }

  return (
    <FliteredReviewsWrap>
      {filteredReviewsList}
      {filteredReviewEmpty}
    </FliteredReviewsWrap>
  );
}

const FliteredReviewsWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  margin: 2px;
  /* flex-grow: 1; */
  height: 65%;
  overflow: scroll;
`;

const FilteredReviews_byTags = styled.div<{ tagId: number }>`
  display: flex;
  /* flex: 1; */
  border: 1px solid grey;
  border-radius: 10px;
  margin: 2px;
  align-items: center;
  justify-content: 'space-between';
`;
