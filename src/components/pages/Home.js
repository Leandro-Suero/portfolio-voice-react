import React, { useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setAuthorizationToken } from "../../libs/utils";
import { useAuth, useAuthUpdate } from "../../AuthContext";
import AuthMenu from "../utils/AuthMenu";
import FAB from "../utils/Fab";
import NewTriggerModal from "../NewTriggerModal";
import VoiceInterface from "../VoiceInterface";

function Home() {
  const authUser = useAuth();
  const setAuthObject = useAuthUpdate();

  useEffect(async () => {
    //check if user isn't loggedin
    if (authUser.user_id === "") {
      let token = localStorage.getItem('voice-token');
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
  }, [])

  return (
    <>
      <AuthMenu />
      <VoiceInterface />
      <NewTriggerModal />
      <FAB />
    </>
  );
}

export default Home;
