import React, { useState, useEffect } from "react";
import Suggestions from "./Suggestions";
import Poll from "./Poll";
import Login from "./Login";  // Import the Login component
import AdminDashboard from "./AdminDashboard";  // Import the AdminDashboard component
import './styles.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [suggestionsOpen, setSuggestionsOpen] = useState(true); // State fetched from your backend
  const [pollOpen, setPollOpen] = useState(false); // State fetched from your backend

  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await fetch("https://your-backend-url/state"); // Use your backend URL here
        const data = await response.json();
        setSuggestionsOpen(data.suggestionsOpen);
        setPollOpen(data.pollOpen);
      } catch (error) {
        console.error("Error fetching state:", error);
      }
    };

    fetchState();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                {suggestionsOpen && <Suggestions />}
                {pollOpen && <Poll />}
              </>
            }
          />

          {/* Admin Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Admin Dashboard Route */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
