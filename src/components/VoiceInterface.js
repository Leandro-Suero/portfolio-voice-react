import React, { useState } from "react";
import { MdTouchApp } from "react-icons/md";
import { HiMicrophone } from "react-icons/hi";

import * as VoiceAssistance from "../libs/VoiceAssistance";
import { useAuth } from "../AuthContext";

function VoiceInterface() {
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");
  const [processing, setProcessing] = useState(false);
  const getAuthUser = useAuth();

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

    const resp = VoiceAssistance.processInstruction(
      transcript,
      getAuthUser.triggersList
    );
    setResponse(resp);
  };

  recognition.onstart = () => {
    setProcessing(true);
    console.log("Listening...");
  };
  recognition.onspeechstart = () => {
    console.log("voice start");
  };
  recognition.onspeechend = () => {
    setProcessing(false);
    console.log("voice over");
  };

  return (
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
  );
}

export default VoiceInterface;
