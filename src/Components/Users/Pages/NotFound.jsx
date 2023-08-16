import React from "react";
import { Link } from "react-router-dom";
import "../Styling/NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default NotFound;
