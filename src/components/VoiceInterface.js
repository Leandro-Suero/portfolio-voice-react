import React, { useState } from "react";
import { MdTouchApp } from "react-icons/md";
import { HiMicrophone } from "react-icons/hi";
import { useIntl } from "react-intl";

import * as VoiceAssistance from "../libs/VoiceAssistance";
import { useAuth } from "../AuthContext";
import Column from "../components/styled/Column";
import P from "../components/styled/P";
import Button from "../components/styled/Button";
import MainIcon from "../components/styled/MainIcon";

function VoiceInterface() {
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");
  const [processing, setProcessing] = useState(false);
  const getAuthUser = useAuth();
  const intl = useIntl();

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  const handleVoice = (e) => {
    if (processing) return;
    recognition.start();
  };

  recognition.onresult = (event) => {
    setProcessing(false);
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
    <Column>
      <a onClick={handleVoice}>
        {processing ? (
          <MainIcon active>
            <HiMicrophone />
          </MainIcon>
        ) : (
          <MainIcon>
            <MdTouchApp />
          </MainIcon>
        )}
        <Button disabled={processing} mt="1rem">
          {processing
            ? intl.formatMessage({
                id: "voice.label.listening",
                defaultMessage: "Listening...",
              })
            : intl.formatMessage({
                id: "voice.label.here",
                defaultMessage: "Touch HERE to Speak",
              })}
        </Button>
      </a>
      <P italic>
        {command
          ? command
          : intl.formatMessage({
              id: "voice.label.touch",
              defaultMessage: "touch to speak a new command",
            })}
      </P>
      <P>{response ? response : "..."}</P>
    </Column>
  );
}

export default VoiceInterface;
