import React, { useState } from "react";
import "../DataInputPage/DataInput.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import colors from "../../themes/palette.json";

import {
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleRegistration = () => {
    // Perform registration logic and send data to the server
    fetch("http://127.0.0.1:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        if (data.message === "User registered successfully") {
          setIsSuccessSnackbarOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSnackbarClose = () => {
    setIsSuccessSnackbarOpen(false);
  };

  return (
    <div className="data-input-page">
      <Header />
      <ThemeProvider theme={darkTheme}>
        <Container
          sx={{
            color: "white",
            width: "1400px",
            minHeight: "1500px",
            paddingTop: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#0D0F11",
              p: 5,
              borderRadius: "10px",
              
            }}
          >
            <Typography
              variant="subtitle1"
              color="inherit"
              noWrap
              sx={{
                fontSize: "1.75rem",
                fontFamily: "Montserrat, sans-serif",
                marginBottom: 2,
              }}
            >
             Форма Регестрации
            </Typography>
            <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: 2,
              margin: "auto",
              maxWidth: "800px", // Adjust the maximum width as needed


            }}
          >
            {/* First Column */}
            <Box sx={{ width: "45%" }}>
            <TextField
              required
              id="username"
              label="Имя пользоватля"
              variant="outlined"
              value={formData.username}
              onChange={handleInputChange}
              name="username"
              sx={{ marginBottom: 2, width: "300px" }}
            />
            <TextField
              required
              id="email"
              label="Почта"
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              sx={{ marginBottom: 2, width: "300px" }}
            />
            <TextField
              required
              id="password"
              label="Пароль"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleInputChange}
              name="password"
              sx={{ marginBottom: 2, width: "300px" }}
            />
             <TextField
              required
              id="reason"
              label="Причина доступа"
              type="access"
              variant="outlined"
              value={formData.access}
              onChange={handleInputChange}
              name="access"
              sx={{ marginBottom: 2, width: "300px" }}
            />
            </Box>
            <Box sx={{ width: "45%" }}>
             <TextField
              id="firstName"
              label="Имя"
              variant="outlined"
              value={formData.firstName}
              onChange={handleInputChange}
              name="firstName"
              sx={{ marginBottom: 2, width: "300px" }}
            />
            <TextField
              id="lastName"
              label="Фамилия"
              variant="outlined"
              value={formData.lastName}
              onChange={handleInputChange}
              name="lastName"
              sx={{ marginBottom: 2, width: "300px" }}
            />
            <TextField
              id="address"
              label="Адрес"
              variant="outlined"
              value={formData.address}
              onChange={handleInputChange}
              name="address"
              sx={{ marginBottom: 2, width: "300px" }}
            />
            <TextField
              id="phoneNumber"
              label="Номер телефона"
              variant="outlined"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              name="phoneNumber"
              sx={{ marginBottom: 2, width: "300px" }}
            />
            </Box>
            </Box>
            <Button
              variant="contained"
              onClick={handleRegistration}
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.75rem",
                marginLeft: "-57px",


              }}
            >
              Register
            </Button>
          </Box>
        </Container>
        <Snackbar
          open={isSuccessSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message="User registered successfully"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            height: "100vh",
          }}
        >
          {/* Add any additional components or content for the bottom box */}
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default AdminPanel;
