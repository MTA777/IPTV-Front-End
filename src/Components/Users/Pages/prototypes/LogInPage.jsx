import React, { useState } from "react";
import axios from "axios";
import "../Styling/LogInPage.css"; // Make sure to adjust the path to your CSS file
import { Navigate, useNavigate } from "react-router-dom";

function LogInPage() {
  const navigate = useNavigate();
  const [userEmail, setuserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const endPoint = "https://long-cyan-elephant-sari.cyclic.app/user/login";

  const handleuserEmailChange = (event) => {
    setuserEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    // Create an object with the user's credentials
    if (userEmail && password) {
      setDisableButton(true);
      console.log("Button disbaled");

      const userCredentials = {
        email: userEmail,
        password,
      };

      try {
        // Make a POST request using Axios with async/await
        const response = await axios.post(endPoint, userCredentials);
        localStorage.setItem("jwtToken", response.data.data.token);

        // Handle success response
        navigate("/");
        console.log("Login successful:", response.data);
      } catch (error) {
        setDisableButton(false);
        // Handle error response
        console.error("Error:", error);
      }
    } else console.log(userEmail ? "Enter Password" : "Enter Email");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="input-group">
        <label>userEmail:</label>
        <input type="text" value={userEmail} onChange={handleuserEmailChange} />
      </div>
      <div className="input-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button
        disabled={disableButton}
        style={{ backgroundColor: "#4CAF50", marginBottom: "10px" }}
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        style={{ marginBottom: "10px" }}
        onClick={() => (window.location = "/register")}
      >
        Register User
      </button>
    </div>
  );
}

export default LogInPage;
