import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "../Styling/RegisterPage.css";

function Register() {
  //   const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const endPoint = "https://long-cyan-elephant-sari.cyclic.app";

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = async () => {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${endPoint}/register`, newUser);
      window.location = "/";
      console.log("Registration successful:", response.data);

      // Store the token or handle registration success as needed
      // (e.g., show a success message, redirect to login page, etc.)

      // Redirect to the login page
      //   history.push("/login");
    } catch (error) {
      setError(error.response.data);
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error-message">ERR_BAD_REQUEST</p>}
      <div className="input-group">
        <label>First Name:</label>
        <input type="text" value={firstName} onChange={handleFirstNameChange} />
      </div>
      <div className="input-group">
        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={handleLastNameChange} />
      </div>
      <div className="input-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div className="input-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
