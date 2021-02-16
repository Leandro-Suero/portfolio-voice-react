import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import TriggersList from "./components/pages/TriggersList";
import Home from "./components/pages/Home";
import AuthProvider from "./AuthContext";
import UiStateProvider from "./UiStateContext";

function App() {
  return (
    <UiStateProvider>
      <AuthProvider>
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
      </AuthProvider>
    </UiStateProvider>
  );
}

export default App;
