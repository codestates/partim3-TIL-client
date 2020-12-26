import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { Container, Row } from 'react-bootstrap';
import Todo from '../molecules/todos/Todo';
import TodosDayAndPostModal from '../molecules/todos/TodosDayAndPostModal';

interface TodosProps {
  setNewPosted: (newPosted: boolean) => void;
  setTodoDeletedOrUpdated: (todoDeleted: boolean) => void;
}

interface scheduleDateType {
  year: number;
  month: number;
  day: number;
}

export default function Todos({ setNewPosted, setTodoDeletedOrUpdated }: TodosProps) {
  const { todos } = useSelector((state: RootState) => state.calendarDay.todosAndReviews);
  const { checkedCalArray } = useSelector((state: RootState) => state.handleCheckedCal);

  let todosList;

  const renderFilteredCalenders = () => {
    if (todos === []) {
      todosList = '';
    } else {
      // 기존의 todos : 캘린더 순서대로 나열되고 있었음 (새로운 todo가 기존 todo목록의 중간에 끼워지는 문제 있었음)
      // 새로운 sortedTodos : 각 todo의 id 순서로 sort하여 처리함 (새로운 todo가 todo목록의 가장 밑으로 내려오게 됨)
      let sortedTodos = [...todos].sort((a, b) => a.id - b.id);
      todosList = sortedTodos.map(todo => {
        let defaultArrayOfTagsId: number[] = [];

        if (todo.todoTags[0].tag === null) {
          defaultArrayOfTagsId = [];
        } else {
          for (let j = 0; j < todo.todoTags.length; j++) {
            defaultArrayOfTagsId.push(todo.todoTags[j].tag.id);
          }
        }

        if (checkedCalArray.indexOf(todo.calendarId) !== -1) {
          let title = todo.title;
          let id = todo.id;
          let calendarId = todo.calendarId;
          let calendarColor = todo.calendarColor;
          let scheduleDate: scheduleDateType = JSON.parse(todo.scheduleDate);
          let todoTags = todo.todoTags;

          return (
            <Todo
              title={title}
              id={id}
              key={id}
              calendarId={calendarId}
              calendarColor={calendarColor}
              scheduleDate={scheduleDate}
              defaultArrayOfTagsId={defaultArrayOfTagsId}
              setTodoDeletedOrUpdated={setTodoDeletedOrUpdated}
              todoTags={todoTags}
            />
          );
        }
      });
    }
  };

  renderFilteredCalenders();

  useEffect(() => {
    renderFilteredCalenders();
  }, [checkedCalArray]);

  return (
    <>
      <Row className="m-1">
        <TodosDayAndPostModal setNewPosted={setNewPosted} />
      </Row>
      <div
        className="m-1"
        style={{
          // border: '1px solid yellow',
          overflow: 'auto',
          height: '187px',
          flexDirection: 'column',
        }}
      >
        {todosList}
      </div>
    </>
  );
}
