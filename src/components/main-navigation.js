import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

function Navigation() {
  const navigate = useNavigate();

  // signOut() : 로그아웃 버튼 클릭 이벤트
  function signOut() {
    localStorage.removeItem("token");
    navigate("/auth/signin");
  }

  return (
    <NavigationContainer>
      <h1>
        MyTodos
        <button onClick={signOut}>로그아웃</button>
      </h1>
    </NavigationContainer>
  );
}

////////////////////////////////////////////Styled-Components
const NavigationContainer = styled.div`
  background-color: #3209db;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  color: white;
  position: relative;

  h1 {
    font-size: 1.5em;
    padding: 15px;
    text-align: center;
  }

  button {
    position: absolute;
    right: 10px;
  }
`;

export default Navigation;
