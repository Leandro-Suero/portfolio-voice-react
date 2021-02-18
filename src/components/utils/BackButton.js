import React from "react";
import { useHistory } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import styled from "styled-components";

const IconContainer = styled.div`
  color: ${(props) => props.theme.color.white};
  font-size: 2rem;
  position: fixed;
  top: 1rem;
  left: 1rem;
`;

function BackButton() {
  const history = useHistory();

  return (
    <IconContainer onClick={() => history.goBack()}>
      <MdArrowBack />
    </IconContainer>
  );
}

export default BackButton;
