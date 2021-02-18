import React from "react";
import TriggerItem from "../TriggerItem";
import { useAuth, useAuthUpdate } from "../../AuthContext";
import BackButton from "../utils/BackButton";
import FAB from "../utils/Fab";
import NewTriggerModal from "../NewTriggerModal";
import styled from "styled-components";

import P from "../styled/P";
import Container from "../styled/Container";
import Column from "../styled/Column";

const ColumnTriggers = styled(Column)`
  padding: 4rem 0;
  gap: 1.5rem;
`;

function TriggersList() {
  const authUser = useAuth();

  if (authUser.triggersList.length === 0)
    return (
      <Container>
        <Column>
          <BackButton />
          <P>
            There isn't any personalized trigger yet. Go ahead and create one,
            have fun!
          </P>
        </Column>
      </Container>
    );
  return (
    <Container>
      <ColumnTriggers>
        <BackButton />
        {authUser.triggersList.map((trigger) => (
          <TriggerItem
            id={trigger.id}
            triggers={trigger.triggers.triggers}
            response={trigger.response}
            key={trigger.id}
          />
        ))}
        <NewTriggerModal />
        <FAB />
      </ColumnTriggers>
    </Container>
  );
}

export default TriggersList;
