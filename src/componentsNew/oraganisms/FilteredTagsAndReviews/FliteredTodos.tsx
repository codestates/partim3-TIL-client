import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../modules';
import styled from 'styled-components';

export default function FliteredTodos() {
  const { filteredTodosAndReviews } = useSelector(
    (state: RootState) => state.handle_filteredTodosAndReviews,
  );
  const { tags_ArrayForFiltering } = useSelector(
    (state: RootState) => state.handle_TagsAndCalsArrayForFiltering,
  );

  let filteredtodosList =
    filteredTodosAndReviews.length === 0
      ? 'Tag가 없습니다. 먼저 Tag를 만들고, Todo에 등록해 보세요!'
      : filteredTodosAndReviews.map(eachTagsResult => {
          if (tags_ArrayForFiltering.indexOf(eachTagsResult.id) !== -1) {
            let tagId = eachTagsResult.id;
            let tagColor = eachTagsResult.tagColor;
            let tagName = eachTagsResult.tagName;
            let todosFilteredByTag = eachTagsResult.todoTags;
            return (
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                <div style={{ display: 'flex' }}>
                  <TagIcon key={tagId} tagId={tagId} tagColor={tagColor}>
                    {tagName}
                  </TagIcon>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '30px',
                    marginRight: '30px',
                  }}
                >
                  {todosFilteredByTag[0].todo === null
                    ? '선택하신 Tag로 필터링된 Todo가 없습니다.'
                    : todosFilteredByTag.map(eachTodo => {
                        let eachTodoId = eachTodo.todo.id;
                        let eachTodoTitle = eachTodo.todo.title;
                        let eachTodoScheduleDate = JSON.parse(eachTodo.todo.scheduleDate);
                        return (
                          <FilteredTodos_byTags key={eachTodoId} tagId={eachTodoId}>
                            <div style={{ display: 'flex', flex: 1, margin: '10px' }}>
                              title : {eachTodoTitle}
                            </div>
                            <div style={{ display: 'flex', flex: 1, margin: '10px' }}>
                              {`${eachTodoScheduleDate.year}년 ${eachTodoScheduleDate.month}월 ${eachTodoScheduleDate.day}일`}
                            </div>
                            <div style={{ display: 'flex', flex: 1, margin: '10px' }}>
                              {`(서버 요청) todo 별로 캘린더아이디가 따라와야, 캘린더별 필터링 가능`}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                flex: 2,
                                justifyContent: 'flex-end',
                                flexWrap: 'wrap',
                              }}
                            >
                              {
                                '(서버 요청) 여기에 이 투두가 가진 태그들을 나열하려면, 서버에서 투두별로 태그아이디들을 배열로 넘겨주던가 해야 함'
                              }
                            </div>
                          </FilteredTodos_byTags>
                        );
                      })}
                </div>
              </div>
            );
          }
        });

  return <FliteredTodosWrap>{filteredtodosList}</FliteredTodosWrap>;
}

const FliteredTodosWrap = styled.div`
  border: 1px solid red;
  margin: 5px;
`;

// Tag별 개별 Todo들
const FilteredTodos_byTags = styled.div<{ tagId: number }>`
  border: 1px solid blue;
  margin: 5px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: 'space-between';
`;

const TagIcon = styled.div<{ tagId: number; tagColor: string }>`
  border-radius: 10px;
  background-color: ${props => props.tagColor};
  color: white;
  font-weight: bold;
  padding: 4px;
  margin: 4px;
  box-shadow: 5px 5px 5px grey; // 클릭한 것만 이런 강조 효과를 주고 싶었는데,
`;
