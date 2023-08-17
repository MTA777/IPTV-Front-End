import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import { getCapitalizeName } from "../Utils/getCapitalizeName";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [sections, setSections] = useState([]);

  const { title } = props;
  const token = localStorage.getItem("jwtToken");
  const baseUrl = "https://long-cyan-elephant-sari.cyclic.app";

  useEffect(() => {
    // Fetch genres from the API with Bearer token
    async function fetchGenres() {
      try {
        const response = await axios.get(`${baseUrl}/api/genre`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log({ token, baseUrl, genres });
        console.log(response.data.data);

        setSections(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }

    fetchGenres();
  }, [token]); // Include the token in the dependency array

  const handleSignOut = () => {
    localStorage.clear();
    console.log("Token:", localStorage.getItem("jwtToken"), ", Signing out");
    handleCloseMenu();
    navigate("/signin");
  };

  //for menu items
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
    handleCloseMenu();
  };

  const handleNavigateToGenrePage = (id) => {
    navigate(`/api/genre/${id}/series`);
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button size="small">Subscribe Plan</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>{" "}
        <div>
          <IconButton onClick={handleOpenMenu}>
            <AccountCircleIcon sx={{ fontSize: 35, color: "#1976d2" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleNavigateToProfile}>Profile</MenuItem>
            <MenuItem onClick={() => navigate("/account")}>My Account</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </div>
        <IconButton></IconButton>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {isLoading ? (
          <Skeleton
            variant="text"
            height={39}
            width="95%"
            sx={{ mx: "auto" }}
          />
        ) : (
          sections?.map((section) => (
            <Link
              onClick={() => handleNavigateToGenrePage(section._id)}
              // to={`/api/genre/${section._id}/series`} //to navigate to series of specific genre by id
              color="inherit"
              noWrap
              key={section._id}
              variant="body2"
              sx={{
                p: 1,
                flexShrink: 0,
                textDecoration: "none",
                cursor: "pointer",
                fontWeight: "bold",
                "&:hover": {
                  // textDecoration: "bold",
                  color: "#007bff",
                },
              }}
            >
              {/* To upperCase first letter of genre */}
              {getCapitalizeName(section.name)}
            </Link>
          ))
        )}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string,
    })
  ),
  title: PropTypes.string.isRequired,
};

export default Header;
