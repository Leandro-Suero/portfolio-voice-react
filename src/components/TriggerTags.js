import React from "react";
import Pill from "./Pill";

function TriggerTags({ triggersArray }) {
  return (
    <div>
      {triggersArray.length > 0
        ? triggersArray.map((trigger) => <Pill text={trigger} key={trigger} />)
        : "Add new words as triggers"}
    </div>
  );
}

export default TriggerTags;
