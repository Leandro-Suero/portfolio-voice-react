import React, { useState, useRef } from "react";
import axios from "axios";
import Modal from "react-modal";
import { MdClose, MdAdd } from "react-icons/md";
import styled from "styled-components";
import { toast } from "react-toastify";
import { FormattedMessage, useIntl } from "react-intl";

import { setAuthorizationToken } from "../libs/utils";
import { useAuth, useAuthUpdate } from "../AuthContext";
import { useUiState, useUiStateUpdate } from "../UiStateContext";
import TriggerTags from "./TriggerTags";
import Column from "../components/styled/Column";
import FixedDiv from "../components/styled/FixedDiv";
import Input from "../components/styled/Input";
import Form from "../components/styled/Form";
import Button from "../components/styled/Button";

const ColumnModal = styled(Column)`
  gap: 1rem;
  min-height: 100%;
`;
const CloseModal = styled(FixedDiv)`
  top: 1.5rem;
`;
const SmallP = styled.p`
  font-size: 1rem;
  margin-bottom: 0.75rem;
`;
const Header = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
`;
const Hr = styled.hr`
  margin: 1.5rem 0;
`;
const InputWithAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  gap: 0.5rem;
  flex-basis: auto;
  & > div {
    font-size: 2rem;
    background-color: ${(props) => props.theme.color.accent};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: -0.2rem;
  }
`;

function NewTriggerModal() {
  const [newTriggerArray, setNewTriggerArray] = useState([]);
  const getAuthUser = useAuth();
  const updateAuthUser = useAuthUpdate();
  let updateUiState = useUiStateUpdate();
  let getUiState = useUiState();
  const newTriggerInput = useRef();
  const newResponse = useRef();
  const intl = useIntl();

  const addTriggerToArray = () => {
    setNewTriggerArray([...newTriggerArray, newTriggerInput.current.value]);
    newTriggerInput.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTriggerArray.length === 0) {
      toast.error(
        intl.formatMessage({
          id: "newtrigger.toast.fillplus",
          defaultMessage:
            'Generate triggers by filling the word trigger input and then press the "+" button.',
        }),
        {
          position: "top-center",
          autoClose: 10000,
        }
      );
      return;
    }
    if (e.target.response.value === "") {
      toast.error(
        intl.formatMessage({
          id: "newtrigger.toast.fillresponse",
          defaultMessage:
            "Please enter a response to be given when all the triggers are found.",
        }),
        {
          position: "top-center",
          autoClose: 10000,
        }
      );
      return;
    }
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
      toast.success(
        intl.formatMessage({
          id: "newtrigger.toast.completed",
          defaultMessage: "Trigger created successfully!",
        }),
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        updateAuthUser({ username: "", user_id: "", triggersList: [] });
        setAuthorizationToken(false);
        updateUiState((prevState) => ({ ...prevState, modalIsOpen: false }));
        toast.error(
          intl.formatMessage({
            id: "newtrigger.toast.kicked",
            defaultMessage:
              "Your authorization has expired, please login again.",
          }),
          {
            position: "top-center",
            autoClose: 10000,
          }
        );
      }
    }
  };

  return (
    <Modal
      isOpen={getUiState.modalIsOpen}
      onRequestClose={() =>
        updateUiState((prevState) => ({ ...prevState, modalIsOpen: false }))
      }
      shouldCloseOnOverlayClick={false}
      contentLabel={intl.formatMessage({
        id: "newtrigger.modal.label",
        defaultMessage: "Add new trigger",
      })}
    >
      <ColumnModal>
        <CloseModal
          onClick={(e) =>
            updateUiState((prevState) => ({ ...prevState, modalIsOpen: false }))
          }
        >
          <MdClose />
        </CloseModal>
        <Header>
          <FormattedMessage
            id="newtrigger.header"
            defaultMessage="Add new trigger"
          />
        </Header>
        <p>
          <FormattedMessage
            id="newtrigger.description"
            defaultMessage="If your spoken phrase matchs ALL triggers then the response will be
            read out loud."
          />
        </p>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="new_trigger">
            <FormattedMessage
              id="newtrigger.label.addtrigger"
              defaultMessage="Add another word trigger"
            />
          </label>
          <InputWithAction>
            <Input
              type="text"
              name="new_trigger"
              id="new_trigger"
              ref={newTriggerInput}
              autoFocus
            />
            <div onClick={(e) => addTriggerToArray()}>
              <MdAdd />
            </div>
          </InputWithAction>
          <SmallP>
            <FormattedMessage
              id="newtrigger.list"
              defaultMessage="List of trigger words:"
            />
          </SmallP>
          <TriggerTags triggersArray={newTriggerArray} />
          <Hr />
          <label htmlFor="response">
            <FormattedMessage
              id="newtrigger.label.response"
              defaultMessage="Response to read outloud"
            />
          </label>
          <Input type="text" name="response" id="response" ref={newResponse} />
          <Button type="submit">
            <FormattedMessage
              id="newtrigger.label.submit"
              defaultMessage="Save Trigger"
            />
          </Button>
        </Form>
      </ColumnModal>
    </Modal>
  );
}

export default NewTriggerModal;
