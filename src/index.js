import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Modal from "react-modal";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { IntlProvider, addLocaleData } from "react-intl";
// import locale_en from "react-intl/locale-data/en";
// import locale_es from "react-intl/locale-data/es";

// addLocaleData([...locale_en, ...locale_es]);
import messages_es from "./translations/es.json";
import messages_en from "./translations/en.json";

const messages = {
  es: messages_es,
  en: messages_en,
};
const language = navigator.language.split(/[-_]/)[0]; // language without region code

//endpoint domain for all the data requests
axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;

//react-modal package
Modal.setAppElement("#root");

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <App />
  </IntlProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
