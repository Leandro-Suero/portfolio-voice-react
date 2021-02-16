import * as commandsCtrl from "./commands";
import * as triggersCtrl from "./triggers";

export const processInstruction = (message, triggersList) => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = "Tenés una papa en la boca, ¡no se te entiende nada!";
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  speech.lang = "es";
  console.log(message);
  const currentCommand = commandsCtrl.evaluateCommands(message);
  console.log(currentCommand);
  if (currentCommand) {
    speech.text = commandsCtrl.executeCommand(currentCommand, message);
    console.log(speech.text);
  } else {
    console.log("trigger array:", triggersList);
    const currentTriggerResponse = triggersCtrl.evaluateTriggers(
      message,
      triggersList
    );
    if (currentTriggerResponse) {
      speech.text = currentTriggerResponse;
    }
  }
  window.speechSynthesis.speak(speech);

  return speech.text;
};
