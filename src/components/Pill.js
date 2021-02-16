import React from "react";

function Pill({ text }) {
  return (
    <>
      <span
        key={text}
        style={{
          padding: ".25rem .5rem",
          backgroundColor: "orange",
          borderRadius: "25%",
        }}
      >
        {text}
      </span>
    </>
  );
}

export default Pill;
