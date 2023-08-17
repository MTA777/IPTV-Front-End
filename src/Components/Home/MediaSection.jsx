import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import { getCapitalizeName } from "../Utils/getCapitalizeName";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { CardMedia } from "@mui/material";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function MediaSection() {
  const [series, setSeries] = useState([]);
  //   const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add this state

  //   const { id } = useParams();
  const token = localStorage.getItem("jwtToken");
  const baseUrl = "https://long-cyan-elephant-sari.cyclic.app";

  useEffect(() => {
    // Fetch genres from the API with Bearer token
    async function fetchAllSeries() {
      try {
        const response = await axios.get(`${baseUrl}/api/series`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data.data);
        const responseData = response.data.data[0]; // store the series and genre data

        // setName(responseData.name);
        setSeries(responseData.series);
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }

    fetchAllSeries();
  }, [token]); // Include the token in the dependency array

  return (
    <div>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {isLoading ? (
          Array.from(new Array(6)).map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card
                sx={{
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
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : series.length > 0 ? (
          series.map((singleSeries) => (
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
                  image="https://images.unsplash.com/photo-1500252185289-40ca85eb23a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"
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
          ))
        ) : (
          <>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <InfoOutlinedIcon
                sx={{ fontSize: 48, color: "#1976d2", marginRight: "0.5rem" }}
              />
              <Typography variant="body1">No data found.</Typography>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}

export default MediaSection;
