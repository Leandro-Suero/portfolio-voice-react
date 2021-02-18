import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { useAuthUpdate } from "../../AuthContext";

import setAuthorizationToken from "../../libs/utils";
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
            <Button type="submit" mt="0.5rem">
              Log in
            </Button>
          </Form>
          <div>
            <P>If you don't have an account yet:</P>
            <StyledLink to="/register">Register</StyledLink>
          </div>
        </Column>
      </Container>
    </>
  );
}

export default Login;
