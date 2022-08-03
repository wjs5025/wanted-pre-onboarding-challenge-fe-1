import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";

function TodoList(props) {
  const location = useLocation();
  const todos = props.todos;
  const navigate = useNavigate();

  return (
    <TodoListContainer>
      <h2>Todo List</h2>
      <div className="todos">
        {todos.map((el) => (
          <Todo
            key={el.id}
            onClick={() => {
              navigate("/" + el.id);
            }}
            BackGroundColor={
              location.pathname === "/" + el.id ? "rgba(92, 29, 227,0.05)" : ""
            }
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
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 1.3em;
  }

  .todos {
    max-height: calc(100vh - 200px);
    overflow-y: scroll;
  }
`;

const Todo = styled.div`
  height: 80px;
  padding: 10px 4px 15px 5px;
  border-bottom: 1px solid #e5e5e5;
  background-color: ${(props) => props.BackGroundColor};

  p {
    display: -webkit-box;
    word-break: break-all;
  }
  .title {
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
    padding: 5px;
    font-size: 0.9em;
    font-weight: bold;
    font-size: 0.8em;
  }

  .content {
    -webkit-line-clamp: 3;
    overflow: hidden;
    -webkit-box-orient: vertical;
    margin: 0 5px;
    font-size: 0.8em;
  }
`;

export default TodoList;
