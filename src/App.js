import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/auth-signIn";
import SignUp from "./pages/auth-signUp";
import Todo from "./pages/main-todo";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:8080";
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/auth/:signup" element={<SignUp />} />
          <Route exact path="/auth/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
