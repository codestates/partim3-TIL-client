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

interface andFilteredTodoIdType {
  [name: string]: number;
}

export default function FliteredTodos() {
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

  const goToClickedTodo_CalendarDayPage = (
    eachTodoCalendarId: number,
    clickedTodo_Date: todayProps,
  ) => {
    dispatch(handleTodayStart());
    dispatch(handleTodaySuccess(clickedTodo_Date));

    let delTime = checkedCalArray.length - 1;

    for (let i = delTime; i >= 0; i--) {
      dispatch(handleCheckedCalStart());
      dispatch(handleCheckedCalSuccess_del(checkedCalArray.indexOf(checkedCalArray[i])));
    }

    dispatch(handleCheckedCalSuccess_add(eachTodoCalendarId));

    history.push('/calendar/day');
  };

  let andFilteredTodoId: andFilteredTodoIdType = {};

  let filteredtodosList =
    filteredTodosAndReviews.length === 0
      ? 'Tag가 없습니다. 먼저 Tag를 만들고, Todo에 등록해 보세요!'
      : filteredTodosAndReviews.map(eachTagsResult => {
          if (tags_ArrayForFiltering.indexOf(eachTagsResult.id) !== -1) {
            let tagId = eachTagsResult.id;
            let tagColor = eachTagsResult.tagColor;
            let tagName = eachTagsResult.tagName;
            let todosFilteredByTag = eachTagsResult.todoTags;
            return todosFilteredByTag.map(eachTodo => {
              if (eachTodo.todo === null) {
                ('');
              } else {
                if (cals_ArrayForFiltering.indexOf(eachTodo.todo.calendar.id) !== -1) {
                  let eachTodoId = eachTodo.todo.id;
                  let eachTodoTitle = eachTodo.todo.title;
                  let eachTodoScheduleDate = JSON.parse(eachTodo.todo.scheduleDate);
                  let eachTodoCalendarId = eachTodo.todo.calendar.id;
                  let eachTodoCalendarName = eachTodo.todo.calendar.name;
                  let eachTodoCalendarColor = eachTodo.todo.calendar.color;

                  andFilteredTodoId[eachTodoId] === undefined
                    ? (andFilteredTodoId[eachTodoId] = 1)
                    : andFilteredTodoId[eachTodoId]++;

                  if (andFilteredTodoId[eachTodoId] === tags_ArrayForFiltering.length) {
                    return (
                      <FilteredTodos_byTags
                        key={eachTodoId}
                        tagId={eachTodoId}
                        onClick={() => {
                          goToClickedTodo_CalendarDayPage(eachTodoCalendarId, eachTodoScheduleDate);
                        }}
                      >
                        <div style={{ display: 'flex', flex: 2, margin: '10px' }}>
                          {/* Title :  */}
                          {eachTodoTitle}
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
                          {`${eachTodoScheduleDate.year}. ${eachTodoScheduleDate.month}. ${eachTodoScheduleDate.day}`}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flex: 1,
                            margin: '10px',
                            justifyContent: 'flex-end',
                          }}
                        >
                          {/* {`(서버 요청) todo 별로 캘린더아이디가 따라와야, 캘린더별 필터링 가능`} */}
                          {/* <span>Calendar&nbsp;:&nbsp;</span> */}
                          <span style={{ color: `${eachTodoCalendarColor}` }}>
                            {eachTodoCalendarName}
                          </span>
                        </div>
                      </FilteredTodos_byTags>
                    );
                  }
                }
              }
            });
          }
        });

  let filteredTodoEmpty;

  for (let passedTime in andFilteredTodoId) {
    if (andFilteredTodoId[passedTime] === tags_ArrayForFiltering.length) {
      filteredTodoEmpty = '';
      break;
    } else {
      filteredTodoEmpty = '필터링된 결과가 없습니다.';
    }
  }

  if (Object.keys(andFilteredTodoId).length === 0) {
    filteredTodoEmpty = '필터링된 결과가 없습니다.';
  }

  return (
    <FliteredTodosWrap>
      {filteredtodosList}
      {filteredTodoEmpty}
    </FliteredTodosWrap>
  );
}

const FliteredTodosWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  margin: 2px;
  /* flex-grow: 1; */
  height: 200px;
  overflow: auto;
`;

// Tag별 개별 Todo들
const FilteredTodos_byTags = styled.div<{ tagId: number }>`
  display: flex;
  /* flex: 1; */
  border: 1px solid grey;
  border-radius: 10px;
  margin: 2px;
  align-items: center;
  justify-content: 'space-between';
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
