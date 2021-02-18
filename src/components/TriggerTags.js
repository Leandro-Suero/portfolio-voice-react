import React from "react";
import Pill from "./utils/Pill";
import styled from "styled-components";
import P from "../components/styled/P";

const Tags = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

function TriggerTags({ triggersArray }) {
  return (
    <Tags>
      {triggersArray.length > 0 ? (
        React.Children.toArray(
          triggersArray.map((trigger) => <Pill text={trigger} />)
        )
      ) : (
        <P>Add new words as triggers</P>
      )}
    </Tags>
  );
}

export default TriggerTags;
