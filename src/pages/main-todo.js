import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TodoList from "../components/main-todoList";
import TodoDetail from "../components/main-todoDatail";
import styled from "styled-components";
import Navigation from "../components/main-navigation";

function Todo() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);
  const [selectedTodo, selectTodo] = useState([]);

  // 최초 로직
  function init() {
    if (localStorage.getItem("token") === null) {
      navigate("/auth/signin");
      alert("토큰이 유효하지 않습니다.");
    }
  }

  // handleSubmit() : Todo 추가 제출 버튼
  function handleSubmit(event) {
    event.preventDefault();
    const data = { title: title, content: content };
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    axios.post("/todos", data, config).then((res) => console.log(res));
    getTodos();
  }

  // getTodos() : Todo 목록을 가져오는 통신 처리 함수
  function getTodos() {
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    axios.get("/todos", config).then((res) => setTodos(res.data.data));
  }

  useEffect(init, [navigate]);
  useEffect(getTodos, []);

  return (
    <TodoContainer>
      <Navigation />
      <form className="add-todo" onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo의 제목을 입력하세요"
          />
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Todo의 내용을 입력하세요"
          />
        </div>
        <button type="submit">ADD</button>
      </form>
      <div className="read-todo">
        <div className="todo-list">
          <TodoList todos={todos} selectTodo={selectTodo} />
        </div>
        <div className="todo-detail">
          <TodoDetail todos={todos} selectedTodo={selectedTodo} />
        </div>
      </div>
    </TodoContainer>
  );
}

////////////////////////////////////////////Styled-Components
const TodoContainer = styled.div`
  .add-todo {
    display: flex;
    margin: 10px;

    .input {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }

  .read-todo {
    margin: 0 10px;
    display: flex;
  }

  .todo-list {
    flex-basis: 35%;
  }

  .todo-detail {
    flex-basis: 65%;
  }
`;

export default Todo;
