import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Tour from "reactour";
import { FormattedMessage } from "react-intl";
import { setAuthorizationToken } from "../../libs/utils";
import { useAuth, useAuthUpdate } from "../../AuthContext";
import AuthMenu from "../utils/AuthMenu";
import FAB from "../utils/Fab";
import NewTriggerModal from "../NewTriggerModal";
import VoiceInterface from "../VoiceInterface";

const tour_steps = [
  {
    selector: ".voice-interface",
    content: (
      <FormattedMessage
        id="tour.step1.voice"
        defaultMessage="Press here to start an interaction. After the icon turns green you can speak a command to the assistant."
      />
    ),
    position: "top",
  },
  {
    selector: ".command-transcript",
    content: (
      <FormattedMessage
        id="tour.step2.transcript"
        defaultMessage="This is the transcript of the spoken command, as the assistant understood it. Be clear in your instructions."
      />
    ),
    position: "top",
  },
  {
    selector: ".command-response",
    content: (
      <FormattedMessage
        id="tour.step3.response"
        defaultMessage="This is the response given by your voice assistant."
      />
    ),
    position: "top",
  },
  {
    selector: ".fab-menu",
    content: (
      <FormattedMessage
        id="tour.step4.fab"
        defaultMessage="This is where you can create new triggers for commands with your own predefined responses. You need to be logged in for this."
      />
    ),
    position: "top",
  },
  {
    selector: ".auth-menu",
    content: (
      <FormattedMessage
        id="tour.step5.auth"
        defaultMessage="Here you can login and manage your custom triggers."
      />
    ),
  },
];

function Home() {
  const authUser = useAuth();
  const setAuthObject = useAuthUpdate();
  const [isTourOpen, setIsTourOpen] = useState(false);

  useEffect(async () => {
    //check if user isn't loggedin
    if (authUser.user_id === "") {
      let token = localStorage.getItem("voice-token");
      if (token) {
        setAuthorizationToken(token);
        var decoded = jwt_decode(token);
        const {
          data: { data },
        } = await axios.get("/triggers/user/" + decoded.id);
        setAuthObject({
          username: decoded.username,
          user_id: decoded.id,
          triggersList: data,
        });
      }
    }
    //check if the tour must be seen (1st time app opens)
    const tour_is_done = localStorage.getItem("tour-is-done");
    if (!tour_is_done) {
      setIsTourOpen(true);
    }
  }, []);

  return (
    <>
      <AuthMenu />
      <VoiceInterface />
      <NewTriggerModal />
      <FAB />
      <Tour
        steps={tour_steps}
        isOpen={isTourOpen}
        onRequestClose={() => {
          setIsTourOpen(false);
          localStorage.setItem("tour-is-done", true);
        }}
      />
    </>
  );
}

export default Home;
