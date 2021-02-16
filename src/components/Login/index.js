import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useAuthUpdate } from "../../AuthContext";

import BackButton from "../BackButton";
import setAuthorizationToken from "../../libs/utils";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setAuthObject = useAuthUpdate();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit", username, password);
    try {
      const {
        data: { token },
      } = await axios.post("/auth/login", { username, password });
      console.log(token);
      setAuthorizationToken(token);
      var decoded = jwt_decode(token);
      console.log("decoded", decoded.id);
      console.log("decoded", decoded.username);
      const {
        data: { data },
      } = await axios.get("/triggers/user/" + decoded.id);
      console.log(data);
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
