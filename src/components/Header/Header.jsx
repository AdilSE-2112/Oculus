import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoHeader1 from "../../assets/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import {useAuth} from "../AuthContext";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {setIsAuthenticated} = useAuth();
  const location = useLocation();
  const { username } = location.state || {};
  const navigate = useNavigate(); // Update this line

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Perform any necessary logout actions (e.g., clearing localStorage)
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    // Redirect to the login page
    navigate("/");
  };
  const handleAdminPanelClick = () => {
    const username = "Zhakhangir_Zhangaliev"; // Replace with your desired username

    // Redirect to the Admin Panel page
    navigate("/admin-panel", { state: { username } });
    handleClose();
  };

  return (
    <Container sx={{ maxWidth: "1200px", padding: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          background: "#0D0F11",
          padding: "10px 0",
          width: "1153px",
          borderRadius: "10px",
        }}
      >
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{ borderBottom: 1, borderColor: "grey.500", width: "1100px" }}
        >
          <Toolbar
            variant="dense"
            sx={{
              justifyContent: "space-between",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start", // Align to the top
                justifyContent: "flex-start",
                marginLeft: "-20px", // Adjust the left margin as needed
                marginTop: "4px", // Adjust the top margin as needed
              }}
            >
              <img
                src={LogoHeader1}
                alt="Image Description"
                style={{ height: "25px", width: "40px", margin: "5px", }}
              />
            </div>
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={handleMenu}
            >
              <AccountCircleIcon />
              <Typography
                variant="subtitle1"
                color="inherit"
                noWrap
                sx={{
                  marginLeft: 1,
                  fontSize: "16px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {username}
              </Typography>
              <ExpandMoreIcon />
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {username === "Zhakhangir_Zhangaliev" && (
                <MenuItem
                  onClick={handleAdminPanelClick}
                  sx={{
                    marginLeft: 1,
                    fontSize: "16px",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Admin Panel
                </MenuItem>
              )}
              <MenuItem
                onClick={handleLogout}
                sx={{
                  marginLeft: 1,
                  fontSize: "16px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Log Out
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
  );
};

export default Header;
