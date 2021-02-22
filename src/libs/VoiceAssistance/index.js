import * as commandsCtrl from "./commands";
import * as triggersCtrl from "./triggers";

export const processInstruction = (
  message,
  triggersList,
  { intl, language }
) => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = intl.formatMessage({
    id: "speech.default.message",
    defaultMessage: "What did you say?",
  });
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  console.log(language);
  speech.lang = language;
  console.log("message:", message);
  const currentCommand = commandsCtrl.evaluateCommands(message, intl);
  console.log("command:", currentCommand);
  if (currentCommand) {
    speech.text = commandsCtrl.executeCommand(
      currentCommand,
      message,
      intl,
      language
    );
  } else {
    const currentTriggerResponse = triggersCtrl.evaluateTriggers(
      message,
      triggersList
    );
    if (currentTriggerResponse) {
      speech.text = currentTriggerResponse;
    }
  }
  window.speechSynthesis.speak(speech);
  console.log("response:", speech.text);
  return speech.text;
};
