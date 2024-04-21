import React, { useEffect } from "react";
import axios from "axios";

function Logout() {
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/auth/logout", {
        withCredentials: true,
      });
      // Redirect to login page after successful logout
      window.location.href = "/login";
      // Perform any additional logic after successful logout
    } catch (error) {
      // Handle error if logout request fails
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
