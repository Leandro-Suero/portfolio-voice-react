import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useAuthUpdate } from "../../AuthContext";

import setAuthorizationToken from "../../libs/utils";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setAuthUsername = useAuthUpdate();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", username, password);
    axios
      .post("/auth/login", { username, password })
      .then((res) => {
        setAuthorizationToken(res.data.token);
        console.log(res.data.token);
        setAuthUsername(username);
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
        <button type="submit">Log in</button>
      </form>
      <hr />
      <p>If you don't have an account yet:</p>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Login;
