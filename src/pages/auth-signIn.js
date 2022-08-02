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

  // handleEmail() : 이메일 입력 이벤트 처리 함수
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  // handlePassword() : 비밀번호 입력 이벤트 처리 함수
  function handlePassword(e) {
    setPassword(e.target.value);
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
      .then((res) => (res.status === 200 ? success(res) : fail(res)));
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
  function fail(res) {
    alert(res.data.message);
    navigate("/auth/signin");
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
          onChange={handleEmail}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit" disabled={canSubmit}>
          로그인
        </button>
      </form>
    </>
  );
}

export default SignIn;
