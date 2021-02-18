import React from "react";
import axios from "axios";
import styled from "styled-components";

import TriggerTags from "./TriggerTags";
import { MdDelete } from "react-icons/md";
import { useAuth, useAuthUpdate } from "../AuthContext";
import P from "../components/styled/P";

const Card = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.color.backgroundLight};
  border-radius: ${(props) => props.theme.radius};
`;
const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 0.5rem;
  padding: 1rem 0 1rem 1rem;
`;
const CardAction = styled.div`
  flex-shrink: 0;
  padding: 1rem 1rem;
`;
const MdDeleteRed = styled(MdDelete)`
  color: #b22222;
`;

function TriggerItem({ id, triggers, response }) {
  const authUser = useAuth();
  const updateAuthUser = useAuthUpdate();
  const deleteTrigger = async (id) => {
    try {
      //delete from server
      const res = await axios.delete("/triggers/" + id);
      if (res.status >= 300) return;
      //delete from UI
      const newList = authUser.triggersList.filter((tr) => tr.id !== id);
      updateAuthUser((prev) => ({ ...prev, triggersList: newList }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card>
      <CardBody>
        <TriggerTags triggersArray={triggers} />
        <P italic>{response}</P>
      </CardBody>
      <CardAction
        data-id={id}
        onClick={(e) =>
          window.confirm("Are you sure you wish to delete this trigger?") &&
          deleteTrigger(id)
        }
      >
        <MdDeleteRed />
      </CardAction>
    </Card>
  );
}

export default TriggerItem;
