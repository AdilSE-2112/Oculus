import React, { useState } from "react";
import "../DataInputPage/DataInput.css";
import HeaderNew from "../Header/HeaderNew";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import colors from "../../themes/palette.json";
import "../AdminPanel/style.css";

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
    <div className="admin-page">
      <HeaderNew />
      <ThemeProvider theme={darkTheme}>
        <div className="register-wrapter">
          <div className="register-block">
          <div className="title">
            <h2>Форма Регистрации</h2>
            </div>
            <div className="register-items">
            <div className="colomn1">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Имя пользователя"
              value={formData.username}
              onChange={handleInputChange}
              className="input-field"
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Почта"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleInputChange}
              className="input-field"
              required
            />
            <input
              type="text"
              id="reason"
              name="access"
              placeholder="Причина доступа"
              value={formData.access}
              onChange={handleInputChange}
              className="input-field"
              required
            />
            </div>
            <div className="colomn2">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Имя"
              value={formData.firstName}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Фамилия"
              value={formData.lastName}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Адрес"
              value={formData.address}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Номер телефона"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="input-field"
            />
            </div>
            <button className="button" onClick={handleRegistration}>
              Register
            </button>
          </div>
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
          </div>
          </div>
      </ThemeProvider>
    </div>
  );
};

export default AdminPanel;
