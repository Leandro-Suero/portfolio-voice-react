import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { MdPlaylistAdd } from "react-icons/md";

import { useAuth } from "../../AuthContext";
import { useUiStateUpdate } from "../../UiStateContext";
import FixedDiv from "../styled/FixedDiv";

const FabDiv = styled(FixedDiv)`
  bottom: 1.5rem;
  background-color: ${(props) => props.theme.color.accent};
  color: ${(props) => props.theme.color.background};
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.75);
`;

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
    <FabDiv onClick={(e) => addNewTrigger()}>
      <MdPlaylistAdd />
    </FabDiv>
  );
}

export default FAB;
