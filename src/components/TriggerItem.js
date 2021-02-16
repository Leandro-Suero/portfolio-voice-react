import React from "react";
import axios from "axios";

import TriggerTags from "./TriggerTags";
import { MdDelete } from "react-icons/md";
import { useAuth, useAuthUpdate } from "../AuthContext";

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
