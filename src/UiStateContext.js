import React, { useState, useContext } from "react";

const UiStateContext = React.createContext();
const UiStateUpdateContext = React.createContext();

export function useUiState() {
  return useContext(UiStateContext);
}
export function useUiStateUpdate() {
  return useContext(UiStateUpdateContext);
}

export default function UiStateProvider({ children }) {
  const [uiState, setUiState] = useState({
    modalIsOpen: false,
  });

  return (
    <UiStateContext.Provider value={uiState}>
      <UiStateUpdateContext.Provider value={setUiState}>
        {children}
      </UiStateUpdateContext.Provider>
    </UiStateContext.Provider>
  );
}
