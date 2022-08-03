import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canSubmit, setSubmit] = useState(true);

  // 최초 로직
  function init() {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }

  // handleSubmit() : 로그인 제출 버튼
  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    axios
      .post("/users/login", data)
      .then((res) => {
        if (res.status === 200) success(res);
      })
      .catch((error) => fail(error));
  }

  // handleSubmitBtn() : 로그인 입력값 유효성검사 (각각 1자 이상 입력)
  function handleSubmitBtn() {
    const emailRegExp = /[0-9a-zA-Z]+/;
    const passwordRegExp = /[0-9a-zA-Z]+/;

    email.match(emailRegExp) ? setSubmit(false) : setSubmit(true);
    password.match(passwordRegExp) ? setSubmit(false) : setSubmit(true);
  }

  // 로그인 성공 시
  function success(res) {
    localStorage.setItem("token", res.data.token);
    navigate("/");
  }

  // 로그인 실패 시
  function fail(error) {
    alert(error.response.data.details);
  }

  useEffect(init, [navigate]);
  useEffect(handleSubmitBtn, [email, password]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={canSubmit}>
          로그인
        </button>
        <button onClick={() => navigate("/auth/signup")}>SIGN UP</button>
      </form>
    </>
  );
}

export default SignIn;
