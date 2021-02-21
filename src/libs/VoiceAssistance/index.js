import * as commandsCtrl from "./commands";
import * as triggersCtrl from "./triggers";

export const processInstruction = (message, triggersList) => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = "Tenés una papa en la boca, ¡no se te entiende nada!";
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  speech.lang = "es";
  console.log("message:", message);
  const currentCommand = commandsCtrl.evaluateCommands(message);
  console.log("command:", currentCommand);
  if (currentCommand) {
    speech.text = commandsCtrl.executeCommand(currentCommand, message);
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
