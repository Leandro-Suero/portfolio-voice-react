import React, { useState } from "react";
import { MdTouchApp } from "react-icons/md";
import { HiMicrophone } from "react-icons/hi";
import { useIntl } from "react-intl";

import { useVoiceInterface } from "../hooks/useVoiceInterface";
import { getLanguageWithoutRegionCode } from "../libs/utils";
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
  const language = getLanguageWithoutRegionCode();

  let { recognition } = useVoiceInterface({
    triggersList: getAuthUser.triggersList,
    setProcessing,
    setCommand,
    setResponse,
    i18n: { intl, language },
  });

  const handleVoice = (e) => {
    if (processing) return;
    recognition.start();
  };

  return (
    <Column>
      <a onClick={handleVoice} className="voice-interface">
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
      <P italic className="command-transcript">
        {command
          ? command
          : intl.formatMessage({
              id: "voice.label.touch",
              defaultMessage: "touch to speak a new command",
            })}
      </P>
      <P className="command-response">{response ? response : "..."}</P>
    </Column>
  );
}

export default VoiceInterface;
