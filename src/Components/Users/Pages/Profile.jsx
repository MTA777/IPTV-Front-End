import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCapitalizeName } from "./../../Utils/getCapitalizeName";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const baseUrl = "https://long-cyan-elephant-sari.cyclic.app";
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(
          `${baseUrl}/user/64b66c88d1b58062f2fa162e`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [token]);

  const handleNavigateToHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Card
        sx={{
          backgroundColor: "#FAF9F6",
          borderRadius: 2,
          p: 2,
          minWidth: 350,
        }}
      >
        <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
          Profile Page
        </Typography>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <strong>Id:</strong> {user._id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>First-Name:</strong> {getCapitalizeName(user.first_name)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Last-Name:</strong> {getCapitalizeName(user.last_name)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Password:</strong>{" "}
            {showPassword ? user.password : "********"}
            <Button
              size="small"
              sx={{ marginLeft: 2 }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleNavigateToHome}>
            Back To Home
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Profile;
