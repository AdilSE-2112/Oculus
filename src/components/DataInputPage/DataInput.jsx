import React, { useState } from "react";
import "../DataInputPage/DataInput.css";
import Header from "../Header/Header";
import colors from "../../themes/palette.json";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Menu from "@mui/material/Menu";
import { MenuItem as MuiMenuItem } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Loading from "../../assets/loading.gif";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
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
  TablePagination,
} from "@mui/material";

function createData(
  id,
  date,
  username,
  request_body,
  limit_,
  time,
  message,
  action,
  fname,
  lname,
  user_name
) {
  const formattedDate = new Date(date).toLocaleString();
  return {
    date: formattedDate,
    username,
    request_body,
    limit_,
    time,
    message,
    action,
    fname,
    lname,
    user_name,
  };
}

const DataInputPage = () => {
  const [downloadLoading, setDownloadLoading] = useState(false);  // Add this line

  const [loggedInUser, setLoggedInUser] = useState(""); // Set the logged-in username

  const defaultColumnHeaders = [
    { id: "id", label: "ID" },
    { id: "date", label: "Дата" },
    { id: "username", label: "Пользователь" },
    { id: "request_body", label: "Запрос" },
  ];

  const defaultRow = createData(
    0,
    "Пусто", // Replace with an actual date
    "Пусто",
    "Пусто",
    "Пусто",
    "Пусто",
    "Пусто",
    "Пусто",
    "Пусто",
    "Пусто",
    "Пусто"
  );

  const [loading, setLoading] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const history = useHistory();
  const [usernameField, setUsernameField] = useState("");
  const [columnHeaders, setColumnHeaders] = useState(defaultColumnHeaders);
  const [inputType, setInputType] = useState("IIN");
  const [source, setSource] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [inn, setInn] = useState("");
  const [value, setValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [action, setAction] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [downloadAvailable, setDownloadAvailable] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event) => {
    setSource(event.target.value);
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
  const handleError = (message) => {
    setErrorMessage(message);
    setErrorOpen(true);
  };
  const handleInnChange = (event) => {
    setInn(event.target.value);
  };
  const handleUsernameFieldChange = (event) => {
    setUsernameField(event.target.value);
  };
  const handleButtonClick = (type, rowData) => {
    setInputType(type);
    console.log("Input Type:", type);

    if (rowData) {
      history.push({
        pathname: "/data-output",
        state: { rowData: rowData },
      });
    }
  };
  const handleLogin = (username) => {
    // Perform your login logic here
    // After successful login, set the username in the state
    setLoggedInUser(username);
  };

  const [rows, setRows] = useState([defaultRow]);

  const handleSearch = () => {
    setLoading(true);
    let apiUrl = "";
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      // Handle the case where the token is not available (user not logged in)
      handleError("User not logged in");
      setLoading(false);
      return;
    }
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    console.log("Source:", source);
    console.log("Input Type:", inputType);
    if (source === "Itap" && inputType === "Username") {
      apiUrl = `http://127.0.0.1:8000/log/${usernameField}`;
      setColumnHeaders([
        { id: "id", label: "ID" },
        { id: "date", label: "Дата" },
        { id: "username", label: "Пользователь" },
        { id: "request_body", label: "Запрос" },
        { id: "limit_", label: "Лимит" },
      ]);
    } else if (source === "Досье" && inputType === "Username") {
      apiUrl = `http://127.0.0.1:8000/dossie_log/search/?action=${usernameField}`;
      // Add the additional fields for "Досье"
      setColumnHeaders([
        { id: "action", label: "Action" },
        { id: "fname", label: "First Name" },
        { id: "lname", label: "Last Name" },
        { id: "user_name", label: "Username" },
      ]);
    } else if (source === "Cascade" && inputType === "Username") {
      apiUrl = `http://127.0.0.1:8000/users_log/${usernameField}`;
      setColumnHeaders([
        { id: "time", label: "Время" },
        { id: "username", label: "Пользователь" },
        { id: "message", label: "Сообщение" },
      ]);
    } else if (source === "Досье" && inputType === "IIN") {
      apiUrl = `http://127.0.0.1:8000/dossie_log/search/?action=${inn}`;
      setColumnHeaders([
        { id: "action", label: "Action" },
        { id: "fname", label: "First Name" },
        { id: "lname", label: "Last Name" },
        { id: "user_name", label: "Username" },
      ]);
    } else if (source === "Itap" && inputType === "FullName") {
      // Construct the URL dynamically for the combination of "Full Name" and "Itap"
      apiUrl = `http://127.0.0.1:8000/log/fullname=${name}`;
      setColumnHeaders([
        { id: "id", label: "ID" },
        { id: "date", label: "Дата" },
        { id: "username", label: "Пользователь" },
        { id: "request_body", label: "Запрос" },
        { id: "limit_", label: "Лимит" },
      ]);
    }

    if (apiUrl === "") {
      handleError("Данная функция не доступна на данный момент");
      setLoading(false);
      return;
    }

    console.log("API URL:", apiUrl);

    Axios.get(apiUrl, { headers })
      .then((response) => {
        const searchData = response.data;

        if (!Array.isArray(searchData)) {
          console.error("Invalid response data:", searchData);
          return;
        }

        // Update the rows state with the retrieved data
        setRows(
          (searchData || []).map((data, index) =>
            createData(
              data.id,
              data.date,
              data.username,
              data.request_body,
              data.limit_,
              data.time,
              data.message,
              data.action,
              data.fname,
              data.lname,
              data.user_name
            )
          )
        );
        setDownloadAvailable(searchData.length > 0);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 404) {
          // Handle the 404 error by displaying a specific error message
          handleError(
            "Данные не найдены. Пожалуйста, проверьте введенные данные и повторите попытку."
          );
        } else {
          // Handle other errors
          handleError("При извлечении данных произошла ошибка.");
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false when data retrieval is complete
      });
  };

  const handleDownload = () => {
    setDownloadLoading(true);
    const accessToken = localStorage.getItem("access_token");

    // Replace this URL with the actual endpoint for file download
    let downloadUrl;

    if (inputType === 'IIN' && source === 'Itap') {
      downloadUrl = `http://127.0.0.1:8000/log/iin=${inn}/download_excel`;
    } else if (inputType === 'Username' && source === 'Itap') {
      downloadUrl = `http://127.0.0.1:8000/log/username=${usernameField}/download_excel`;
    } else if (inputType === 'FullName' && source === 'Itap') {
      downloadUrl = `http://127.0.0.1:8000/log/fullname=${name}/download_excel`;
    }
    console.log("DOWNLOAD URL:",downloadUrl);
    // Assuming you have logic to download the file using Axios or fetch
    Axios.get(downloadUrl, { responseType: 'blob' })
      .then((response) => {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `downloaded_file.${getExtension(response.headers['content-type'])}`;
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        // Handle download error
      })
      .finally(() => {
        setDownloadLoading(false);
      });
  };

  const getExtension = (contentType) => {
    // Replace this with your logic to determine the file extension based on content type
    // Example: Assuming content type is 'application/pdf', return 'pdf'
    return contentType.split('/')[1];
  };

  const renderInputFields = () => {
    switch (inputType) {
      case "IIN":
        return (
          <ThemeProvider theme={darkTheme}>
            <TextField
              required
              id="outlined-required"
              label="ИНН"
              defaultValue=""
              margin="normal"
              variant="outlined"
              value={inn}
              onChange={handleInnChange}
              InputLabelProps={{
                style: {
                  fontFamily: "Montserrat, sans-serif",
                  color: "#fff",
                  fontSize: "12px",
                },
              }}
              InputProps={{
                style: {
                  color: "#fff",
                  fontSize: "14px",
                  height: "45px",
                  width: "300px",
                  "&:hover": {
                    "& fieldset": {
                      borderColor: "#fff !important",
                    },
                  },
                  "& .Mui-focused": {
                    "& fieldset": {
                      borderColor: "#fff !important",
                    },
                  },
                  "& fieldset": {
                    borderColor: "#fff !important",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "#fff",
                  fontSize: "14px",
                },
              }}
            />
          </ThemeProvider>
        );
      case "Username":
        return (
          <ThemeProvider theme={darkTheme}>
            <TextField
              required
              id="outlined-username"
              label="Username"
              defaultValue=""
              margin="normal"
              variant="outlined"
              value={usernameField}
              onChange={handleUsernameFieldChange}
              InputLabelProps={{
                style: {
                  fontFamily: "Montserrat, sans-serif",
                  color: "#fff",
                  fontSize: "14px",
                },
              }}
              InputProps={{
                style: { color: "#fff", height: "45px", width: "300px" },
                notchedOutline: {
                  borderColor: colors.borderColor,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "#fff",
                  fontSize: "14px",
                },
              }}
            />
          </ThemeProvider>
        );

      case "FullName":
        return (
          <ThemeProvider theme={darkTheme}>
            <>
              <TextField
                required
                id="outlined-firstname"
                label="ФИО"
                defaultValue=""
                margin="normal"
                variant="outlined"
                value={name}
                onChange={handleNameChange}
                InputLabelProps={{
                  style: {
                    fontFamily: "Montserrat, sans-serif",
                    color: "#fff",
                    fontSize: "14px",
                  },
                }}
                InputProps={{
                  style: { color: "#fff", height: "45px", width: "300px" },
                  notchedOutline: {
                    borderColor: colors.borderColor,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#fff",
                    fontSize: "14px",
                  },
                }}
              />
            </>
          </ThemeProvider>
        );
      default:
        return null;
    }
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
          {/* Buttons for selecting input type */}
          <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
            <Button
              variant="contained"
              style={{
                fontSize: "12px",
                fontFamily: "Montserrat, sans-serif",
                padding: "2px 4px",
                backgroundColor:
                  inputType === "IIN" ? colors.secondary : colors.primary,
              }} // Change color to secondary if selected
              onClick={() => {
                setValue("IIN");
                handleButtonClick("IIN");
              }}
            >
              ИНН
            </Button>
            <Button
              variant="contained"
              style={{
                fontSize: "12px",
                fontFamily: "Montserrat, sans-serif",
                padding: "2px 4px",

                backgroundColor:
                  inputType === "Username" ? colors.secondary : colors.primary,
              }} // Change color to secondary if selected
              onClick={() => {
                setValue("Username");
                handleButtonClick("Username");
              }}
            >
              Username
            </Button>
            <Button
              variant="contained"
              style={{
                fontSize: "12px",
                fontFamily: "Montserrat, sans-serif",
                padding: "2px 4px",

                backgroundColor:
                  inputType === "FullName" ? colors.secondary : colors.primary,
              }} // Change color to secondary if selected
              onClick={() => {
                setValue("FullName");
                handleButtonClick("FullName");
              }}
            >
              ФИО
            </Button>
          </Box>

          {/* Dynamic Input Fields */}
          {renderInputFields()}
          <ThemeProvider theme={darkTheme}>
            <InputLabel
              id="demo-simple-select-outlined-label"
              sx={{
                fontSize: "14px",
                fontFamily: "Montserrat, sans-serif",
                color: "#fff",
                height: "40px",
                width: "150px",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Источник
            </InputLabel>
          </ThemeProvider>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="outlined-source"
            value={source}
            onChange={handleChange}
            label="Источник"
            sx={{
              fontSize: "14px",
              fontFamily: "Montserrat, sans-serif",
              color: "#fff",
              height: "45px",
              width: "300px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff !important",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff !important",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff !important",
              },
              "& .MuiSelect-icon": {
                color: "#fff !important",
              },
            }}
          >
            <MenuItem value="Itap">Itap</MenuItem>
            <MenuItem value="Досье">Досье</MenuItem>
            <MenuItem value="Cascade">Cascade</MenuItem>
          </Select>
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{
          mt: 2,
          alignSelf: "flex-start",
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.75rem",
          padding: loading ? "6px 30px 6px 12px" : "6px 12px",
          backgroundColor: colors.secondary,
          position: "relative",
          overflow: "hidden",
        }}
      >
        Поиск
        {loading && (
          <div
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-38%)",
            }}
          >
            <img
              src={Loading}
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
          </div>
        )}
      </Button>
      {/* Conditionally render the download button */}
      {downloadAvailable && (
        <React.Fragment>
          <Button
            variant="contained"
            onClick={handleDownload}
            sx={{
              mt: 2,
              alignSelf: "flex-start",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.75rem",
              padding: downloadLoading ? "6px 30px 6px 12px" : "6px 12px",
              backgroundColor: colors.secondary,
              position: "relative",
              overflow: "hidden",
            }}
          >
            Скачать результаты
            {downloadLoading && (
              <div
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-38%)",
                }}
              >
                <img
                  src={Loading}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
            )}
          </Button>
        </React.Fragment>
      )}
    </Box>
          <Snackbar
            open={errorOpen}
            autoHideDuration={6000}
            onClose={() => setErrorOpen(false)}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={() => setErrorOpen(false)}
              severity="error"
            >
              {errorMessage}
            </MuiAlert>
          </Snackbar>
          <TableContainer
            component={Paper}
            sx={{
              width: "100%", // Set width to 100%
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
                fontSize: "1.75rem",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "600",
              }}
            >
              {rows.length > 1 ? (
                <>
                  Результаты запросов пользователя:{" "}
                  {source === "Досье" ? rows[0].user_name : rows[0].username}
                </>
              ) : (
                "Сделайте запрос чтобы увидеть данные"
              )}
            </Typography>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columnHeaders
                    .filter((header) => source !== "Itap" || header.id !== "id")
                    .map((header) => (
                      <TableCell
                        key={header.id}
                        sx={{
                          fontSize: "12px",
                          fontFamily: "Montserrat, sans-serif",
                          color: "#fff",
                          whiteSpace: "nowrap",
                          overflow: "hidden", // Add overflow property
                          textOverflow: "ellipsis", // Add textOverflow property
                        }}
                      >
                        {header.label}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {columnHeaders
                      .filter(
                        (header) => source !== "Itap" || header.id !== "id"
                      )
                      .map((header) => (
                        <TableCell
                          key={header.id}
                          align="left"
                          sx={{
                            fontSize: "12px",
                            fontFamily: "Montserrat, sans-serif",
                            color: "#fff",
                          }}
                        >
                          {row[header.id]}
                        </TableCell>
                      ))}
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "12px",
                        fontFamily: "Montserrat, sans-serif",
                        color: "#fff",
                      }}
                    ></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <ThemeProvider theme={darkTheme}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Количество строк на странице"
                SelectProps={{
                  style: {
                    fontSize: "14px",
                    color: "#fff",
                  },
                  native: true,
                  sx: {
                    "&:focus": {
                      backgroundColor: "transparent",
                    },
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: "14px",
                    color: "#fff",
                  },
                  sx: {
                    "&.MuiInputLabel-root": {
                      marginTop: "-4px",
                    },
                  },
                }}
                sx={{
                  color: "#fff",
                  "& .MuiTablePagination-caption": {
                    fontSize: "14px",
                  },
                  "& .MuiIconButton-root": {
                    color: "#fff",
                  },
                  "& .MuiIconButton-root.Mui-disabled": {
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                  "& .MuiMenu-root": {
                    backgroundColor: "#2B2D2F",
                  },
                  "& .MuiMenuItem-root": {
                    color: "#fff",
                  },
                }}
                components={{
                  Menu: (props) => (
                    <Menu
                      elevation={0}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      {...props}
                    />
                  ),
                  MenuItem: (props) => <MuiMenuItem {...props} />,
                }}
              />
            </ThemeProvider>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
};

export default DataInputPage;
