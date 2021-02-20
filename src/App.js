import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { toast } from "react-toastify";
import Container from "./components/styled/Container";

import "react-toastify/dist/ReactToastify.css";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import TriggersList from "./components/pages/TriggersList";
import Home from "./components/pages/Home";
import AuthProvider from "./AuthContext";
import UiStateProvider from "./UiStateContext";
import GlobalStyle from "./theme/globalStyles";
import theme from "./theme";

toast.configure();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <UiStateProvider>
        <AuthProvider>
          <Container id="container">
            <Router>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/triggers">
                  <TriggersList />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Router>
          </Container>
        </AuthProvider>
      </UiStateProvider>
    </ThemeProvider>
  );
}

export default App;
