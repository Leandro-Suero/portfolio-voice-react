import React from "react";
import AuthMenu from "../utils/AuthMenu";
import FAB from "../utils/Fab";
import NewTriggerModal from "../NewTriggerModal";
import VoiceInterface from "../VoiceInterface";

function Home() {
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
