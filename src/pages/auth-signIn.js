import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styled from "styled-components";
import Navigation from "../components/main-navigation";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cantSubmit, setSubmit] = useState(true);

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
    <SignInContainer>
      <Navigation />

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
        <button
          type="submit"
          disabled={cantSubmit}
          className={cantSubmit ? "none-hover" : ""}
        >
          로그인
        </button>
        <div className="signup" onClick={() => navigate("/auth/signup")}>
          SIGN UP
        </div>
      </form>
    </SignInContainer>
  );
}

const SignInContainer = styled.div`
  width: 100%;
  height: 100vh;

  form {
    margin: auto;
    justify-content: center;
    width: 300px;
    height: calc(100vh - 54px);
    display: flex;
    flex-direction: column;

    .none-hover {
      pointer-events: none;
    }

    button {
      height: 35px;
      margin: 5px 0;
      border: none;
      transition: all 0.2s;

      :hover {
        cursor: pointer;
        background-color: #5c1de3;
        color: white;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      }
    }

    input {
      height: 35px;
      padding: 0 10px;
      margin: 5px 0;
      border: 1px solid #f1f1f1;

      :focus {
        outline: #5c1de3 2px solid;
      }
    }

    .signup {
      margin-top: 20px;
      text-align: center;
      color: gray;
      font-size: 0.8em;
      transition: all 0.2s;

      :hover {
        cursor: pointer;
        color: #5c1de3;
      }
    }
  }
`;
export default SignIn;
