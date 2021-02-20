import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { useAuthUpdate } from "../../AuthContext";
import { toast } from "react-toastify";
import { FormattedMessage, useIntl } from "react-intl";

import { setAuthorizationToken } from "../../libs/utils";
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
  const intl = useIntl();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      toast.error(
        intl.formatMessage({
          id: "login.toast.fill",
          defaultMessage: "Please complete the username and password fields.",
        }),
        {
          position: "top-center",
          autoClose: 10000,
        }
      );
      return;
    }
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
      toast.success(
        intl.formatMessage({
          id: "login.toast.success",
          defaultMessage: "Logged in!",
        }),
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
      history.push("/");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status > 399) {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 10000,
        });
      }
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
          <P>
            <FormattedMessage
              id="login.welcome"
              defaultMessage="Log in to be able to create and sync your own triggers."
            />
          </P>

          <Form onSubmit={handleSubmit}>
            <label htmlFor="username">
              <FormattedMessage
                id="login.label.username"
                defaultMessage="Username"
              />
            </label>
            <Input
              type="text"
              name="username"
              id="username"
              onChange={handleUsernameChange}
              autoFocus
            />
            <label htmlFor="password">
              <FormattedMessage
                id="login.label.password"
                defaultMessage="Password"
              />
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={handlePasswordChange}
            />
            <Button type="submit" mt="0.5rem">
              <FormattedMessage
                id="login.label.submit"
                defaultMessage="Log in"
              />
            </Button>
          </Form>
          <div>
            <P>
              <FormattedMessage
                id="login.noaccount"
                defaultMessage="If you don't have an account yet:"
              />
            </P>
            <StyledLink to="/register">
              <FormattedMessage
                id="login.label.register"
                defaultMessage="Register"
              />
            </StyledLink>
          </div>
        </Column>
      </Container>
    </>
  );
}

export default Login;
