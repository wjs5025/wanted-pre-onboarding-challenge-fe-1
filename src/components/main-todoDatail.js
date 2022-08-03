import React from "react";
import styled from "styled-components";

function TodoDetail(props) {
  const selectedTodo = props.selectedTodo; // Object
  const date =
    selectedTodo.updatedAt === selectedTodo.createdAt
      ? selectedTodo.updatedAt
      : selectedTodo.createdAt;

  return (
    <TodoDetailContainer>
      <h2>Todo Detail</h2>
      <div className="todo-detail">
        <h3>{selectedTodo.title}</h3>
        <p className="content">{selectedTodo.content}</p>
        <div className="bottom">
          <p className="date">{date.slice(0, 10)}</p>
          <div className="menu">
            <button className="modify">수정</button>
            <button className="delete">삭제</button>
          </div>
        </div>
      </div>
    </TodoDetailContainer>
  );
}

////////////////////////////////////////////Styled-Components
const TodoDetailContainer = styled.div`
  position: relative;

  h2 {
    margin: 10px 5px;
    font-weight: bold;
    font-size: 1.4em;
  }

  .todo-detail {
    margin: 15px;

    h3 {
      margin: 5px 0;
      font-weight: bold;
      font-size: 1.2em;
    }

    .content {
      min-height: 200px;
      max-height: calc(100vh - 300px);
      overflow-y: scroll;
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      .date {
        line-height: 20px;
        font-size: 0.9em;
      }

      .menu {
        button {
          background-color: #fff;
          border: none;
          transition: all 0.4s;

          :hover {
            text-decoration: underline 1px solid;
          }
        }

        .delete {
          color: red;
        }
      }
    }
  }
`;

export default TodoDetail;
