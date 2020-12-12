import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { Container, Row } from 'react-bootstrap';
import Todo from '../molecules/todos/Todo';
import TodosDayAndPostModal from '../molecules/todos/TodosDayAndPostModal';

interface TodosProps {
  setNewPosted: (newPosted: boolean) => void;
}

export default function Todos({ setNewPosted }: TodosProps) {
  const { todos } = useSelector((state: RootState) => state.calendarDay.todosAndReviews);
  const { checkedCalArray } = useSelector((state: RootState) => state.handleCheckedCal);

  let todosList;

  const renderFilteredCalenders = () => {
    if (todos === []) {
      todosList = '';
    } else {
      todosList = todos.map(todo => {
        // 나중에 서버 수정하고 reverse 삭제?
        // todoId 순서로 정렬하여 나열하기(수정필요)

        if (checkedCalArray.indexOf(todo.calendarId) !== -1) {
          let title = todo.title as string;
          let id = todo.id as number;
          return <Todo title={title} id={id} key={id} />;
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
      <Row className="m-1" style={{ border: '1px solid yellow', overflow: 'auto' }}>
        {todosList}
      </Row>
    </>
  );
}
