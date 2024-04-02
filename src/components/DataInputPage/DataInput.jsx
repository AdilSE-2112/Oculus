import React, { useState, useEffect } from "react";
import "../DataInputPage/DataInput.css";
import Header from "../Header/Header";
import colors from "../../themes/palette.json";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Loading from "../../assets/loading.gif";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CustomTablePagination from "../Pagination/CustomTablePagination";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import EventIcon from "@mui/icons-material/Event";

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
  IconButton,
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
  log_time,
  fio,
  iin
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
    fio,
    iin,
  };
}

const DataInputPage = () => {
  const [downloadLoading, setDownloadLoading] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState("");

  const defaultColumnHeaders = [
    { id: "date", label: "Дата" },
    { id: "username", label: "Пользователь" },
    { id: "request_body", label: "Запрос" },
  ];

  const defaultRow = createData(
    0,
    "Пусто",
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
  const [employeeField, setEmployeeField] = useState("");
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

  const [searchTypeLastName, setSearchTypeLastName] = useState("startingWith");
  const [searchTypeFirstName, setSearchTypeFirstName] =
    useState("startingWith");
  const [searchTypeMiddleName, setSearchTypeMiddleName] =
    useState("startingWith");
  const [searchTypeFullName, setSearchTypeFullName] = useState("startingWith");
  const [searchTypeUserName, setSearchTypeUserName] = useState("startingWith");
  const [searchTypeEmployee, setSearchTypeEmployee] = useState("startingWith");

  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [fullName, setFullName] = useState("");
  const [initialInfoType, setInitialInfoType] = useState("");
  const [initialInputType, setInitialInputType] = useState("");
  const [initialSource, setInitialSource] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(
    "Сделайте запрос, чтобы увидеть данные"
  );

  const [isFilterChanged, setIsFilterChanged] = useState(false);

  useEffect(() => {
    setInitialInfoType(infoType);
    setInitialInputType(inputType);
    setInitialSource(source);
  }, [infoType, inputType, source]);

  const handleSubmit = () => {
    if (!source) {
      setErrorMessage("Please choose a source");
      return;
    }
  };

  const handleNameChangeF = (e) => {
    setFullName(e.target.value);
  };
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
    setStartDate(null);
    setEndDate(null);
  };
  const handleChangePage = (newPage) => {
    console.log(newPage, typeof newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (_rowsPerPage) => {
    setRowsPerPage(_rowsPerPage);
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

  const handleEmployeeFieldChange = (event) => {
    setEmployeeField(event.target.value);
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
    setLoggedInUser(username);
  };

  const [rows, setRows] = useState([]);

  const handleSearch = async () => {
    setSearchClicked(true);
    console.log("Selected Start Date:", startDate);
    console.log("Selected End Date:", endDate);
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
        let additionalInfo;
        if (searchTypeUserName === "startingWith") {
          apiUrl = `http://192.168.30.24:5220/log/username_partial=${usernameField}`;
          additionalInfo = `Кого просматривал пользователь (начинается с): ${usernameField}`;
        } else if (searchTypeUserName === "exactly") {
          apiUrl = `http://192.168.30.24:5220/log/username=${usernameField}`;
          additionalInfo = `Кого просматривал пользователь (в точности): ${usernameField}`;
        }
        setAdditionalInfo(additionalInfo);

        setColumnHeaders([
          { id: "date", label: "Дата" },
          { id: "username", label: "Пользователь" },
          { id: "request_body", label: "Запрос" },
          { id: "limit_", label: "Лимит" },
        ]);
      } else if (source === "Досье" && inputType === "Username") {
        let additionalInfo;

        if (searchTypeUserName === "startingWith") {
          apiUrl = `http://192.168.30.24:5220/dossie_log/username_partial=${usernameField}`;
          additionalInfo = `Кого просматривал пользователь (начинается с): ${usernameField}`;
        } else if (searchTypeUserName === "exactly") {
          apiUrl = `http://192.168.30.24:5220/dossie_log/username=${usernameField}`;
          additionalInfo = `Кого просматривал пользователь (в точности): ${usernameField}`;
        }
        setAdditionalInfo(additionalInfo);

        setColumnHeaders([
          { id: "log_time", label: "Дата" },
          { id: "action", label: "Запрос" },
          { id: "fname", label: "Имя" },
          { id: "lname", label: "Фамилия" },
          { id: "user_name", label: "Учётная запись" },
        ]);
      } else if (source === "Cascade" && inputType === "FullName") {
        apiUrl = `http://192.168.30.24:5220/users_log/fullname=${name}`;
        setAdditionalInfo(`Кого просматривал сотрудник: ${name}`);

        setColumnHeaders([
          { id: "time", label: "Дата" },
          { id: "username", label: "Пользователь" },
          { id: "message", label: "Сообщение" },
        ]);
      } else if (source === "Cascade" && inputType === "Username") {
        let additionalInfo;

        if (searchTypeUserName === "startingWith") {
          apiUrl = `http://192.168.30.24:5220/users_log/username_partial=${usernameField}`;
          additionalInfo = `Кого просматривал пользователь (начинается с): ${usernameField}`;
        } else if (searchTypeUserName === "exactly") {
          apiUrl = `http://192.168.30.24:5220/users_log/username=${usernameField}`;
          additionalInfo = `Кого просматривал пользователь (в точности): ${usernameField}`;
        }
        setAdditionalInfo(additionalInfo);

        setColumnHeaders([
          { id: "time", label: "Дата" },
          { id: "username", label: "Пользователь" },
          { id: "message", label: "Запрос" },
        ]);
      } else if (source === "Досье" && inputType === "IIN") {
        apiUrl = `http://192.168.30.24:5220/dossie_log/username=${inn}`;
        setAdditionalInfo(`Кого просматривал пользователь с ИИН/БИН: ${inn}`);

        setColumnHeaders([
          { id: "log_time", label: "Дата" },
          { id: "action", label: "Запрос" },
          { id: "fname", label: "Имя" },
          { id: "lname", label: "Фамилия" },
          { id: "user_name", label: "Учётная запись" },
        ]);
      } else if (source === "Досье" && inputType === "FullName") {
        let additionalInfo;

        if (searchTypeFullName === "startingWith") {
          apiUrl = `http://192.168.30.24:5220/dossie_log/fullname=${name}`;
          additionalInfo = `Кого просматривал сотрудник (начинается с): ${name}`;
        } else if (searchTypeFullName === "exactly") {
          apiUrl = `http://192.168.30.24:5220/dossie_log/fullname_full=${name}`;
          additionalInfo = `Кого просматривал сотрудник (в точности): ${name}`;
        }
        setAdditionalInfo(additionalInfo);

        setColumnHeaders([
          { id: "log_time", label: "Дата" },
          { id: "action", label: "Запрос" },
          { id: "fname", label: "Имя" },
          { id: "lname", label: "Фамилия" },
          { id: "user_name", label: "Учётная запись" },
        ]);
      } else if (source === "Itap" && inputType === "FullName") {
        let additionalInfo;
        if (searchTypeFullName === "startingWith") {
          apiUrl = `http://192.168.30.24:5220/log/fullname=${name}`;
          additionalInfo = `Кого просматривал сотрудник (начинается с): ${name}`;
        } else if (searchTypeFullName === "exactly") {
          apiUrl = `http://192.168.30.24:5220/log/fullname_full=${name}`;
          additionalInfo = `Кого просматривал сотрудник (в точности): ${name}`;
        }
        setAdditionalInfo(additionalInfo);

        setColumnHeaders([
          { id: "date", label: "Дата" },
          { id: "username", label: "Пользователь" },
          { id: "request_body", label: "Запрос" },
          { id: "limit_", label: "Лимит" },
        ]);
      }
    } else if (infoType === "WhoViewedThisUser") {
      if (source === "Досье" && inputType === "IIN") {
        apiUrl = `http://192.168.30.24:5220/dossie_log/action=${inn}`;
        setAdditionalInfo(`Кто просматривал объект с ИИН/БИН: ${inn}`);

        setColumnHeaders([
          { id: "log_time", label: "Дата" },
          { id: "action", label: "Запрос" },
          { id: "fname", label: "Имя" },
          { id: "lname", label: "Фамилия" },
          { id: "user_name", label: "Имя Полььзователя" },
        ]);
      }
      // else if (source === "Itap" && inputType === "FullName") {
      //   apiUrl = `http://192.168.30.24:5220/log/search=${name}`;
      //   setAdditionalInfo(`Кто просматривал объект : ${name}`);

      //   setColumnHeaders([
      //     { id: "date", label: "Дата" },
      //     { id: "username", label: "Пользователь" },
      //     { id: "request_body", label: "Запрос" },
      //     { id: "limit_", label: "Лимит" },
      //   ]);
      // }
      else if (source === "Itap" && inputType === "IIN") {
        apiUrl = `http://192.168.30.24:5220/log/iin=${inn}`;
        setAdditionalInfo(`Кто просматривал объект с ИИН/БИН: ${inn}`);

        setColumnHeaders([
          { id: "date", label: "Дата" },
          { id: "username", label: "Пользователь" },
          { id: "request_body", label: "Запрос" },
          { id: "limit_", label: "Лимит" },
        ]);
      } else if (source === "Cascade" && inputType === "IIN") {
        apiUrl = `http://192.168.30.24:5220/users_log/message=${inn}`;
        setAdditionalInfo(`Кто просматривал объект с ИИН/БИН: ${inn}`);

        setColumnHeaders([
          { id: "time", label: "Дата" },
          { id: "username", label: "Пользователь" },
          { id: "message", label: "Запрос" },
        ]);
      } else if (source === "Досье" && inputType === "FullName") {
        apiUrl = "http://192.168.30.24:5220/dossie_log/";
        let fullNameInfo = "";

        if (lastName || firstName || middleName) {
          if (lastName) fullNameInfo += `${lastName} `;
          if (firstName) fullNameInfo += `${firstName} `;
          if (middleName) fullNameInfo += middleName;

          setAdditionalInfo(`Кто просматривал объект: ${fullNameInfo}`);
        }

        if (inputType === "FullName") {
          apiUrl += "fio/?";

          if (searchTypeLastName === "startingWith") {
            if (lastName) apiUrl += `lname=${lastName}&`;
          } else if (searchTypeLastName === "exactly") {
            if (lastName) apiUrl += `full_lname=${lastName}&`;
          }
          if (searchTypeFirstName === "startingWith") {
            if (firstName) apiUrl += `fname=${firstName}&`;
          } else if (searchTypeFirstName === "exactly") {
            if (firstName) apiUrl += `full_fname=${firstName}&`;
          }
          if (searchTypeMiddleName === "startingWith") {
            if (middleName) apiUrl += `mname=${middleName}&`;
          } else if (searchTypeMiddleName === "exactly") {
            if (middleName) apiUrl += `full_mname=${middleName}&`;
          }
        }

        apiUrl = apiUrl.slice(0, -1);

        setColumnHeaders([
          { id: "log_time", label: "Дата" },
          { id: "action", label: "Запрос" },
          { id: "fname", label: "Имя" },
          { id: "lname", label: "Фамилия" },
          { id: "user_name", label: "Учётная запись" },
        ]);
      } else if (source === "Itap" && inputType === "FullName") {
        apiUrl = "http://192.168.30.24:5220/log/search";
        let fullNameInfo = "";

        if (lastName || firstName || middleName) {
          if (lastName) fullNameInfo += `${lastName} `;
          if (firstName) fullNameInfo += `${firstName} `;
          if (middleName) fullNameInfo += middleName;

          setAdditionalInfo(`Кто просматривал объект: ${fullNameInfo}`);
        }

        if (inputType === "FullName") {
          apiUrl += "_fio/?";
          if (searchTypeLastName === "startingWith") {
            if (lastName) apiUrl += `lname=${lastName}&`;
          } else if (searchTypeLastName === "exactly") {
            if (lastName) apiUrl += `full_lname=${lastName}&`;
          }

          if (searchTypeFirstName === "startingWith") {
            if (firstName) apiUrl += `fname=${firstName}&`;
          } else if (searchTypeFirstName === "exactly") {
            if (firstName) apiUrl += `full_fname=${firstName}&`;
          }

          if (searchTypeMiddleName === "startingWith") {
            if (middleName) apiUrl += `mname=${middleName}&`;
          } else if (searchTypeMiddleName === "exactly") {
            if (middleName) apiUrl += `full_mname=${middleName}&`;
          }
        }

        apiUrl = apiUrl.slice(0, -1);

        setColumnHeaders([
          { id: "date", label: "Дата" },
          { id: "username", label: "Пользователь" },
          { id: "request_body", label: "Запрос" },
          { id: "limit_", label: "Лимит" },
        ]);
      }

      // else if (source === "Cascade" && inputType === "FullName") {
      //   apiUrl = `http://192.168.30.24:5220/users_log/message=${name}`;
      //   setAdditionalInfo(`Кто просматривал объект : ${name}`);

      //   setColumnHeaders([
      //     { id: "time", label: "Дата" },
      //     { id: "username", label: "Пользователь" },
      //     { id: "message", label: "Запрос" },
      //   ]);
      // }
      else if (source === "Cascade" && inputType === "FullName") {
        apiUrl = "http://192.168.30.24:5220/users_log/message/";
        let fullNameInfo = "";

        if (lastName || firstName || middleName) {
          if (lastName) fullNameInfo += `${lastName} `;
          if (firstName) fullNameInfo += `${firstName} `;
          if (middleName) fullNameInfo += middleName;

          setAdditionalInfo(`Кто просматривал объект: ${fullNameInfo}`);
        }

        if (inputType === "FullName") {
          apiUrl += "fio/?";

          if (lastName) apiUrl += `lname=${lastName}&`;
          if (firstName) apiUrl += `fname=${firstName}&`;
          if (middleName) apiUrl += `mname=${middleName}&`;
        }

        apiUrl = apiUrl.slice(0, -1);

        setColumnHeaders([
          { id: "time", label: "Дата" },
          { id: "username", label: "Пользователь" },
          { id: "message", label: "Запрос" },
        ]);
      }

      // else if (source === "Itap" && inputType === "FullName") {
      //   apiUrl = "http://192.168.30.24:5220/log/search/";
      //   let fullNameInfo = "";

      //   if (lastName || firstName || middleName) {
      //     if (lastName) fullNameInfo += `${lastName} `;
      //     if (firstName) fullNameInfo += `${firstName} `;
      //     if (middleName) fullNameInfo += middleName;

      //     setAdditionalInfo(`Кто просматривал объект: ${fullNameInfo}`);
      //   }

      //   if (inputType === "FullName") {
      //     apiUrl += "fio/?";

      //     if (lastName) apiUrl += `lname=${lastName}&`;
      //     if (firstName) apiUrl += `fname=${firstName}&`;
      //     if (middleName) apiUrl += `mname=${middleName}&`;
      //   }

      //   apiUrl = apiUrl.slice(0, -1);

      //   setColumnHeaders([
      //     { id: "date", label: "Дата" },
      //     { id: "username", label: "Пользователь" },
      //     { id: "request_body", label: "Запрос" },
      //     { id: "limit_", label: "Лимит" },
      //   ]);
      // }
    } else if (infoType === "Risks") {
      if (source === "Itap" && inputType === "IIN") {
        apiUrl = `http://192.168.30.24:5220/risks/log/iin=${inn}`;
        setAdditionalInfo(`Список рискованных запросов: ${inn}`);

        setColumnHeaders([
          { id: "date", label: "Дата" },
          { id: "username", label: "Инициатор запроса" },
          { id: "fio", label: "ИИН/БИН объекта запроса" },
          { id: "iin", label: "ФИО Объекта запроса" },
        ]);
      } else if (source === "Cascade" && inputType === "IIN") {
        apiUrl = `http://192.168.30.24:5220/risks/users_log/iin=${inn}`;
        setAdditionalInfo(`Список рискованных запросов: ${inn}`);

        setColumnHeaders([
          { id: "time", label: "Дата" },
          { id: "username", label: "Инициатор запроса" },
          { id: "fio", label: "ИИН/БИН объекта запроса" },
          { id: "iin", label: "ФИО Объекта запроса" },
        ]);
      } else if (source === "Cascade" && inputType === "EmployeeType") {
        apiUrl = `http://192.168.30.24:5220/risks/users_log/fio=${employeeField}`;
        setAdditionalInfo(`Список рискованных запросов: ${employeeField}`);

        setColumnHeaders([
          { id: "time", label: "Дата" },
          { id: "username", label: "Пользователь" },
          { id: "fio", label: "ИИН/БИН объекта запроса" },
          { id: "iin", label: "ФИО Объекта запроса" },
        ]);
      } else if (source === "Itap" && inputType === "EmployeeType") {
        let additionalInfo;

        apiUrl = `http://192.168.30.24:5220/risks/log/fio=${employeeField}`;
        additionalInfo = `cписок рискованных запросов: ${employeeField}`;

        setAdditionalInfo(additionalInfo);

        setColumnHeaders([
          { id: "date", label: "Дата" },
          { id: "username", label: "Пользователь" },
          { id: "fio", label: "ИИН/БИН объекта запроса" },
          { id: "iin", label: "ФИО Объекта запроса" },
        ]);
      }
      else if (inputType === "ListRisks") {
        let additionalInfo;

        apiUrl = `http://192.168.30.24:5220/risks/log`;
        additionalInfo = `cписок рискованных запросов`;

        setAdditionalInfo(additionalInfo);

        setColumnHeaders([
          { id: "date", label: "Дата" },
          { id: "username", label: "Пользователь" },
          { id: "fio", label: "ИИН/БИН объекта" },
          { id: "iin", label: "ФИО Объекта" },
        ]);
      }
    }
    if (apiUrl === "") {
      handleError("Данная функция не доступна на данный момент");
      setLoading(false);
      return;
    }
    if (startDate || endDate) {
      apiUrl += "/?";

      if (startDate) {
        apiUrl += `start_date=${startDate}`;

        // Append '&' only if both start_date and end_date exist
        if (endDate) {
          apiUrl += "&";
        }
      }

      if (endDate) {
        apiUrl += `end_date=${endDate}`;
      }
    }

    console.log("API URL:", apiUrl);

    Axios.get(apiUrl, { headers })
      .then((response) => {
        const searchData = response.data;

        if (!Array.isArray(searchData)) {
          console.error("Invalid response data:", searchData);
          return;
        }

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
              data.log_time,
              data.iin,
              data.fio
            )
          )
        );
        setDownloadAvailable(searchData.length > 0);
        setPage(0);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 404) {
          handleError(
            "Данные не найдены. Пожалуйста, проверьте введенные данные и повторите попытку."
          );
          setRows([]);
        } else {
          handleError("При извлечении данных произошла ошибка.");
          setRows([]);
        }
      })
      .finally(() => {
        setLoading(false);
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
        downloadUrl = `http://192.168.30.24:5220/log/iin=${inn}/download_excel`;
      } else if (inputType === "Username" && source === "Itap") {
        downloadUrl = `http://192.168.30.24:5220/log/username=${usernameField}/download_excel`;
      } else if (inputType === "FullName" && source === "Itap") {
        downloadUrl = `http://192.168.30.24:5220/log/fullname=${name}/download_excel`;
      } else if (inputType === "Username" && source === "Cascade") {
        downloadUrl = `http://192.168.30.24:5220/user_log/username=${usernameField}/download_excel`;
      } else if (inputType === "FullName" && source === "Cascade") {
        downloadUrl = `http://192.168.30.24:5220/user_log/fullname=${name}/download_excel`;
      } else if (inputType === "Username" && source === "Досье") {
        downloadUrl = `http://192.168.30.24:5220/dossie_log/username=${usernameField}/download`;
      } else if (inputType === "IIN" && source === "Досье") {
        downloadUrl = `http://192.168.30.24:5220/dossie_log/username=${inn}/download`;
      } else if (inputType === "FullName" && source === "Досье") {
        downloadUrl = `http://192.168.30.24:5220/dossie_log/fullname=${name}/download`;
      }
    } else if (infoType === "WhoViewedThisUser") {
      if (inputType === "IIN" && source === "Itap") {
        downloadUrl = `http://192.168.30.24:5220/log/iin=${inn}/download_excel`;
      } else if (inputType === "FullName" && source === "Itap") {
        downloadUrl = "http://192.168.30.24:5220/log/download/search";
        let fullNameInfo = "";
        if (lastName || firstName || middleName) {
          if (lastName) fullNameInfo += `${lastName} `;
          if (firstName) fullNameInfo += `${firstName} `;
          if (middleName) fullNameInfo += middleName;

          setAdditionalInfo(`Кто просматривал объект: ${fullNameInfo}`);
        }
        if (inputType === "FullName") {
          downloadUrl += "_fio/?";

          if (searchTypeLastName === "startingWith") {
            if (lastName) downloadUrl += `lname=${lastName}&`;
          } else if (searchTypeLastName === "exactly") {
            if (lastName) downloadUrl += `full_lname=${lastName}&`;
          }

          if (searchTypeFirstName === "startingWith") {
            if (firstName) downloadUrl += `fname=${firstName}&`;
          } else if (searchTypeFirstName === "exactly") {
            if (firstName) downloadUrl += `full_fname=${firstName}&`;
          }

          if (searchTypeMiddleName === "startingWith") {
            if (middleName) downloadUrl += `mname=${middleName}&`;
          } else if (searchTypeMiddleName === "exactly") {
            if (middleName) downloadUrl += `full_mname=${middleName}&`;
          }
        }

        downloadUrl = downloadUrl.slice(0, -1);
      } else if (inputType === "IIN" && source === "Досье") {
        downloadUrl = `http://192.168.30.24:5220/dossie_log/action=${inn}/download`;
      }
      // else if (inputType === "FullName" && source === "Досье") {
      //   downloadUrl = `http://192.168.30.24:5220/dossie_log/action=${name}/download`;
      // }
      else if (inputType === "FullName" && source === "Досье") {
        downloadUrl = "http://192.168.30.24:5220/dossie_log/download/";

        if (inputType === "FullName") {
          downloadUrl += "fio/?";

          if (searchTypeLastName === "startingWith") {
            if (lastName) downloadUrl += `lname=${lastName}&`;
          } else if (searchTypeLastName === "exactly") {
            if (lastName) downloadUrl += `full_lname=${lastName}&`;
          }

          if (searchTypeFirstName === "startingWith") {
            if (firstName) downloadUrl += `fname=${firstName}&`;
          } else if (searchTypeFirstName === "exactly") {
            if (firstName) downloadUrl += `full_fname=${firstName}&`;
          }

          if (searchTypeMiddleName === "startingWith") {
            if (middleName) downloadUrl += `mname=${middleName}&`;
          } else if (searchTypeMiddleName === "exactly") {
            if (middleName) downloadUrl += `full_mname=${middleName}&`;
          }
        }
        downloadUrl = downloadUrl.slice(0, -1);
      } else if (inputType === "FullName" && source === "Cascade") {
        downloadUrl = `http://192.168.30.24:5220/user_log/message=${name}/download_excel`;
      } else if (inputType === "IIN" && source === "Cascade") {
        downloadUrl = `http://192.168.30.24:5220/user_log/message=${inn}/download_excel`;
      }
    }
    if (startDate || endDate) {
      downloadUrl += "/?";

      if (startDate) {
        downloadUrl += `start_date=${startDate}`;

        // Append '&' only if both start_date and end_date exist
        if (endDate) {
          downloadUrl += "&";
        }
      }

      if (endDate) {
        downloadUrl += `end_date=${endDate}`;
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
                label="ИИН/БИН"
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
                    width: "629px",
                    "&:hover": {
                      "& fieldset": {
                        borderColor: "#fff !important",
                      },
                    },
                    "& .MuiFocused": {
                      "& fieldset": {
                        borderColor: "#fff !important",
                      },
                    },
                    "& fieldset": {
                      borderColor: "#fff !important",
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end" sx={{ marginRight: "-5px" }}>
                      <SearchIcon sx={{ fontSize: 20, color: "#fff" }} />
                    </InputAdornment>
                  ),
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
            <Box display="flex" alignItems="center" gap="10px">
              <Select
                value={searchTypeUserName}
                onChange={(e) => setSearchTypeUserName(e.target.value)}
                sx={{
                  fontSize: "14px",
                  fontFamily: "Montserrat, sans-serif",
                  color: "#fff",
                  height: "45px",
                  width: "180px",
                  marginTop: "7px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fff !important",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fff !important",
                  },
                  "&.MuiFocused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fff !important",
                  },
                  "& .MuiSelect-icon": {
                    color: "#fff !important",
                  },
                }}
              >
                <MenuItem value="startingWith">Начинается с</MenuItem>
                <MenuItem value="exactly">В точности с</MenuItem>
              </Select>
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
                  style: { color: "#fff", height: "45px", width: "440px" },
                  notchedOutline: {
                    borderColor: colors.borderColor,
                  },
                  endAdornment: (
                    <InputAdornment position="end" sx={{ marginRight: "-5px" }}>
                      <SearchIcon sx={{ fontSize: 20, color: "#fff" }} />
                    </InputAdornment>
                  ),
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
            </Box>
          </ThemeProvider>
        );

      case "EmployeeType":
        return (
          <ThemeProvider theme={darkTheme}>
            <Box display="flex" alignItems="center" gap="10px">
              {/* <Select
                value={searchTypeEmployee}
                onChange={(e) => setSearchTypeEmployee(e.target.value)}
                disabled={inputType === "EmployeeType"}
                sx={{
                  fontSize: "14px",
                  fontFamily: "Montserrat, sans-serif",
                  color: "#fff",
                  height: "45px",
                  width: "180px",
                  marginTop: "7px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fff !important",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fff !important",
                  },
                  "&.MuiFocused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fff !important",
                  },
                  "& .MuiSelect-icon": {
                    color: "#fff !important",
                  },
                }}
              >
                <MenuItem value="startingWith">Начинается с</MenuItem>
                <MenuItem value="exactly">В точности с</MenuItem>
              </Select> */}
              <TextField
                required
                id="outlined-username"
                label="Сотрудник"
                defaultValue=""
                margin="normal"
                variant="outlined"
                value={employeeField}
                onChange={handleEmployeeFieldChange}
                InputLabelProps={{
                  style: {
                    fontFamily: "Montserrat, sans-serif",
                    color: "#fff",
                    fontSize: "14px",
                  },
                }}
                InputProps={{
                  style: { color: "#fff", height: "45px", width: "630px" },
                  notchedOutline: {
                    borderColor: colors.borderColor,
                  },
                  endAdornment: (
                    <InputAdornment position="end" sx={{ marginRight: "-5px" }}>
                      <SearchIcon sx={{ fontSize: 20, color: "#fff" }} />
                    </InputAdornment>
                  ),
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
            </Box>
          </ThemeProvider>
        );

      case "FullName":
        return (
          <ThemeProvider theme={darkTheme}>
            <>
              {infoType === "WhoViewedThisUser" ? (
                <>
                  <Box display="flex" alignItems="center" gap="10px">
                    <Select
                      value={
                        source === "Cascade"
                          ? "startingWith"
                          : searchTypeLastName
                      }
                      onChange={(e) => setSearchTypeLastName(e.target.value)}
                      disabled={source === "Cascade" || infoType === "Risks"}
                      // defaultValue={source === "Itap" || source === "Cascade" ? "startingWith" : "startingWith"}

                      sx={{
                        fontSize: "14px",
                        fontFamily: "Montserrat, sans-serif",
                        color: "#fff",
                        height: "45px",
                        width: "180px",
                        marginTop: "7px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff !important",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff !important",
                        },
                        "&.MuiFocused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff !important",
                        },
                        "& .MuiSelect-icon": {
                          color: "#fff !important",
                        },
                      }}
                    >
                      <MenuItem value="startingWith">Начинается с</MenuItem>
                      <MenuItem value="exactly">В точности с</MenuItem>
                    </Select>
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
                        style: {
                          color: "#fff",
                          height: "45px",
                          width: "440px",
                        },
                        notchedOutline: {
                          borderColor: "#fff",
                        },
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{ marginRight: "-5px" }}
                          >
                            <SearchIcon sx={{ fontSize: 20, color: "#fff" }} />
                          </InputAdornment>
                        ),
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
                  </Box>
                  <Box display="flex" alignItems="center" gap="10px">
                    <Select
                      value={
                        source === "Cascade"
                          ? "startingWith"
                          : searchTypeFirstName
                      }
                      onChange={(e) => setSearchTypeFirstName(e.target.value)}
                      disabled={source === "Cascade" || infoType === "Risks"}
                      // defaultValue={source === "Itap" || source === "Cascade" ? "startingWith" : "startingWith"}

                      sx={{
                        fontSize: "14px",
                        fontFamily: "Montserrat, sans-serif",
                        color: "#fff",
                        height: "45px",
                        width: "180px",
                        marginTop: "7px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff !important",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff !important",
                        },
                        "&.MuiFocused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff !important",
                        },
                        "& .MuiSelect-icon": {
                          color: "#fff !important",
                        },
                      }}
                    >
                      <MenuItem value="startingWith">Начинается с</MenuItem>
                      <MenuItem value="exactly">В точности с</MenuItem>
                    </Select>
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
                        style: {
                          color: "#fff",
                          height: "45px",
                          width: "440px",
                        },
                        notchedOutline: {
                          borderColor: colors.borderColor,
                        },
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{ marginRight: "-5px" }}
                          >
                            <SearchIcon sx={{ fontSize: 20, color: "#fff" }} />
                          </InputAdornment>
                        ),
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
                  </Box>
                  <Box display="flex" alignItems="center" gap="10px">
                    <Select
                      value={
                        source === "Cascade"
                          ? "startingWith"
                          : searchTypeMiddleName
                      }
                      onChange={(e) => setSearchTypeMiddleName(e.target.value)}
                      disabled={source === "Cascade" || infoType === "Risks"}
                      // defaultValue={source === "Itap" || source === "Cascade" ? "startingWith" : "startingWith"}

                      sx={{
                        fontSize: "14px",
                        fontFamily: "Montserrat, sans-serif",
                        color: "#fff",
                        height: "45px",
                        width: "180px",
                        marginTop: "7px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff !important",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff !important",
                        },
                        "&.MuiFocused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff !important",
                        },
                        "& .MuiSelect-icon": {
                          color: "#fff !important",
                        },
                      }}
                    >
                      <MenuItem value="startingWith">Начинается с</MenuItem>
                      <MenuItem value="exactly">В точности с</MenuItem>
                    </Select>
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
                        style: {
                          color: "#fff",
                          height: "45px",
                          width: "440px",
                        },
                        notchedOutline: {
                          borderColor: colors.borderColor,
                        },
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{ marginRight: "-5px" }}
                          >
                            <SearchIcon sx={{ fontSize: 20, color: "#fff" }} />
                          </InputAdornment>
                        ),
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
                  </Box>
                </>
              ) : (
                <Box display="flex" alignItems="center" gap="10px">
                  <Select
                    value={searchTypeFullName}
                    onChange={(e) => setSearchTypeFullName(e.target.value)}
                    sx={{
                      fontSize: "14px",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#fff",
                      height: "45px",
                      width: "180px",
                      marginTop: "7px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff !important",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff !important",
                      },
                      "&.MuiFocused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff !important",
                      },
                      "& .MuiSelect-icon": {
                        color: "#fff !important",
                      },
                    }}
                  >
                    <MenuItem value="startingWith">Начинается с</MenuItem>
                    <MenuItem value="exactly">В точности с</MenuItem>
                  </Select>
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
                      style: { color: "#fff", height: "45px", width: "440px" },
                      notchedOutline: {
                        borderColor: colors.borderColor,
                      },
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{ marginRight: "-5px" }}
                        >
                          <SearchIcon sx={{ fontSize: 20, color: "#fff" }} />
                        </InputAdornment>
                      ),
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
                </Box>
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
                setInputType("IIN");
                handleButtonClick("WhoViewedThisUser");
              }}
            >
              Кто просматривал данный объект
            </Button>
            <Button
              variant="contained"
              style={{
                fontSize: "12px",
                fontFamily: "Montserrat, sans-serif",
                padding: "2px 4px",
                backgroundColor:
                  infoType === "Risks" ? colors.secondary : colors.primary,
              }}
              onClick={() => {
                setInfoType("Risks");
                setInputType("IIN");
                handleButtonClick("Risks");
              }}
            >
              Риски
            </Button>
          </Box>

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
                  ИИН/БИН
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
                  Учётная запись
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
                  ИИН/БИН
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

            {infoType === "Risks" && (
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
                  ИИН/БИН
                </Button>
                <Button
                  variant="contained"
                  style={{
                    fontSize: "12px",
                    fontFamily: "Montserrat, sans-serif",
                    padding: "2px 4px",
                    backgroundColor:
                      inputType === "EmployeeType"
                        ? colors.secondary
                        : colors.primary,
                  }}
                  onClick={() => {
                    setInputType("EmployeeType");
                    handleButtonClick("EmployeeType");
                  }}
                >
                  Сотрудник
                </Button>
                {/* <Button
                  variant="contained"
                  style={{
                    fontSize: "12px",
                    fontFamily: "Montserrat, sans-serif",
                    padding: "2px 4px",
                    backgroundColor:
                      inputType === "ListRisks"
                        ? colors.secondary
                        : colors.primary,
                  }}
                  onClick={() => {
                    setInputType("ListRisks");
                    handleButtonClick("ListRisks");
                    handleSearch("ListRisks");
                  }}
                >
                  Полный список рисков
                </Button> */}
              </>
            )}
          </Box>

          {renderInputFields()}
          <ThemeProvider theme={darkTheme}>
            {inputType !== "ListRisks" && (
              <InputLabel
                id="demo-simple-select-outlined-label"
                sx={{
                  fontSize: "14px",
                  fontFamily: "Montserrat, sans-serif",
                  color: "#fff",
                  height: "40px",
                  width: "630px",
                  "&:hover": {
                    color: "#fff",
                  },
                }}
              >
                Источник
              </InputLabel>
            )}

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
                        width: "630px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff !important",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff !important",
                        },
                        "&.MuiFocused .MuiOutlinedInput-notchedOutline": {
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
                      width: "630px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff !important",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff !important",
                      },
                      "&.MuiFocused .MuiOutlinedInput-notchedOutline": {
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
                      width: "630px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff !important",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff !important",
                      },
                      "&.MuiFocused .MuiOutlinedInput-notchedOutline": {
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
                        width: "630px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff !important",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff !important",
                        },
                        "&.MuiFocused .MuiOutlinedInput-notchedOutline": {
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
                      width: "630px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff !important",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff !important",
                      },
                      "&.MuiFocused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff !important",
                      },
                      "& .MuiSelect-icon": {
                        color: "#fff !important",
                      },
                    }}
                  >
                    <MenuItem value="Itap">Itap</MenuItem>
                    <MenuItem value="Досье">Досье</MenuItem>
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
            {infoType === "Risks" && (
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
                        width: "630px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff !important",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff !important",
                        },
                        "&.MuiFocused .MuiOutlinedInput-notchedOutline": {
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

                {inputType === "EmployeeType" && (
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
                      width: "630px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff !important",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff !important",
                      },
                      "&.MuiFocused .MuiOutlinedInput-notchedOutline": {
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
          </ThemeProvider>
          <ThemeProvider theme={darkTheme}>
            {infoType !== "Risks" && (
              <Box mt={2}>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleToggleFilters}
                  style={{ color: "white" }} // Set text color
                >
                  Дополнительные фильтры
                </Button>
              </Box>
            )}
            {showFilters && (
              <Box mt={2} sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                <TextField
                  label="Дата начала"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      fontFamily: "Montserrat, sans-serif",
                      color: "#fff",
                      fontSize: "13px",
                      "& svg": {
                        fill: "white", // Color for the icon
                      },
                    },
                  }}
                  InputProps={{
                    style: {
                      color: "white", // Text color for the input
                      fontSize: "14px",
                      height: "45px",
                      width: "307px",
                      "&:hover": {
                        "& fieldset": {
                          borderColor: "#fff !important",
                        },
                      },
                      "& .MuiFocused": {
                        "& fieldset": {
                          borderColor: "#fff !important",
                        },
                      },
                      "& fieldset": {
                        borderColor: "#fff !important",
                      },
                    },
                  }}
                />

                <TextField
                  label="Дата окончания"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      fontFamily: "Montserrat, sans-serif",
                      color: "#fff",
                      fontSize: "13px",
                      // '& svg': {
                      //   fill: 'white', // Color for the icon
                      //   color: 'white',
                      //   border: '1px solid red'
                      // },
                    },
                  }}
                  InputProps={{
                    style: {
                      color: "white", // Text color for the input
                      fontSize: "14px",
                      height: "45px",
                      width: "307px",
                      "&:hover": {
                        "& fieldset": {
                          borderColor: "#fff !important",
                        },
                      },
                      "& .MuiFocused": {
                        "& fieldset": {
                          borderColor: "#fff !important",
                        },
                      },
                      "& fieldset": {
                        borderColor: "#fff !important",
                      },
                    },
                  }}
                />
              </Box>
            )}
          </ThemeProvider>
          <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
            {inputType !== "ListRisks" && (
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
            )}
            {infoType !== "Risks" && downloadAvailable && (
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
              width: "100%",
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
                fontSize: "1.55rem",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "600",
              }}
            >
              {additionalInfo}
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
                          overflow: "hidden",
                          textOverflow: "ellipsis",
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
              <CustomTablePagination
                rows={rows}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </ThemeProvider>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
};

export default DataInputPage;
