import React, { useState, useEffect } from "react";
import axios from "axios";
import TriggerItem from "./TriggerItem";
import { useAuth, useAuthUpdate } from "../AuthContext";
import BackButton from "./BackButton";

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
    </div>
  );
}

export default TriggersList;
