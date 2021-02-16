import React, { useState, useRef } from "react";
import axios from "axios";
import Modal from "react-modal";
import { MdClose, MdAdd } from "react-icons/md";
import { useAuth, useAuthUpdate } from "../AuthContext";
import { useUiState, useUiStateUpdate } from "../UiStateContext";
import TriggerTags from "./TriggerTags";

function NewTriggerModal() {
  const [newTriggerArray, setNewTriggerArray] = useState([]);
  const getAuthUser = useAuth();
  const updateAuthUser = useAuthUpdate();
  let updateUiState = useUiStateUpdate();
  let getUiState = useUiState();
  const newTriggerInput = useRef();
  const newResponse = useRef();

  const addTriggerToArray = () => {
    setNewTriggerArray([...newTriggerArray, newTriggerInput.current.value]);
    newTriggerInput.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTriggerArray.length === 0 || e.target.response.value === "") return;
    //TODO add messages
    const data = {
      triggers: { triggers: newTriggerArray },
      response: e.target.response.value,
      user_id: getAuthUser.user_id,
    };
    try {
      const res = await axios.post("/triggers", data);
      //clear inputs
      setNewTriggerArray([]);
      newResponse.current.value = "";
      await updateAuthUser((prevAuth) => {
        return {
          ...prevAuth,
          triggersList: [...prevAuth.triggersList, res.data.data],
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Modal
        isOpen={getUiState.modalIsOpen}
        onRequestClose={() =>
          updateUiState((prevState) => ({ ...prevState, modalIsOpen: false }))
        }
        shouldCloseOnOverlayClick={false}
        contentLabel="Add new trigger"
      >
        <div
          onClick={(e) =>
            updateUiState((prevState) => ({ ...prevState, modalIsOpen: false }))
          }
        >
          <MdClose />
        </div>
        <h2>Add new trigger</h2>
        <p>
          If your spoken phrase matchs ALL triggers then the response will be
          read out loud.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="new_trigger">Add another word trigger </label>
          <input
            type="text"
            name="new_trigger"
            id="new_trigger"
            ref={newTriggerInput}
          />
          <span onClick={(e) => addTriggerToArray()}>
            <MdAdd />
          </span>
          <p>List of trigger words: </p>
          <TriggerTags triggersArray={newTriggerArray} />
          <br />
          <label htmlFor="response">Response to read outloud</label>
          <input type="text" name="response" id="response" ref={newResponse} />
          <br />
          <button type="submit">Save Trigger</button>
        </form>
      </Modal>
    </div>
  );
}

export default NewTriggerModal;
