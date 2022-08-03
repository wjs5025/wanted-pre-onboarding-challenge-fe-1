import React from "react";
import styled from "styled-components";

function NoTodos() {
  return (
    <NoTodosContainer>
      <p>현재 작성된 Todo가 없습니다.</p>
    </NoTodosContainer>
  );
}

const NoTodosContainer = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
  line-height: calc(100vh - 200px);

  p {
    text-align: center;
    font-weight: bold;
    font-size: 1.3em;
  }
`;
export default NoTodos;
