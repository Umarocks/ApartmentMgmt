import React, { useEffect } from "react";
import axios from "axios";

function Logout() {
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // Redirect to login page after successful logout
        console.log("Logout successful:", response.data);
        // window.location.href = "/login";
        // Perform any additional logic after successful logout
      } else {
        // Handle error if logout request fails
        console.error("Logout failed:", response.statusText);
      }

      // Perform any additional logic after successful logout
    } catch (error) {
      // Handle error if logout request fails
      console.error("Logout failed:", error);
    } finally {
      window.location.href = "/login";
    }
  };

  // useEffect(() => {
  //   handleLogout();
  // }, []);

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
