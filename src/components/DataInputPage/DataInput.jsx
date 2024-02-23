import React, { useState, useEffect } from "react";
import "../DataInputPage/DataInput.css";
import Header from "../Header/Header";
import colors from "../../themes/palette.json";
import { useNavigate } from "react-router-dom";
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
  date,
  username,
  request_body,
  limit_,
  time,
  message,
  action,
  fname,
  lname,
  user_name,
  log_time
) {
  const formattedDate = new Date(date).toLocaleString();
  const formattedDossieTime = new Date(log_time).toLocaleString();
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
    log_time: formattedDossieTime,
  };
}

const DataInputPage = () => {
  const [downloadLoading, setDownloadLoading] = useState(false); // Add this line

  const [loggedInUser, setLoggedInUser] = useState(""); // Set the logged-in username

  const defaultColumnHeaders = [
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
  const navigate = useNavigate();
  const [usernameField, setUsernameField] = useState("");
  const [columnHeaders, setColumnHeaders] = useState(defaultColumnHeaders);
  const [infoType, setInfoType] = useState("WhomThisUserViewed");
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
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [fullName, setFullName] = useState("");
  // State variables to track initial values
  const [initialInfoType, setInitialInfoType] = useState("");
  const [initialInputType, setInitialInputType] = useState("");
  const [initialSource, setInitialSource] = useState("");

  // State variable to track if filter has changed
  const [isFilterChanged, setIsFilterChanged] = useState(false);

  useEffect(() => {
    // Set initial values when component mounts
    setInitialInfoType(infoType);
    setInitialInputType(inputType);
    setInitialSource(source);
  }, [infoType, inputType, source]);

  const handleSubmit = () => {
    // Check if source is selected
    if (!source) {
      setErrorMessage("Please choose a source");
      return;
    }

    // ... (your existing handleSubmit logic)
  };

  const handleNameChangeF = (e) => {
    setFullName(e.target.value);
  };

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
  const handleInnChange = (e) => {
    // Remove non-digit characters
    const cleanedInput = e.target.value.replace(/\D/g, "");

    // Limit the input to 12 characters
    const truncatedInput = cleanedInput.slice(0, 12);

    // Update the state variable
    setInn(truncatedInput);

    // Check if the input has exactly 12 digits
  };

  const count = value.length;
  const handleUsernameFieldChange = (event) => {
    setUsernameField(event.target.value);
  };
  const handleButtonClick = (type, rowData) => {
    if (type === "WhomThisUserViewed" || type === "WhoViewedThisUser") {
      // For the first set of buttons
      setInfoType(type);
    } else if (type === "IIN" || type === "Username" || type === "FullName") {
      // For the second set of buttons
      setInputType(type);
    }

    console.log("Type:", type);

    if (rowData) {
      navigate("/data-output", { state: { rowData: rowData } });
    }
  };
  const handleLogin = (username) => {
    // Perform your login logic here
    // After successful login, set the username in the state
    setLoggedInUser(username);
  };

  const [rows, setRows] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    if (
      initialInfoType !== infoType ||
      initialInputType !== inputType ||
      initialSource !== source
    ) {
      setIsFilterChanged(true);
    } else {
      setIsFilterChanged(false);
    }

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
    console.log("Info Type", infoType);
    if (infoType === "WhomThisUserViewed") {
      if (source === "Itap" && inputType === "Username") {
        apiUrl = `http://192.168.30.24:3220/log/username=${usernameField}`;
        setColumnHeaders([
          { id: "date", label: "Дата" },
          { id: "username", label: "Пользователь" },
          { id: "request_body", label: "Запрос" },
          { id: "limit_", label: "Лимит" },
        ]);
      } else if (source === "Досье" && inputType === "Username") {
        apiUrl = `http://192.168.30.24:3220/dossie_log/username=${usernameField}`;
        // Add the additional fields for "Досье"
        setColumnHeaders([
          { id: "action", label: "Запрос" },
          { id: "fname", label: "Имя" },
          { id: "lname", label: "Фамилия" },
          { id: "user_name", label: "Имя Пользователя" },
          { id: "log_time", label: "Время" },
        ]);
      } else if (source === "Cascade" && inputType === "FullName") {
        apiUrl = `http://192.168.30.24:3220/users_log/fullname=${name}`;
        setColumnHeaders([
          { id: "time", label: "Время" },
          { id: "username", label: "Пользователь" },
          { id: "message", label: "Сообщение" },
        ]);
      } else if (source === "Cascade" && inputType === "Username") {
        apiUrl = `http://192.168.30.24:3220/users_log/username=${usernameField}`;
        setColumnHeaders([
          { id: "time", label: "Время" },
          { id: "username", label: "Пользователь" },
          { id: "message", label: "Запрос" },
        ]);
      } else if (source === "Досье" && inputType === "IIN") {
        apiUrl = `http://192.168.30.24:3220/dossie_log/username=${inn}`;
        setColumnHeaders([
          { id: "action", label: "Запрос" },
          { id: "fname", label: "Имя" },
          { id: "lname", label: "Фамилия" },
          { id: "user_name", label: "Имя пользователя" },
          { id: "log_time", label: "Время" },
        ]);
      } else if (source === "Досье" && inputType === "FullName") {
        apiUrl = `http://192.168.30.24:3220/dossie_log/fullname=${name}`;
        setColumnHeaders([
          { id: "action", label: "Запрос" },
          { id: "fname", label: "Имя" },
          { id: "lname", label: "Фамилия" },
          { id: "user_name", label: "Имя пользователя" },
          { id: "log_time", label: "Время" },
        ]);
      } else if (source === "Itap" && inputType === "FullName") {
        // Construct the URL dynamically for the combination of "Full Name" and "Itap"
        apiUrl = `http://192.168.30.24:3220/log/fullname=${name}`;
        setColumnHeaders([
          { id: "date", label: "Дата" },
          { id: "username", label: "Пользователь" },
          { id: "request_body", label: "Запрос" },
          { id: "limit_", label: "Лимит" },
        ]);
      }
    } else if (infoType === "WhoViewedThisUser") {
      if (source === "Досье" && inputType === "IIN") {
        apiUrl = `http://192.168.30.24:3220/dossie_log/action=${inn}`;
        setColumnHeaders([
          { id: "action", label: "Запрос" },
          { id: "fname", label: "Имя" },
          { id: "lname", label: "Фамилия" },
          { id: "user_name", label: "Имя Полььзователя" },
          { id: "log_time", label: "Время" },
        ]);
      } else if (source === "Itap" && inputType === "FullName") {
        apiUrl = `http://192.168.30.24:3220/log/search=${name}`;
        setColumnHeaders([
          { id: "date", label: "Дата" },
          { id: "username", label: "Пользователь" },
          { id: "request_body", label: "Запрос" },
          { id: "limit_", label: "Лимит" },
        ]);
      } else if (source === "Itap" && inputType === "IIN") {
        apiUrl = `http://192.168.30.24:3220/log/search=${inn}`;
        setColumnHeaders([
          { id: "date", label: "Дата" },
          { id: "username", label: "Пользователь" },
          { id: "request_body", label: "Запрос" },
          { id: "limit_", label: "Лимит" },
        ]);
      } else if (source === "Cascade" && inputType === "IIN") {
        apiUrl = `http://192.168.30.24:3220/users_log/message=${inn}`;
        setColumnHeaders([
          { id: "time", label: "Время" },
          { id: "username", label: "Пользователь" },
          { id: "message", label: "Запрос" },
        ]);
      } else if (source === "Досье" && inputType === "FullName") {
        apiUrl = "http://192.168.30.24:3220/dossie_log/";

        if (inputType === "FullName") {
          apiUrl += "fio/?";

          if (lastName) apiUrl += `lname=${lastName}&`;
          if (firstName) apiUrl += `fname=${firstName}&`;
          if (middleName) apiUrl += `mname=${middleName}&`;
        }

        // Remove the trailing "&" if there are parameters
        apiUrl = apiUrl.slice(0, -1);

        setColumnHeaders([
          { id: "action", label: "Запрос" },
          { id: "fname", label: "Имя" },
          { id: "lname", label: "Фамилия" },
          { id: "user_name", label: "Имя пользователя" },
          { id: "log_time", label: "Время" },
        ]);
      } else if (source === "Cascade" && inputType === "FullName") {
        apiUrl = `http://192.168.30.24:3220/users_log/message=${name}`;
        setColumnHeaders([
          { id: "time", label: "Время" },
          { id: "username", label: "Пользователь" },
          { id: "message", label: "Запрос" },
        ]);
      }
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
              data.date,
              data.username,
              data.request_body,
              data.limit_,
              data.time,
              data.message,
              data.action,
              data.fname,
              data.lname,
              data.user_name,
              data.log_time
            )
          )
        );
        setDownloadAvailable(searchData.length > 0);
        setPage(0);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 404) {
          // Handle the 404 error by displaying a specific error message
          handleError(
            "Данные не найдены. Пожалуйста, проверьте введенные данные и повторите попытку."
          );
          setRows([]);
        } else {
          // Handle other errors
          handleError("При извлечении данных произошла ошибка.");
          setRows([]);
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false when data retrieval is complete
      });
  };

  const handleDownload = () => {
    setDownloadLoading(true);
    const accessToken = localStorage.getItem("access_token");
    console.log("Access Token:", accessToken);

    // Replace this URL with the actual endpoint for file download
    let downloadUrl;
    if (infoType === "WhomThisUserViewed") {
      if (inputType === "IIN" && source === "Itap") {
        downloadUrl = `http://192.168.30.24:3220/log/iin=${inn}/download_excel`;
      } else if (inputType === "Username" && source === "Itap") {
        downloadUrl = `http://192.168.30.24:3220/log/username=${usernameField}/download_excel`;
      } else if (inputType === "FullName" && source === "Itap") {
        downloadUrl = `http://192.168.30.24:3220/log/fullname=${name}/download_excel`;
      } else if (inputType === "Username" && source === "Cascade") {
        downloadUrl = `http://192.168.30.24:3220/user_log/username=${usernameField}/download_excel`;
      } else if (inputType === "FullName" && source === "Cascade") {
        downloadUrl = `http://192.168.30.24:3220/user_log/fullname=${name}/download_excel`;
      } else if (inputType === "Username" && source === "Досье") {
        downloadUrl = `http://192.168.30.24:3220/dossie_log/username=${usernameField}/download`;
      } else if (inputType === "IIN" && source === "Досье") {
        downloadUrl = `http://192.168.30.24:3220/dossie_log/username=${inn}/download`;
      } else if (inputType === "FullName" && source === "Досье") {
        downloadUrl = `http://192.168.30.24:3220/dossie_log/fullname=${name}/download`;
      }
    } else if (infoType === "WhoViewedThisUser") {
      if (inputType === "IIN" && source === "Itap") {
        downloadUrl = `http://192.168.30.24:3220/log/search=${inn}/download_excel`;
      } else if (inputType === "FullName" && source === "Itap") {
        downloadUrl = `http://192.168.30.24:3220/log/search=${name}/download_excel`;
      } else if (inputType === "IIN" && source === "Досье") {
        downloadUrl = `http://192.168.30.24:3220/dossie_log/action=${inn}/download`;
      }
      // else if (inputType === "FullName" && source === "Досье") {
      //   downloadUrl = `http://192.168.30.24:3220/dossie_log/action=${name}/download`;
      // }
      else if (inputType === "FullName" && source === "Досье") {
        downloadUrl = "http://192.168.30.24:3220/dossie_log/download/";

        if (inputType === "FullName") {
          downloadUrl += "fio/?";

          if (lastName) downloadUrl += `lname=${lastName}&`;
          if (firstName) downloadUrl += `fname=${firstName}&`;
          if (middleName) downloadUrl += `mname=${middleName}&`;
        }
        downloadUrl = downloadUrl.slice(0, -1);
      } else if (inputType === "FullName" && source === "Cascade") {
        downloadUrl = `http://192.168.30.24:3220/user_log/message=${name}/download_excel`;
      } else if (inputType === "IIN" && source === "Cascade") {
        downloadUrl = `http://192.168.30.24:3220/user_log/message=${inn}/download_excel`;
      }
    }
    console.log("DOWNLOAD URL:", downloadUrl);

    // Assuming you have logic to download the file using Axios or fetch
    Axios.get(downloadUrl, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `downloaded_file.xlsx`;
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
    return contentType.split("/")[1];
  };

  const renderInputFields = () => {
    switch (inputType) {
      case "IIN":
        return (
          <ThemeProvider theme={darkTheme}>
            <Box display="flex" alignItems="center">
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
              <div
                style={{
                  color: "#fff",
                  fontSize: "12px",
                  marginLeft: "10px",
                  marginTop: "5px",
                }}
              >
                {inn.length}/12
              </div>
            </Box>
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
              {infoType === "WhoViewedThisUser" ? (
                <>
                  <TextField
                    required
                    id="outlined-lastname"
                    label="Фамилия"
                    defaultValue=""
                    margin="normal"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value.trim())}
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
                  <TextField
                    required
                    id="outlined-firstname"
                    label="Имя"
                    defaultValue=""
                    margin="normal"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value.trim())}
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
                  <TextField
                    required
                    id="outlined-middlename"
                    label="Отчество"
                    defaultValue=""
                    margin="normal"
                    variant="outlined"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value.trim())}
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
              ) : (
                <TextField
                  required
                  id="outlined-fullname"
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
              )}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              gap: 2,
              marginBottom: 2,
            }}
          >
            {/* Two new buttons added */}
            <Button
              variant="contained"
              style={{
                fontSize: "12px",
                fontFamily: "Montserrat, sans-serif",
                padding: "2px 4px",
                backgroundColor:
                  infoType === "WhomThisUserViewed"
                    ? colors.secondary
                    : colors.primary,
              }}
              onClick={() => {
                setInfoType("WhomThisUserViewed");
                handleButtonClick("WhomThisUserViewed");
              }}
            >
              Кого просматривал данный пользователь
            </Button>

            <Button
              variant="contained"
              style={{
                fontSize: "12px",
                fontFamily: "Montserrat, sans-serif",
                padding: "2px 4px",
                backgroundColor:
                  infoType === "WhoViewedThisUser"
                    ? colors.secondary
                    : colors.primary,
              }}
              onClick={() => {
                setInfoType("WhoViewedThisUser");
                handleButtonClick("WhoViewedThisUser");
              }}
            >
              Кто просматривал данный объекта
            </Button>
            {/* ... Rest of your existing buttons */}
          </Box>
          {/* Buttons for selecting input type */}
          <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
            {infoType === "WhomThisUserViewed" && (
              <>
                <Button
                  variant="contained"
                  style={{
                    fontSize: "12px",
                    fontFamily: "Montserrat, sans-serif",
                    padding: "2px 4px",
                    backgroundColor:
                      inputType === "IIN" ? colors.secondary : colors.primary,
                  }}
                  onClick={() => {
                    setInputType("IIN");
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
                      inputType === "Username"
                        ? colors.secondary
                        : colors.primary,
                  }}
                  onClick={() => {
                    setInputType("Username");
                    handleButtonClick("Username");
                  }}
                >
                  Имя Пользователя
                </Button>

                <Button
                  variant="contained"
                  style={{
                    fontSize: "12px",
                    fontFamily: "Montserrat, sans-serif",
                    padding: "2px 4px",
                    backgroundColor:
                      inputType === "FullName"
                        ? colors.secondary
                        : colors.primary,
                  }}
                  onClick={() => {
                    setInputType("FullName");
                    handleButtonClick("FullName");
                  }}
                >
                  ФИО
                </Button>
              </>
            )}
            {infoType === "WhoViewedThisUser" && (
              <>
                <Button
                  variant="contained"
                  style={{
                    fontSize: "12px",
                    fontFamily: "Montserrat, sans-serif",
                    padding: "2px 4px",
                    backgroundColor:
                      inputType === "IIN" ? colors.secondary : colors.primary,
                  }}
                  onClick={() => {
                    setInputType("IIN");
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
                      inputType === "FullName"
                        ? colors.secondary
                        : colors.primary,
                  }}
                  onClick={() => {
                    setInputType("FullName");
                    handleButtonClick("FullName");
                  }}
                >
                  ФИО
                </Button>
              </>
            )}
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
          {infoType === "WhomThisUserViewed" && (
            <>
              {inputType === "IIN" && (
                <>
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
                    <MenuItem value="Досье">Досье</MenuItem>
                  </Select>
                  {isFilterChanged && (
                    <Typography
                      variant="caption"
                      sx={{ color: "red", fontSize: "0.8rem", marginTop: 1 }}
                    >
                      Необходимо сделать новый запрос для обновления данных.
                    </Typography>
                  )}
                </>
              )}

              {inputType === "Username" && (
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
                  <MenuItem value="Cascade">Каскад</MenuItem>
                  {isFilterChanged && (
                    <Typography
                      variant="caption"
                      sx={{ color: "red", fontSize: "0.8rem", marginTop: 1 }}
                    >
                      Необходимо сделать новый запрос для обновления данных.
                    </Typography>
                  )}
                </Select>
              )}

              {inputType === "FullName" && (
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
                  <MenuItem value="Cascade">Каскад</MenuItem>
                  {isFilterChanged && (
                    <Typography
                      variant="caption"
                      sx={{ color: "red", fontSize: "0.8rem", marginTop: 1 }}
                    >
                      Необходимо сделать новый запрос для обновления данных.
                    </Typography>
                  )}
                </Select>
              )}
            </>
          )}

          {infoType === "WhoViewedThisUser" && (
            <>
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
                <MenuItem value="Cascade">Каскад</MenuItem>
              </Select>
              {isFilterChanged && (
                <Typography
                  variant="caption"
                  sx={{ color: "red", fontSize: "0.8rem", marginTop: 1 }}
                >
                  Необходимо сделать новый запрос для обновления данных.
                </Typography>
              )}
            </>
          )}

          <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
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
              {rows.length > 0 ? (
                <>
                  {infoType === "WhoViewedThisUser" && inputType === "IIN" && (
                    <>Кто просматривал объект: {inn}</>
                  )}
                  {infoType === "WhoViewedThisUser" &&
                    inputType === "FullName" && (
                      <>
                        Кто просматривал объект:{" "}
                        {`${lastName || ""} ${firstName || ""} ${middleName || ""}`}
                      </>
                    )}
                  {infoType === "WhoViewedThisUser" &&
                    inputType === "Username" && (
                      <>
                        Кто просматривал объект:{" "}
                        {source === "Досье"
                          ? rows[0].user_name
                          : rows[0].username}
                      </>
                    )}
                  {infoType !== "WhoViewedThisUser" && (
                    <>
                      Результаты запросов пользователя:{" "}
                      {source === "Досье"
                        ? rows[0].user_name
                        : rows[0].username}
                    </>
                  )}
                </>
              ) : (
                "Сделайте запрос, чтобы увидеть данные"
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
                  <TableCell align="right"> </TableCell>
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
                          {header.id === "request_body"
                            ? Array.isArray(row.request_body)
                              ? row.request_body.join(", ")
                              : ""
                            : row[header.id]}
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
