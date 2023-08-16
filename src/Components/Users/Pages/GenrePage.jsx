import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getCapitalizeName } from "../../Utils/getCapitalizeName";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { CardMedia } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function GenrePage() {
  const [series, setSeries] = useState([]);
  const [name, setName] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  const baseUrl = "https://long-cyan-elephant-sari.cyclic.app";

  useEffect(() => {
    // Fetch genres from the API with Bearer token
    async function fetchSeriesByGenresId() {
      try {
        const response = await axios.get(`${baseUrl}/api/genre/${id}/series`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data.data);
        const responseData = response.data.data[0]; // store the series and genre data

        setName(responseData.name);
        setSeries(responseData.series);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }

    fetchSeriesByGenresId();
  }, [id, token]); // Include the token in the dependency array

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ m: 2, textAlign: "center" }}>
        <b>{getCapitalizeName(name)}</b>
      </Typography>
      <Breadcrumbs aria-label="breadcrumb" sx={{ m: 4 }}>
        <Link
          color="inherit"
          sx={{
            textDecoration: "none",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => navigate("/")}
        >
          Home
        </Link>
        <Typography color="text.primary">Genre</Typography>
      </Breadcrumbs>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {series.map((singleSeries) => (
          <Grid key={singleSeries._id} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                cursor: "pointer",
                m: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                image={
                  "https://images.unsplash.com/photo-1500252185289-40ca85eb23a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"
                }
                alt={singleSeries.name}
              />
              <CardContent
                sx={{
                  background: "#1f1f1f",
                  color: "#ffffff",
                  paddingBottom: "1rem",
                }}
              >
                <Typography variant="h6" component="div" align="center">
                  <b>{singleSeries.name.toUpperCase()}</b>
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  {singleSeries.description.toUpperCase()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default GenrePage;
