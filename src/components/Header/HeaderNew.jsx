import React, { useState, useEffect } from "react";
import "./HeaderNew.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  Badge,
  Popover,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoHeader2 from "../../assets/LOGOL.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const HeaderNew = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { logout, setIsAuthenticated } = useAuth();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationData, setNotificationData] = useState([]);
  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.30.24:5220/ws");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data:");

      if (typeof data === "object") {
        if (data["New search"]) {
          setNotificationCount((prevCount) => prevCount + 1);
          setNotificationData((prevData) => [...prevData, data]);
        } else {
          console.log("Received non-notification data:");
        }
      } else {
        console.log("Received non-object data:");
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
    setNotificationOpen(false);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleAdminPanelClick = () => {
    const url = "/admin-panel";
    window.open(url, "_blank");
    handleClose();
  };

  const handleNotificationClick = () => {
    setNotificationOpen(!notificationOpen);
  };

  return (
    <Container
      maxWidth="xl"
      className="header-container"
      style={{ border: "4px dashed red" }}
    >
      <div className="header-box">
        <AppBar
          className="app-bar"
          position="static"
          color="transparent"
          elevation={0}
        >
          <Toolbar className="toolbar">
            <div className="logo">
              <img
                src={LogoHeader2}
                alt="Image Description"
                style={{ height: "35px", width: "70px", margin: "5px" }}
              />
            </div>
            <ThemeProvider theme={darkTheme}>
              <Box className="user-info">
                <IconButton color="inherit" onClick={handleNotificationClick}>
                  <ThemeProvider theme={darkTheme}>
                    <Badge badgeContent={notificationCount} color="error">
                      <NotificationsIcon style={{ color: "white" }} />
                    </Badge>
                  </ThemeProvider>
                </IconButton>
                <AccountCircleRoundedIcon
                  className="user-icon"
                  style={{ color: "white" }}
                  onClick={handleMenu}
                />
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  noWrap
                  className="username"
                  sx={{
                    color: "white",
                    marginLeft: 1,
                    fontSize: "20px",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {username}
                </Typography>
                <ExpandMoreIcon
                  className="expand-icon"
                  style={{ color: "white" }}
                  onClick={handleMenu}
                />
              </Box>
            </ThemeProvider>
            <ThemeProvider theme={darkTheme}>
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
                open={menuOpen}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleAdminPanelClick}
                  className="menu-item"
                  sx={{
                    marginLeft: 1,
                    fontSize: "16px",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Admin Panel
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  className="menu-item"
                  sx={{
                    marginLeft: 1,
                    fontSize: "16px",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Log Out
                </MenuItem>
              </Menu>
            </ThemeProvider>
          </Toolbar>
        </AppBar>
        <ThemeProvider theme={darkTheme}>
          <Popover
            open={notificationOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            style={{
              marginTop: "35px",
            }}
          >
            <Paper style={{ maxHeight: "80vh", overflowY: "auto" }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Сотрудник</TableCell>
                      <TableCell>Дата</TableCell>
                      <TableCell>Сообщение</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notificationData.map((notification, index) => {
                      const newData = notification["New search"].split(",");
                      const email = newData[0].split("'")[1];
                      const date = new Date(newData[1].trim());
                      const formattedDate = date.toLocaleDateString();
                      const someValue = `Искал: ${newData[4].replace(
                        /['")]/g,
                        ""
                      )}`;

                      return (
                        <TableRow key={index}>
                          <TableCell>{email}</TableCell>
                          <TableCell>{formattedDate}</TableCell>
                          <TableCell>{someValue}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Popover>
        </ThemeProvider>
      </div>
    </Container>
  );
};

export default HeaderNew;
