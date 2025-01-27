import axios from "axios";

const API = axios.create({
    baseURL: "https://youtube-backend-kx3o.onrender.com", // Backend URL
    withCredentials: true,
});

export const fetchSuggestions = async () => {
    try {
        const response = await axios.get("/suggestions", { withCredentials: true });
        console.log("Full API Response:", response); // Log the full response
        return response.data;
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        throw error;
    }
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

