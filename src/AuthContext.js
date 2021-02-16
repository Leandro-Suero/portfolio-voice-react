import React, { useState, useContext } from "react";

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function useAuthUpdate() {
  return useContext(AuthUpdateContext);
}

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    username: "",
    user_id: "",
    triggersList: [],
  });

  return (
    <AuthContext.Provider value={auth}>
      <AuthUpdateContext.Provider value={setAuth}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
}
