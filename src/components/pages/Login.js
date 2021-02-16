import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link, useHistory } from "react-router-dom";
import { useAuthUpdate } from "../../AuthContext";

import setAuthorizationToken from "../../libs/utils";
import BackButton from "../utils/BackButton";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setAuthObject = useAuthUpdate();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { token },
      } = await axios.post("/auth/login", { username, password });
      setAuthorizationToken(token);
      var decoded = jwt_decode(token);
      const {
        data: { data },
      } = await axios.get("/triggers/user/" + decoded.id);
      setAuthObject({
        username: decoded.username,
        user_id: decoded.id,
        triggersList: data,
      });
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <BackButton />
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