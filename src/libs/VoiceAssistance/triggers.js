export const evaluateTriggers = (input, triggersList) => {
  let answer = false;
  triggersList.some(({ triggers: { triggers }, response }) => {
    const allTriggersPresent = triggers.every((trigger) => {
      if (input.toLowerCase().includes(trigger.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    if (allTriggersPresent) {
      answer = response;
      return true;
    }
  });
  return answer;
};
