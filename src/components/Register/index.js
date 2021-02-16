import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthorizationToken from "../../libs/utils";
import { useAuthUpdate } from "../../AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const setAuthObject = useAuthUpdate();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", username, password, password2);
    if (password !== password2) {
      console.error("Passwords mismatch");
      return;
    }

    axios
      .post("/auth/register", { username, password })
      .then((res) => {
        const token = res.data.token;
        setAuthorizationToken(token);
        var decoded = jwt_decode(token);
        setAuthObject({ username: decoded.username, user_id: decoded.id });
        history.push("/");
      })
      .catch((err) => console.error(err));
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  return (
    <div>
      <p>Log in to be able to create and sync your own triggers.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handlePasswordChange}
        />
        <label htmlFor="password2">Confirm Password</label>
        <input
          type="password"
          name="password2"
          id="password2"
          onChange={handlePassword2Change}
        />
        <button type="submit">Register</button>
      </form>
      <hr />
      <p>Do you already have an account?</p>
      <Link to="/login">Log in</Link>
    </div>
  );
}

export default Login;
