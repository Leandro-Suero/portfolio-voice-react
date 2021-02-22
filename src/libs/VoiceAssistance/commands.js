const getCommandList = (intl) => {
  return [
    intl.formatMessage({
      id: "speech.commands.date",
      defaultMessage: "date",
    }),
    intl.formatMessage({
      id: "speech.commands.hour",
      defaultMessage: "hour",
    }),
    intl.formatMessage({
      id: "speech.commands.weather",
      defaultMessage: "weather",
    }),
    intl.formatMessage({
      id: "speech.commands.joke",
      defaultMessage: "joke",
    }),
  ];
};

export const evaluateCommands = (sentence, intl) => {
  let command = false;
  let commands_list = getCommandList(intl);
  commands_list.some((comm) => {
    if (sentence.toLowerCase().includes(comm)) {
      command = comm;
      return true;
    }
  });
  return command;
};

export const executeCommand = (command, phrase, intl, language) => {
  console.log(command, language);
  switch (command) {
    case "fecha":
    case "date":
      let currentDate = new Date();
      return new Intl.DateTimeFormat(language, {
        dateStyle: "full",
        timeStyle: "short",
      }).format(currentDate);
    case "hora":
    case "hour":
      return intl.formatMessage({
        id: "speech.commands.hour.response",
        defaultMessage: "hour",
      });
    case "clima":
    case "weather":
      return intl.formatMessage({
        id: "speech.commands.weather.response",
        defaultMessage: "weather",
      });
    case "chiste":
    case "joke":
      return intl.formatMessage({
        id: "speech.commands.joke.response",
        defaultMessage: "joke",
      });
    default:
      return intl.formatMessage({
        id: "speech.commands.default.response",
        defaultMessage: "joke",
      });
  }
};
