import React from "react";
import TriggerTags from "./TriggerTags";
import { MdDelete } from "react-icons/md";

function TriggerItem({ id, triggers, response }) {
  const deleteTrigger = (id, event) => {
    console.log("deleted " + id);
    //TODO do the actual deleting from context and server
  };

  return (
    <div>
      <TriggerTags triggersArray={triggers} />
      <p>{response}</p>
      <div
        data-id={id}
        onClick={(e) =>
          window.confirm("Are you sure you wish to delete this trigger?") &&
          deleteTrigger(id)
        }
      >
        <MdDelete />
      </div>
    </div>
  );
}

export default TriggerItem;
