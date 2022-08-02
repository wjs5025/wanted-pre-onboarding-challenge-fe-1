import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function Todo() {
  const navigate = useNavigate();

  function init() {
    if (localStorage.getItem("token") === null) {
      navigate("/auth/signin");
      alert("토큰이 유효하지 않습니다.");
    }
  }

  useEffect(init);
  return <div>main-todo</div>;
}

export default Todo;
