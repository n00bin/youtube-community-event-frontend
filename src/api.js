import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend-url.onrender.com", // Replace with your Render backend URL
  withCredentials: true, // Ensure cookies are sent with requests
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

export const login = (username, password) =>
  API.post("/login", { username, password });

