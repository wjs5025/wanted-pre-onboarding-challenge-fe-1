import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

function TodoDetail(props) {
  const nowSelect = props.nowSelect;
  const selectTodo = props.selectTodo;
  const navigate = useNavigate();
  const [modifyMode, setModifyMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  // init() : 최초 로직
  function init() {
    if (nowSelect !== undefined) {
      setTitle(nowSelect.title);
      setContent(nowSelect.content);
      setDate(
        nowSelect.createdAt === nowSelect.updatedAt
          ? nowSelect.createdAt?.slice(0, 10)
          : nowSelect.updatedAt?.slice(0, 10)
      );
    }
  }

  // modifyTodo() : Todo 수정 제출 버튼
  function modifyTodo() {
    const data = { title: title, content: content };
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };

    axios
      .put("/todos/" + nowSelect.id, data, config)
      .then((res) => {
        console.log("수정완료", res);
        if (res.status === 200) {
          props.getTodos();
          setModifyMode(false);
        }
      })
      .catch((error) => fail(error));
  }

  // deleteTodo() : Todo 삭제 제출 버튼
  function deleteTodo() {
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    axios
      .delete("/todos/" + nowSelect.id, config)
      .then((res) => {
        if (res.status === 200) success(res);
      })
      .catch((error) => fail(error));
  }

  // 통신 성공 시
  function success() {
    console.log("삭제완료");
    props.getTodos();
    selectTodo([{ title: "", content: "" }]);
    setTitle("");
    setContent("");
    navigate("/0");
  }

  // 통신 실패 시
  function fail(error) {
    alert(error.response.data.details);
  }

  useEffect(init, [nowSelect]);

  return (
    <TodoDetailContainer>
      <div className="todo-detail">
        {/* 제목(title) : 수정모드 일 때 / 아닐 때 */}
        {modifyMode ? (
          <input
            className="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h3 className="title">{title}</h3>
        )}
        {/* 내용(content) : 수정모드 일 때 / 아닐 때 */}
        {modifyMode ? (
          <textarea
            className="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <p className="content">{content}</p>
        )}
        <div className="bottom">
          <p className="date">{date}</p>
          <div className="menu">
            {/* 버튼 : 수정모드 일 때 (취소, 완료) / 아닐 때 (수정, 삭제) */}
            {modifyMode ? (
              <>
                <button
                  className="modify"
                  onClick={() => setModifyMode(!modifyMode)}
                >
                  취소
                </button>
                <button className="modify" onClick={modifyTodo}>
                  완료
                </button>
              </>
            ) : (
              <>
                <button
                  className="modify"
                  onClick={() => setModifyMode(!modifyMode)}
                >
                  수정
                </button>
                <button className="delete" onClick={deleteTodo}>
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </TodoDetailContainer>
  );
}

////////////////////////////////////////////Styled-Components
const TodoDetailContainer = styled.div`
  position: relative;

  .todo-detail {
    margin: 35px 15px;
    line-height: 1.5em;
    word-break: break-all;

    .title {
      width: 100%;
      font-weight: bold;
      font-size: 1.2em;
    }

    .content {
      font-size: 16px;
      width: 100%;
      margin: 10px 0;
      min-height: 200px;
      max-height: calc(100vh - 350px);
      overflow-y: scroll;
    }

    input,
    textarea {
      padding: 0;
      resize: none;
      border: 1px solid #f1f1f1;
      margin: 0;

      :focus {
        outline: #5c1de3 2px solid;
      }
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
          transition: all 0.3s;
          background-color: #fff;
          border: none;

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
