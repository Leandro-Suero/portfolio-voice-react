import React from "react";
import Pill from "./utils/Pill";

function TriggerTags({ triggersArray }) {
  return (
    <div>
      {triggersArray.length > 0
        ? React.Children.toArray(
            triggersArray.map((trigger) => <Pill text={trigger} />)
          )
        : "Add new words as triggers"}
    </div>
  );
}

export default TriggerTags;
