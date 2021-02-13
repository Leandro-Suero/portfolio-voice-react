import React, { useState, useEffect } from "react";
import { MdTouchApp } from "react-icons/md";
import { HiMicrophone } from "react-icons/hi";
import * as VoiceAssistance from "../../libs/VoiceAssistance";
import AuthMenu from "../AuthMenu";

function Home() {
  const [command, setCommand] = useState("");
  const [triggersList, setTriggerList] = useState({});
  const [response, setResponse] = useState("");
  const [processing, setProcessing] = useState(false);

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

    const resp = VoiceAssistance.processInstruction(transcript);
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
      <AuthMenu />
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
    </>
  );
}

export default Home;
