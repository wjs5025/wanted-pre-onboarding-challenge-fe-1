import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import TodoList from "../components/main-todoList";
import TodoDetail from "../components/main-todoDetail";
import styled from "styled-components";
import Navigation from "../components/main-navigation";
import NoTodos from "../components/main-noTodos";

function Todo() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);
  const [nowSelect, selectTodo] = useState([{ title: "", contnet: "" }]);
  const location = useLocation();

  // 최초 로직
  function init() {
    if (localStorage.getItem("token") === null) {
      navigate("/auth/signin");
      alert("토큰이 유효하지 않습니다.");
    }
  }

  // selectByURL() : URL의 Todo id에 해당하는 Todo를 선택
  function selectByURL() {
    selectTodo(todos.find((el) => "/" + el.id === location.pathname));
  }

  // handleSubmit() : Todo 추가 제출 버튼
  function handleSubmit(event) {
    event.preventDefault();
    const data = { title: title, content: content };
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    axios.post("/todos", data, config).then((res) => console.log(res));
    setTitle("");
    setContent("");
    getTodos();
  }

  // getTodos() : Todo 목록을 가져오는 통신 처리 함수
  function getTodos() {
    console.log("getTodos()");
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    axios
      .get("/todos", config)
      .then((res) => setTodos(res.data.data.reverse()));
  }

  useEffect(getTodos, []);
  useEffect(init, [navigate]);
  useEffect(selectByURL, [location]);

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
            maxLength={50}
          />
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Todo의 내용을 입력하세요"
          />
        </div>
        <button className="submit" type="submit">
          ADD
        </button>
      </form>
      <div className="read-todo">
        {/* Todo가 없을 때 / 있을 때*/}
        {todos.length === 0 ? (
          <NoTodos />
        ) : (
          <>
            <div className="todo-list">
              <TodoList todos={todos} />
            </div>
            <div className="todo-detail">
              <TodoDetail
                getTodos={getTodos}
                nowSelect={nowSelect}
                selectTodo={selectTodo}
              />
            </div>
          </>
        )}
      </div>
    </TodoContainer>
  );
}

////////////////////////////////////////////Styled-Components
const TodoContainer = styled.div`
  .add-todo {
    display: flex;
    margin: 20px 30px;

    .input {
      width: 100%;
      display: flex;
      flex-direction: column;

      input {
        margin-top: 5px;
        margin-right: 5px;
        height: 2em;
        border: 1px solid #f1f1f1;
        padding: 0 10px;

        :focus {
          outline: #5c1de3 2px solid;
        }
      }
    }

    .submit {
      margin-top: 5px;
      min-width: 70px;
      min-height: 45px;
      border: none;
      transition: all 0.2s;

      :hover {
        cursor: pointer;
        background-color: #5c1de3;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

        color: white;
      }
    }
  }

  .read-todo {
    margin: 0 30px;
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
