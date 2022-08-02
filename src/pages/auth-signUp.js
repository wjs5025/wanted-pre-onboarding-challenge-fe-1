import axios from "axios";
import React, { useEffect, useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canSubmit, setSubmit] = useState(true);

  // handleEmail() : 이메일 입력 이벤트 처리 함수
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  // handlePassword() : 비밀번호 입력 이벤트 처리 함수
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  // handleSubmitBtn() : 회원가입 입력값 유효성검사 (이메일 : @ . 포함 / 비밀번호 : 8자 이상)
  function handleSubmitBtn() {
    const emailRegExp = /[0-9a-zA-Z-_]+@[0-9a-zA-Z]+\.[a-zA-Z0-9]+/;
    const passwordRegExp = /[0-9a-zA-Z!@#%^*]{8,}/;

    email.match(emailRegExp) ? setSubmit(false) : setSubmit(true);
    password.match(passwordRegExp) ? setSubmit(false) : setSubmit(true);
  }

  // handleSubmit() : 회원가입 제출 버튼
  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    axios.post("/users/create", data).then((res) => console.log(res));
  }

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
          회원가입
        </button>
      </form>
    </>
  );
}

export default SignUp;
