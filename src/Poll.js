import React, { useState, useEffect } from "react";
import { votePoll, fetchPoll } from "./api";
import Banner from "./banner";

const Poll = () => {
  const [poll, setPoll] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

useEffect(() => {
  fetchPoll()
    .then((response) => {
      setPoll(response.data);
      setErrorMessage(""); // Clear previous errors
    })
    .catch(() => setErrorMessage("Failed to load poll data."));

  // Set up polling every 5 seconds
  const interval = setInterval(() => {
    fetchPoll()
      .then((response) => setPoll(response.data))
      .catch(() => setErrorMessage("Failed to refresh poll data."));
  }, 5000);

  // Clean up interval on component unmount
  return () => clearInterval(interval);
}, []);


  // Handle voting
  const handleVote = (id) => {
      console.log(`Voting on Poll ID: ${id}`); // Add this debug log
    setSuccessMessage(""); // Clear success message
    setErrorMessage(""); // Clear error message

    votePoll(id)
      .then((response) => {
        // Update success message
        setSuccessMessage(response.data.message);

        // Refetch poll data to reflect updated vote counts
        fetchPoll()
          .then((response) => setPoll(response.data))
          .catch(() =>
            setErrorMessage("Failed to refresh poll data after voting.")
          );
      })
      .catch((error) => {
        // Handle errors from the backend
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("An unexpected error occurred while voting.");
        }
      });
  };

  // Render component
  return (
      <div className={"container"}>
          <Banner isSuggestionsOpen={false} />
          <h1>Community Game Voting</h1>
          <h2>Top 3 Suggestions</h2>

          {/* Success Message */}
          {successMessage && (
              <div
                  className="alert alert-success"
                  role="alert"
                  style={{
                      transition: "opacity 0.5s ease-in-out",
                      opacity: successMessage ? 1 : 0,
                  }}
              >
                  {successMessage}
              </div>
          )}

          {/* Error Message */}
          {errorMessage && (
              <div
                  className="alert alert-danger"
                  role="alert"
                  style={{
                      transition: "opacity 0.5s ease-in-out",
                      opacity: errorMessage ? 1 : 0,
                  }}
              >
                  {errorMessage}
              </div>
          )}

          {/* Poll suggestions */}
          <ul>
              {poll.map((p) => {
    console.log(`Rendering Poll ID: ${p.id}, Title: ${p.title}, Votes: ${p.votes}`); // Debug log
    return (
        <li key={p.id}>
            {p.title} - {p.votes} votes
            <button
                onClick={() => {
                    console.log(`Clicked Vote Button for Poll ID: ${p.id}`); // Debug log
                    handleVote(p.id);
                }}
                disabled={!poll.length}
                style={{ backgroundColor: !poll.length ? "grey" : "lightgrey" }}
            >
                Vote
            </button>
        </li>
    );
})}

          </ul>
      </div>
  );
};

export default Poll;