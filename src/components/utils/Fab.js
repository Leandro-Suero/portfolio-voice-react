import React from "react";
import { useHistory } from "react-router-dom";
import { MdPlaylistAdd } from "react-icons/md";
import { useAuth } from "../../AuthContext";
import { useUiStateUpdate } from "../../UiStateContext";

function FAB() {
  const getAuthUser = useAuth();
  let updateUiState = useUiStateUpdate();
  const history = useHistory();

  const addNewTrigger = (e) => {
    if (getAuthUser.username === "") {
      history.push("/login");
    } else {
      updateUiState((prevState) => ({ ...prevState, modalIsOpen: true }));
    }
  };

  return (
    <div onClick={(e) => addNewTrigger()}>
      <MdPlaylistAdd
        style={{
          fontSize: "3rem",
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
        }}
      />
    </div>
  );
}

export default FAB;
