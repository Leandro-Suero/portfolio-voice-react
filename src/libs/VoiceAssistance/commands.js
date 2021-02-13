const commands_list = [
  "fecha",
  "hora",
  "tiempo",
  "clima",
  "decime",
  "chiste",
  "chistecito",
];
export const evaluateCommands = (sentence) => {
  let command = false;
  commands_list.some((comm) => {
    if (sentence.toLowerCase().includes(comm)) {
      command = comm;
      return true;
    }
  });
  return command;
};

export const executeCommand = (command, phrase) => {
  switch (command) {
    case "fecha":
      let currentDate = new Date();
      return new Intl.DateTimeFormat("es-ES", {
        dateStyle: "full",
        timeStyle: "short",
      }).format(currentDate);
    case "hora":
      return "Llegó la hora de las boludeces, aparentemente";
    case "tiempo":
    case "clima":
      return "¿Para qué querés saber si no salís de la casa?";
    case "decime":
      return "Mira vos que chusma que resultaste ser";
    case "chiste":
    case "chistecito":
      return "¿Acaso me viste cara de payaso?";
    default:
      return "Comando no reconocido";
  }
};
