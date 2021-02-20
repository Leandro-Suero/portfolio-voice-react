import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { FormattedMessage, useIntl } from "react-intl";

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

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const setAuthObject = useAuthUpdate();
  const history = useHistory();
  const intl = useIntl();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    if (username === "" || password === "" || password2 === "") {
      toast.error(
        intl.formatMessage({
          id: "register.toast.fill",
          defaultMessage: "Please complete the username and passwords fields.",
        }),
        {
          position: "top-center",
          autoClose: 10000,
        }
      );
      return;
    }
    if (password !== password2) {
      console.error("Passwords mismatch");
      toast.error(
        intl.formatMessage({
          id: "register.toast.pwdmismatch",
          defaultMessage:
            "Passwords must be the exact same, please correct them.",
        }),
        {
          position: "top-center",
          autoClose: 10000,
        }
      );
      return;
    }

    await axios
      .post("/auth/register", { username, password })
      .then((res) => {
        const token = res.data.token;
        setAuthorizationToken(token);
        var decoded = jwt_decode(token);
        setAuthObject({
          username: decoded.username,
          user_id: decoded.id,
          triggersList: [],
        });
        toast.success(
          intl.formatMessage({
            id: "register.toast.completed",
            defaultMessage: "Registration completed!",
          }),
          {
            position: "top-center",
            autoClose: 3000,
          }
        );
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status > 399) {
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 10000,
          });
        }
      });
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
      <Column>
        <P>
          <FormattedMessage
            id="register.welcome"
            defaultMessage="Create an account to generate and sync your own triggers."
          />
        </P>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="username">
            <FormattedMessage
              id="register.label.username"
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
              id="register.label.password"
              defaultMessage="Password"
            />
          </label>
          <Input
            type="password"
            name="password"
            id="password"
            onChange={handlePasswordChange}
          />
          <label htmlFor="password2">
            <FormattedMessage
              id="register.label.password2"
              defaultMessage="Password"
            />
          </label>
          <Input
            type="password"
            name="password2"
            id="password2"
            onChange={handlePassword2Change}
          />
          <Button type="submit" mt="0.5rem">
            <FormattedMessage
              id="register.label.submit"
              defaultMessage="Register"
            />
          </Button>
        </Form>
        <div>
          <P>
            <FormattedMessage
              id="login.haveaccount"
              defaultMessage="Do you already have an account?"
            />
          </P>
          <StyledLink to="/login">
            <FormattedMessage
              id="register.label.login"
              defaultMessage="Log in"
            />
          </StyledLink>
        </div>
      </Column>
    </>
  );
}

export default Register;
