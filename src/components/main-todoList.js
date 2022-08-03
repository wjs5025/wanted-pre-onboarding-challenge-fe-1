import React from "react";
import styled from "styled-components";

function TodoList(props) {
  const todos = props.todos;
  const selectTodo = props.selectTodo; //function

  return (
    <TodoListContainer>
      <h2>Todo List</h2>
      <div className="todos">
        {todos.map((el) => (
          <Todo
            onClick={() => {
              selectTodo(el);
            }}
          >
            <p className="title">{el.title}</p>
            <p className="content">{el.content}</p>
          </Todo>
        ))}
      </div>
    </TodoListContainer>
  );
}

////////////////////////////////////////////Styled-Components
const TodoListContainer = styled.div`
  h2 {
    margin: 10px 0;
    font-weight: bold;
    font-size: 1.4em;
  }

  .todos {
    max-height: calc(100vh - 180px);
    overflow-y: scroll;
  }
`;

const Todo = styled.div`
  height: 80px;
  margin: 5px 5px 5px 0;
  border: 1px solid #e5e5e5;
  overflow-y: hidden;

  .title {
    margin: 5px;
    font-size: 0.9em;
    font-weight: bold;
  }

  .content {
    margin: 0 5px;
    font-size: 0.8em;
  }
`;

export default TodoList;
