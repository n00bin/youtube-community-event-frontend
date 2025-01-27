import React, { useState, useEffect } from "react";
import { fetchSuggestions, addSuggestion, upvoteSuggestion } from "./api";
import axios from "axios";
import Spinner from "./Spinner";
import Banner from "./banner";

const Suggestions = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(true);

  // Fetch suggestions and state on component mount
  useEffect(() => {
    let interval;

    const fetchState = async () => {
      try {
        const response = await axios.get(
          "https://youtube-backend-kx3o.onrender.com/state",
          { withCredentials: true }
        );
        setSuggestionsOpen(response.data.suggestionsOpen);

        await fetchSuggestionsData();

        // Set up polling every 5 seconds if suggestions are open
        if (response.data.suggestionsOpen) {
          interval = setInterval(() => {
            fetchSuggestionsData();
          }, 5000);
        }
      } catch (error) {
        console.error("Error fetching state:", error);
        setErrorMessage("Failed to load application state.");
      }
    };

    fetchState();

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Fetch suggestions from the backend
  const fetchSuggestionsData = async () => {
    try {
      const response = await fetchSuggestions();
      setSuggestions(response.data || []); // Ensure it's always an array
      setErrorMessage(""); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setErrorMessage("Failed to load suggestions. Please try again.");
    }
  };

  // Add a new suggestion
  const handleAdd = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!newTitle.trim()) {
      setErrorMessage("Please enter a valid title.");
      return;
    }

    if (!suggestionsOpen) {
      setErrorMessage("Suggestions are closed. You can't add a new game.");
      return;
    }

    setLoading(true);
    try {
      await addSuggestion(newTitle);
      setNewTitle(""); // Clear input field
      setSuccessMessage("Suggestion added successfully!");
      fetchSuggestionsData(); // Refresh suggestions
    } catch (error) {
      console.error("Error adding suggestion:", error);
      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An unexpected error occurred while adding the suggestion.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Upvote a suggestion
  const handleUpvote = async (id) => {
    setSuccessMessage("");
    setErrorMessage("");
    try {
      await upvoteSuggestion(id);
      setSuccessMessage("Suggestion upvoted successfully!");
      fetchSuggestionsData(); // Refresh suggestions
    } catch (error) {
      console.error("Error upvoting suggestion:", error);
      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An unexpected error occurred while upvoting.");
      }
    }
  };

  return (
    <div className="container">
      <Banner isSuggestionsOpen={suggestionsOpen} />
      <h1>Community Game Suggestions</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      {/* Add Suggestion Form */}
      {suggestionsOpen ? (
        <div>
          {loading && <Spinner />}
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Suggest a game"
            aria-label="Game Suggestion Input"
          />
          <button
            onClick={handleAdd}
            disabled={loading || !newTitle.trim()}
            style={{
              backgroundColor: loading ? "grey" : "lightblue",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Adding..." : "Add Suggestion"}
          </button>
        </div>
      ) : (
        <p>Suggestions are currently closed. Voting has started!</p>
      )}

      {/* Suggestions List */}
      {suggestions && suggestions.length > 0 ? (
        <ul>
          {suggestions.map((s) => (
            <li key={s.id}>
              {s.title} - {s.votes} votes
              <button
                onClick={() => handleUpvote(s.id)}
                disabled={loading || !suggestionsOpen}
                aria-label={`Upvote ${s.title}`}
              >
                Upvote
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "gray" }}>No suggestions yet. Be the first to suggest a game!</p>
      )}
    </div>
  );
};

export default Suggestions;
