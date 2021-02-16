import React from "react";
import { MdPlaylistAdd } from "react-icons/md";

function FAB() {
  return (
    <div>
      <MdPlaylistAdd
        style={{
          fontSize: "3rem",
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
        }}
      />
    </div>
  );
}

export default FAB;
