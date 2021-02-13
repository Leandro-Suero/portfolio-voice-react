const triggers_list = [
  {
    triggers: ["cómo estás"],
    sentence: "¿Ahora te interesa? si solo me hablas cuando necesitas algo...",
  },
];

export const evaluateTriggers = (input) => {
  let response = false;
  triggers_list.some(({ triggers, sentence }) => {
    const allTriggersPresent = triggers.every((trigger) => {
      if (input.toLowerCase().includes(trigger)) {
        return true;
      } else {
        return false;
      }
    });
    if (allTriggersPresent) {
      response = sentence;
      return true;
    }
  });
  return response;
};
