import React from "react";
import TriggerItem from "../TriggerItem";
import { useAuth, useAuthUpdate } from "../../AuthContext";
import BackButton from "../utils/BackButton";
import FAB from "../utils/Fab";
import NewTriggerModal from "../NewTriggerModal";

function TriggersList() {
  const authUser = useAuth();

  if (authUser.triggersList.length === 0)
    return (
      <>
        <BackButton />
        <p>
          There isn't any personalized trigger yet. Go ahead and create one,
          have fun!
        </p>
      </>
    );
  return (
    <div>
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
    </div>
  );
}

export default TriggersList;
