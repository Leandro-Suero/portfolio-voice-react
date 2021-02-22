import axios from "axios";

export function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common["x-access-token"] = token;
    localStorage.setItem("voice-token", token);
  } else {
    delete axios.defaults.headers.common["x-access-token"];
    localStorage.removeItem("voice-token");
  }
}

export function getLanguageWithoutRegionCode() {
  return navigator.language.split(/[-_]/)[0];
}
