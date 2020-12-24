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
      todosList = todos.map(todo => {
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
          let scheduleDate: scheduleDateType = JSON.parse(todo.scheduleDate);
          let todoTags = todo.todoTags;

          return (
            <Todo
              title={title}
              id={id}
              key={id}
              calendarId={calendarId}
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
      <Row className="m-1" style={{ border: '1px solid black' }}>
        <TodosDayAndPostModal setNewPosted={setNewPosted} />
      </Row>
      <Row
        className="m-1"
        style={{ border: '1px solid yellow', overflow: 'auto', flexDirection: 'column' }}
      >
        {todosList}
      </Row>
    </>
  );
}
