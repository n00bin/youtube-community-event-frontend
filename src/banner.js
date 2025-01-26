import React from "react";

const Banner = ({ isSuggestionsOpen }) => {
  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: isSuggestionsOpen ? "green" : "red",
        color: "white",
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      {isSuggestionsOpen
        ? "Game Suggestions are OPEN! Add your suggestions now."
        : "Game Suggestions are CLOSED. Voting Time!"}
    </div>
  );
};

export default Banner;
