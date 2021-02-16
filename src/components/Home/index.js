import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Modal from "react-modal";
import { MdTouchApp, MdClose, MdAdd } from "react-icons/md";
import { HiMicrophone } from "react-icons/hi";
import * as VoiceAssistance from "../../libs/VoiceAssistance";
import AuthMenu from "../AuthMenu";
import FAB from "../Fab";
import { useAuth, useAuthUpdate } from "../../AuthContext";
import { useHistory } from "react-router-dom";
import TriggerTags from "../TriggerTags";

function Home() {
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");
  const [processing, setProcessing] = useState(false);
  const getAuthUser = useAuth();
  const updateAuthUser = useAuthUpdate();
  const history = useHistory();
  const [showTriggerList, setShowTriggerList] = useState(false)
  //MODAL NEW TRIGGER
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const newTriggerInput = useRef();
  const [newTriggerArray, setNewTriggerArray] = useState([]);
  const [newResponse, setNewResponse] = useState("");

  // let triggerTags = newTriggerArray.map(trigger => (<Pill text={trigger} /> ));

  const addNewTrigger = (e) => {
    console.log('fab add');
    if (getAuthUser.username === '') {
      history.push("/login")
    } else {
      setModalIsOpen(true);
    }
  }

  const addTriggerToArray = () => {
    let newWord = newTriggerInput.current.value;
    console.log("input value",newWord);
    console.log("array",newTriggerArray);
    setNewTriggerArray([...newTriggerArray, newWord]);
    newTriggerInput.current.value = "";
  }

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('submit');
    console.log(newTriggerArray);
    console.log(e.target.response.value);
    console.log("auth",getAuthUser);
    console.log(getAuthUser.user_id);
    const data = {
      triggers: {triggers: newTriggerArray}, 
      response: e.target.response.value,
      user_id: getAuthUser.user_id
    }
    try {
      const res = await axios.post('/triggers',data)
      //clear inputs
      setNewTriggerArray([]);
      setNewResponse("")
      console.log(res.data)
      await updateAuthUser(prevAuth => {
        console.log('updating');
        let newObj = {...prevAuth, triggersList: [...prevAuth.triggersList, res.data.data] }
        console.log(newObj);
        return newObj;
      })
    } catch (err) {
      console.error(err)
    }
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  const handleVoice = (e) => {
    if (processing) return;
    recognition.start();
  };

  recognition.onresult = (event) => {
    setProcessing(false);
    console.log(event);
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    const confidence = event.results[current][0].confidence;
    setCommand(transcript);

    const resp = VoiceAssistance.processInstruction(transcript, getAuthUser.triggersList);
    setResponse(resp);
  };

  recognition.onstart = () => {
    setProcessing(true);
    console.log("Listening...");
  };
  recognition.onspeechstart = () => {
    console.log("start");
  };
  recognition.onspeechend = () => {
    setProcessing(false);
    console.log("over");
  };

  return (
    <>
      <AuthMenu showTriggerList={setShowTriggerList} />
      <div className="App">
        <section className="App-header">
          <a className="App-link" onClick={handleVoice}>
            {processing ? (
              <HiMicrophone style={{ fontSize: "9rem" }} />
            ) : (
              <MdTouchApp style={{ fontSize: "9rem" }} />
            )}
            <button disabled={processing} style={{ marginTop: "1rem" }}>
              {processing ? "Listening..." : "Touch HERE to Speak"}
            </button>
          </a>
          <p className="command">
            {command ? command : "touch to speak a new command"}
          </p>
          <p>{response ? response : null}</p>
        </section>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} 
        shouldCloseOnOverlayClick={false} contentLabel="Add new trigger" >
        <div onClick={e => setModalIsOpen(false)}>
          <MdClose/>
        </div>
        <h2>Add new trigger</h2>
        <p>If your spoken phrase matchs ALL triggers then the response will be read out loud.</p>
        <form onSubmit={handleSubmit}>            
            <label htmlFor="new_trigger">Add another word trigger </label>
            <input type="text" name="new_trigger" id="new_trigger" ref={newTriggerInput} />
            <span onClick={e => addTriggerToArray()}>
                <MdAdd />
            </span>
            <p>List of trigger words: </p>
            <TriggerTags triggersArray={newTriggerArray} />
            <br/>
            <label htmlFor="response">Response to read outloud</label>
            <input type="text" name="response" id="response"/>
            <br/>
            <button type="submit">Save Trigger</button>
        </form>
      </Modal>
      <div onClick={e => addNewTrigger()}>
        <FAB />
      </div>
    </>
  );
}

export default Home;
