import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { setAuthorizationToken } from "../../libs/utils";
import { useAuthUpdate } from "../../AuthContext";
import BackButton from "../utils/BackButton";
import Container from "../styled/Container";
import Column from "../styled/Column";
import P from "../styled/P";
import Form from "../styled/Form";
import Button from "../styled/Button";
import Input from "../styled/Input";
import StyledLink from "../styled/StyledLink";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const setAuthObject = useAuthUpdate();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.error("Passwords mismatch");
      //TODO add message here
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
    <>
      <BackButton />
      <Container>
        <Column>
          <P>Log in to be able to create and sync your own triggers.</P>
          <Form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              name="username"
              id="username"
              onChange={handleUsernameChange}
              autoFocus
            />
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={handlePasswordChange}
            />
            <label htmlFor="password2">Confirm Password</label>
            <Input
              type="password"
              name="password2"
              id="password2"
              onChange={handlePassword2Change}
            />
            <Button type="submit" mt="0.5rem">
              Register
            </Button>
          </Form>
          <div>
            <P>Do you already have an account?</P>
            <StyledLink to="/login">Log in</StyledLink>
          </div>
        </Column>
      </Container>
    </>
  );
}

export default Login;
