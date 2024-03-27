import React, { useState } from "react";
import "../DataInputPage/DataInput.css";
import Header from "../Header/Header";
import colors from "../../themes/palette.json";
import { useNavigate } from "react-router-dom"; // Update import
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

function createData(name, surname, patronymic, inn, reqDate, reqTime) {
  return { name, surname, patronymic, inn, reqDate, reqTime };
}

const rows = [
  createData(
    "Темирлан",
    "Есенулы",
    "Гемор",
    "042025551504",
    "08.02.2024",
    "13:11"
  ),
  createData("Маку", "Макауя", "Темор", "042025551504", "08.02.2024", "13:11"),
  createData("Фаркат", "Сагат", "Темор", "042025551504", "08.02.2024", "13:11"),
  createData(
    "Дамир",
    "Бегунов",
    "Темор",
    "042025551504",
    "08.02.2024",
    "13:11"
  ),
  createData(
    "Жандос",
    "Арбашов",
    "Темор",
    "042025551504",
    "08.02.2024",
    "13:11"
  ),
];

const DataInputPage = () => {
  const [inputType, setInputType] = useState("WhomThisUserViewed");
  const [source, setSource] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [inn, setInn] = useState("");
  const [value, setValue] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSourceChange = (event) => {
    setSource(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handlePatronymicChange = (event) => {
    setPatronymic(event.target.value);
  };

  const handleInnChange = (event) => {
    setInn(event.target.value);
  };
  const handleButtonClick = (type) => {
    
    setInputType(type); 
    console.log("Input Type:", type);
    
  };
  const handleReturnButtonClick = () => {
   
    navigate("/data-input"); 
  };

  return (
    <div className="data-input-page">
      <Header />
      <Container sx={{ color: "white", width: "1400px", paddingTop: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "left",
            minHeight: "100vh",
            bgcolor: "#0D0F11",
            p: 2,
            borderRadius: "10px",
          }}
          noValidate
          autoComplete="off"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              marginBottom: 2,
            }}
          >
            {/* Two new buttons added */}
            <Button
              variant="contained"
              style={{
                fontSize: "14px",
                fontFamily: "Montserrat, sans-serif",
                padding: "2px 4px",
                backgroundColor:
                  inputType === "WhomThisUserViewed"
                    ? colors.secondary
                    : colors.primary,
              }}
              onClick={() => handleButtonClick("WhomThisUserViewed")}
            >
              Кого просматривал данный пользователь
            </Button>
            <Button
              variant="contained"
              style={{
                fontSize: "14px",
                fontFamily: "Montserrat, sans-serif",
                padding: "2px 4px",
                backgroundColor:
                  inputType === "WhoViewedThisUser"
                    ? colors.secondary
                    : colors.primary,
              }}
              onClick={() => handleButtonClick("WhoViewedThisUser")}
            >
              Кто просматривал данного пользователя
            </Button>
            {/* ... Rest of your existing buttons */}
          </Box>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: 1000,
              mt: 4,
              bgcolor: "transparent",
              boxShadow: "none",
              color: "#fff",
            }}
          >
            <Typography
              variant="subtitle1"
              color="inherit"
              noWrap
              sx={{
                marginRight: 1,
                fontSize: "1.5rem",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "600",
              }}
            >
              Запросы пользователя: Тамерлан Есенулы
            </Typography>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontSize: "12px",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#fff",
                    }}
                  >
                    №
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: "12px",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#fff",
                    }}
                  >
                    Имя
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: "12px",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#fff",
                    }}
                  >
                    {" "}
                    Фамилия
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: "12px",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#fff",
                    }}
                  >
                    Отчество
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: "12px",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#fff",
                    }}
                  >
                    ИНН
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: "12px",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#fff",
                    }}
                  >
                    Дата Запроса
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: "12px",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#fff",
                    }}
                  >
                    Время
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "#fff" }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "12px",
                        fontFamily: "Montserrat, sans-serif",
                        color: "#fff",
                      }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "12px",
                        fontFamily: "Montserrat, sans-serif",
                        color: "#fff",
                      }}
                    >
                      {row.surname}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "12px",
                        fontFamily: "Montserrat, sans-serif",
                        color: "#fff",
                      }}
                    >
                      {row.patronymic}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "12px",
                        fontFamily: "Montserrat, sans-serif",
                        color: "#fff",
                      }}
                    >
                      {row.inn}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "12px",
                        fontFamily: "Montserrat, sans-serif",
                        color: "#fff",
                      }}
                    >
                      {row.reqDate}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "12px",
                        fontFamily: "Montserrat, sans-serif",
                        color: "#fff",
                      }}
                    >
                      {row.reqTime}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: 2,
        }}
      >
        <Button
          variant="contained"
          style={{
            fontSize: "14px",
            fontFamily: "Montserrat, sans-serif",
            padding: "2px 4px",
            backgroundColor: colors.secondary,
          }}
          onClick={handleReturnButtonClick}
        >
          <ArrowBackIcon />
        </Button>
      </Box>
        </Box>
      </Container>
    </div>
  );
};

export default DataInputPage;
