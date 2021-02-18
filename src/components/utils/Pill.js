import React from "react";
import styled from "styled-components";

const Span = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: ${(props) => props.theme.color.accent};
  border-radius: ${(props) => props.theme.radius};
`;

function Pill({ text }) {
  return (
    <Span key={text} style={{}}>
      {text}
    </Span>
  );
}

export default Pill;
