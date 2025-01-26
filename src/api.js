import axios from "axios";

const API = axios.create({
  baseURL: "https://youtube-backend-kx3o.onrender.com", // Correct backend URL
  withCredentials: true, // Include cookies/session
});

export const fetchSuggestions = () => {
    return fetch("https://https://youtube-backend-kx3o.onrender.com/suggestions", {
        method: "GET",
        credentials: "include",
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch suggestions");
            }
            return res.json();
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

