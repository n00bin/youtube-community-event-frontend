import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          "https://youtube-backend-kx3o.onrender.com/admin",
          {
            withCredentials: true, // Ensures cookies are included for session validation
          }
        );
        setData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setMessage("Unauthorized. Only admins can access this page.");
        } else {
          setMessage("An error occurred. Please try again.");
        }
      }
    };

    fetchAdminData();
  }, []);

  if (message) return <p>{message}</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {data ? (
        <div>
          <p>{data.message}</p>
          {/* Render more admin-specific data here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
