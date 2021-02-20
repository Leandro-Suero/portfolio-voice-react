import React from "react";
import { FormattedMessage } from "react-intl";

import Pill from "./utils/Pill";
import P from "../components/styled/P";
import Tags from "../components/styled/Tags";

function TriggerTags({ triggersArray }) {
  return (
    <Tags>
      {triggersArray.length > 0 ? (
        React.Children.toArray(
          triggersArray.map((trigger) => <Pill text={trigger} />)
        )
      ) : (
        <P>
          <FormattedMessage
            id="tags.empty"
            defaultMessage="Add new words as triggers"
          />
        </P>
      )}
    </Tags>
  );
}

export default TriggerTags;
