import axios from "axios";

const API = axios.create({
    baseURL: "https://youtube-backend-kx3o.onrender.com", // Backend URL
    withCredentials: true,
});

export const fetchSuggestions = () => {
  return API.get("/suggestions")
    .then((response) => response.data) // Extract data
    .catch((error) => {
      console.error("Error fetching suggestions:", error);
      throw new Error("Failed to fetch suggestions");
    });
};

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

