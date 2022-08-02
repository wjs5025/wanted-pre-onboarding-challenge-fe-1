import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function Todo() {
  const navigate = useNavigate();

  function init() {
    if (localStorage.getItem("token") === null) navigate("/auth/signin");
  }

  useEffect(init, [navigate]);
  return <div>main-todo</div>;
}

export default Todo;
