import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { Container, Row } from 'react-bootstrap';
import Todo from '../molecules/todos/Todo';
import TodosDayAndPostModal from '../molecules/todos/TodosDayAndPostModal';

export default function Todos() {
  const { todos } = useSelector((state: RootState) => state.calendarDay.todosAndReviews);
  // console.log(todos);
  // const todosList = todos.map(todo => {
  //   return <Todo todoTitle={todo.todoTitle} id={todo.id} key={todo.id} />;
  // });

  return (
    <>
      <Row className="m-1" style={{ border: '1px solid black' }}>
        <TodosDayAndPostModal />
      </Row>
      <Row className="m-1" style={{ border: '1px solid black' }}>
        {/* {todosList} */}
      </Row>
    </>
  );
}
