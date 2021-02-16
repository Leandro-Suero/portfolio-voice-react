import React from "react";
import { useHistory } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

function BackButton() {
  const history = useHistory();

  return (
    <div onClick={() => history.goBack()}>
      <MdArrowBack
        style={{
          fontSize: "3rem",
          position: "fixed",
          top: "1rem",
          left: "1rem",
        }}
      />
    </div>
  );
}

export default BackButton;
