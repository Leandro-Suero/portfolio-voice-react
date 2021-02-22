import * as VoiceAssistance from "../libs/VoiceAssistance";

export const useVoiceInterface = ({
  triggersList,
  setProcessing,
  setCommand,
  setResponse,
  i18n,
}) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onresult = (event) => {
    setProcessing(false);
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    const confidence = event.results[current][0].confidence;
    setCommand(transcript);

    const resp = VoiceAssistance.processInstruction(
      transcript,
      triggersList,
      i18n
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

  return { recognition };
};
