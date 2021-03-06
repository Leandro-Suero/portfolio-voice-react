import React from "react";
import TriggerItem from "../TriggerItem";
import { useAuth } from "../../AuthContext";
import BackButton from "../utils/BackButton";
import FAB from "../utils/Fab";
import NewTriggerModal from "../NewTriggerModal";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

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
      <Column>
        <BackButton />
        <P>
          <FormattedMessage
            id="triggerlist.empty"
            defaultMessage="There isn't any personalized trigger yet. Go ahead and create one,
              have fun!"
          />
        </P>
        <NewTriggerModal />
        <FAB />
      </Column>
    );
  return (
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
  );
}

export default TriggersList;
