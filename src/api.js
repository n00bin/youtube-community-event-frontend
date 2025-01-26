import axios from "axios";

const API = axios.create({
  baseURL: "https://youtube-community-event-1.onrender.com", // Backend URL
});

// Fetch all suggestions
export const fetchSuggestions = () => API.get("/suggestions");

// Add a new suggestion
export const addSuggestion = (title) =>
  API.post("/suggestions", { title });

// Upvote a suggestion
export const upvoteSuggestion = (id) =>
  API.post(`/suggestions/${id}/upvote`);

export const fetchPoll = () => {
  return API.get("/poll");
};

export const votePoll = (id) => {
  return API.post(`/poll/${id}/vote`);
};
