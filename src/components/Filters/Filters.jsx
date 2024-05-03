import React, { useState, useEffect } from "react";
import "../Filters/Filters.css";
import colors from "../../themes/palette.json";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Loading from "../../assets/loading.gif";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
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
  iin,
  date_action,
  member_bin,
  performer,
  member_name,
  other
) {
  const formattedDate = date
    ? new Date(date).toLocaleString()
    : "Нету информации";
  const formattedDossieTime = log_time
    ? new Date(log_time).toLocaleString()
    : "Нету информации";

  return {
    date: formattedDate,
    username: username || "Нету информации",
    request_body: request_body || "Нету информации",
    limit_: limit_ || "Нету информации",
    time: time || "Нету информации",
    message: message || "Нету информации",
    action: action || "Нету информации",
    fname: fname || "Нету информации",
    lname: lname || "Нету информации",
    user_name: user_name || "Нету информации",
    log_time: formattedDossieTime,
    fio: fio || "Нету информации",
    iin: iin || "Нету информации",
    date_action: date_action || "Нету информации",
    member_bin: member_bin || "Нету информации",
    performer: performer || "Нету информации",
    member_name: member_name || "Нету информации",
    other: other || "Нету информации",
  };
}
const Filters = ({
  setResult,
  setRows,
  setColumnHeaders,
  setAdditionalInfo,
}) => {
  const [activeButton, setActiveButton] = useState("WhoViewedThisUser");

  const handleButtonClickActive = (button) => {
    setActiveButton(button);
  };
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
  const [infoType, setInfoType] = useState("WhoViewedThisUser");
  const [inputType, setInputType] = useState("IIN");
  const [source, setSource] = useState("Itap");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [inn, setInn] = useState("");
  const [value, setValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [downloadAvailable, setDownloadAvailable] = useState(false);

  const [searchTypeLastName, setSearchTypeLastName] = useState("startingWith");
  const [searchTypeFirstName, setSearchTypeFirstName] =
    useState("startingWith");
  const [searchTypeMiddleName, setSearchTypeMiddleName] =
    useState("startingWith");
  const [searchTypeFullName, setSearchTypeFullName] = useState("startingWith");
  const [searchTypeUserName, setSearchTypeUserName] = useState("startingWith");
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

  const [isFilterChanged, setIsFilterChanged] = useState(false);

  useEffect(() => {
    setInitialInfoType(infoType);
    setInitialInputType(inputType);
    setInitialSource(source);
  }, [infoType, inputType, source]);

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
    setStartDate(null);
    setEndDate(null);
  };

  const handleChange = (event) => {
    setSource(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
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
    if (
      type === "WhomThisUserViewed" ||
      type === "WhoViewedThisUser" ||
      type === "Risks"
    ) {
      // For the first set of buttons
      setInfoType(type);
    } else if (
      (type === "IIN" || type === "Username" || type === "FullName",
      type === "ListRisks",
      type === "EmployeeType")
    ) {
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
      } else if (source === "eias" && inputType === "Username") {
        let additionalInfo;
        if (searchTypeUserName === "startingWith") {
          apiUrl = `http://192.168.30.24:5220/simdata/username_partial=${usernameField}`;
          additionalInfo = `Кого просматривал сотрудник (начинается с): ${usernameField}`;
        } else if (searchTypeUserName === "exactly") {
          apiUrl = `http://192.168.30.24:5220/simdata/username=${usernameField}`;
          additionalInfo = `Кого просматривал сотрудник (в точности): ${usernameField}`;
        }
        setAdditionalInfo(additionalInfo);

        setColumnHeaders([
          { id: "date", label: "Дата" },
          // { id: "action", label: "Запрос" },
          { id: "member_bin", label: "ИИН/БИН" },
          { id: "performer", label: "Исполнитель" },
          { id: "member_name", label: "Имя" },
          { id: "other", label: "Другие сведения" },
        ]);
      }else if (source === "eias" && inputType === "FullName") {
        let additionalInfo;
        if (searchTypeUserName === "startingWith") {
          apiUrl = `http://192.168.30.24:5220/simdata/member_name=${name}`;
          additionalInfo = `Кого просматривал сотрудник (начинается с): ${name}`;
        } else if (searchTypeUserName === "exactly") {
          apiUrl = `http://192.168.30.24:5220/simdata/username=${name}`;
          additionalInfo = `Кого просматривал сотрудник (в точности): ${name}`;
        }
        setAdditionalInfo(additionalInfo);

        setColumnHeaders([
          { id: "date", label: "Дата" },
          // { id: "action", label: "Запрос" },
          { id: "member_bin", label: "ИИН/БИН" },
          { id: "performer", label: "Исполнитель" },
          { id: "member_name", label: "Имя" },
          { id: "other", label: "Другие сведения" },
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
        apiUrl = "http://192.168.30.24:5220/risks/log";
        if (inn) {
          apiUrl += `/iin=${inn}`;
          setAdditionalInfo(`Список рискованных запросов: ${inn}`);
        } else {
          setAdditionalInfo("Список рискованных запросов: Все");
        }

        setColumnHeaders([
          { id: "date", label: "Дата" },
          { id: "username", label: "Инициатор запроса" },
          { id: "fio", label: "ИИН/БИН объекта запроса" },
          { id: "iin", label: "ФИО Объекта запроса" },
        ]);
      } else if (source === "Cascade" && inputType === "IIN") {
        apiUrl = `http://192.168.30.24:5220/risks/users_log`;
        if (inn) {
          apiUrl += `/iin=${inn}`;
          setAdditionalInfo(`Список рискованных запросов: ${inn}`);
        } else {
          setAdditionalInfo("Список рискованных запросов: Все");
        }

        setColumnHeaders([
          { id: "time", label: "Дата" },
          { id: "username", label: "Инициатор запроса" },
          { id: "fio", label: "ИИН/БИН объекта запроса" },
          { id: "iin", label: "ФИО Объекта запроса" },
        ]);
      } else if (source === "Cascade" && inputType === "EmployeeType") {
        apiUrl = `http://192.168.30.24:5220/risks/users_log`;

        if (employeeField) {
          apiUrl += `/fio=${employeeField}`;
          setAdditionalInfo(`Список рискованных запросов: ${employeeField}`);
        } else {
          setAdditionalInfo("Список рискованных запросов: Все");
        }
        setColumnHeaders([
          { id: "time", label: "Дата" },
          { id: "username", label: "Инициатор запроса" },
          { id: "fio", label: "ИИН/БИН объекта запроса" },
          { id: "iin", label: "ФИО Объекта запроса" },
        ]);
      } else if (source === "Itap" && inputType === "EmployeeType") {
        let additionalInfo;

        apiUrl = `http://192.168.30.24:5220/risks/log`;

        if (employeeField) {
          apiUrl += `/fio=${employeeField}`;
          setAdditionalInfo(`Список рискованных запросов: ${employeeField}`);
        } else {
          setAdditionalInfo("Список рискованных запросов: Все");
        }

        setAdditionalInfo(additionalInfo);

        setColumnHeaders([
          { id: "date", label: "Дата" },
          { id: "username", label: "Инициатор запроса" },
          { id: "fio", label: "ИИН/БИН объекта запроса" },
          { id: "iin", label: "ФИО Объекта запроса" },
        ]);
      } else if (source === "Досье" && inputType === "IIN") {
        apiUrl = "http://192.168.30.24:5220/risks/dossie_log";

        if (inn) {
          apiUrl += `/iin=${inn}`;
          setAdditionalInfo(`Список рискованных запросов: ${inn}`);
        } else {
          setAdditionalInfo("Список рискованных запросов: Все");
        }

        setColumnHeaders([
          { id: "log_time", label: "Дата" },
          { id: "user_name", label: "Инициатор запроса" },
          { id: "fio", label: "ИИН/БИН объекта запроса" },
          { id: "iin", label: "ФИО Объекта запроса" },
        ]);
      } else if (source === "Досье" && inputType === "EmployeeType") {
        apiUrl = "http://192.168.30.24:5220/risks/dossie_log";

        if (employeeField) {
          apiUrl += `/fio=${employeeField}`;
          setAdditionalInfo(`Список рискованных запросов: ${employeeField}`);
        } else {
          setAdditionalInfo("Список рискованных запросов: Все");
        }

        setColumnHeaders([
          { id: "log_time", label: "Дата" },
          { id: "user_name", label: "Инициатор запроса" },
          { id: "fio", label: "ИИН/БИН объекта запроса" },
          { id: "iin", label: "ФИО Объекта запроса" },
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
        setResult(response.data);
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
              data.fio,
              data.date_action,
              data.member_bin,
              data.performer,
              data.member_name,
              data.other
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
        } else if (error.response && error.response.status === 401) {
          handleError(
            "Возникла проблема при получении данных. Пожалуйста, попробуйте войти в портал снова."
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

        if (endDate) {
          downloadUrl += "&";
        }
      }

      if (endDate) {
        downloadUrl += `end_date=${endDate}`;
      }
    }
    console.log("DOWNLOAD URL:", downloadUrl);

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

  const renderInputFields = () => {
    switch (inputType) {
      case "IIN":
        return (
          <ThemeProvider theme={darkTheme}>
            <div>
              <label className="labelsSec">Данные объекта</label>
            </div>
            <Box display="flex" alignItems="center">
              {/* <TextField
                required
                id="outlined-required"
                label={
                  infoType === "Risks"
                    ? "ИИН/БИН(Не обязательное поле)"
                    : "ИИН/БИН"
                }
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
                    height: "48px",
                    width: "474px",
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
              /> */}
              {/* <div
                style={{
                  color: "#fff",
                  fontSize: "12px",
                  marginLeft: "10px",
                  marginTop: "5px",
                }}
              >
                {inn.length}/12
              </div> */}
            </Box>
            <div className="iinInputContainer">
              <input
                type="text"
                value={inn}
                onChange={handleInnChange}
                placeholder={
                  infoType === "Risks"
                    ? "ИИН/БИН(Не обязательное поле)"
                    : "ИИН/БИН"
                }
              />
            </div>
          </ThemeProvider>
        );
      case "Username":
        return (
          <ThemeProvider theme={darkTheme}>
            <div>
              <label className="labelsSec">Данные объекта</label>
            </div>
            <Box display="flex" alignItems="center" gap="10px">
              <select
                className="additionalSelect"
                value={searchTypeUserName}
                onChange={(e) => {
                  setSearchTypeUserName(e.target.value);
                }}
              >
                <option value="startingWith">Начинается с</option>
                <option value="exactly">В точности с</option>
              </select>
              {/* <Select
                value={searchTypeUserName}
                onChange={(e) => setSearchTypeUserName(e.target.value)}
                sx={{
                  fontSize: "14px",
                  fontFamily: "Montserrat, sans-serif",
                  color: "#fff",
                  height: "48px",
                  width: "160px",
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
              <div className="usernameInputContainer">
                <input
                  type="text"
                  value={usernameField}
                  onChange={handleUsernameFieldChange}
                  placeholder="Учётная запись"
                />
              </div>
              {/* <TextField
                required
                id="outlined-username"
                label="Учётная запись"
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
                  style: { color: "#fff", height: "48px", width: "308px" },
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
              /> */}
            </Box>
          </ThemeProvider>
        );

      case "EmployeeType":
        return (
          <ThemeProvider theme={darkTheme}>
            <div>
              <label className="labelsSec">Данные объекта</label>
            </div>
            <Box display="flex" alignItems="center" gap="10px">
              {/* <Select
                value={searchTypeEmployee}
                onChange={(e) => setSearchTypeEmployee(e.target.value)}
                disabled={inputType === "EmployeeType"}
                sx={{
                  fontSize: "14px",
                  fontFamily: "Montserrat, sans-serif",
                  color: "#fff",
                  height: "48px",
                  width: "160px",
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
              <div className="employeeInputContainer">
                <input
                  type="text"
                  value={employeeField}
                  onChange={handleEmployeeFieldChange}
                  placeholder="Сотрудник(Не обязательное поле)"
                />
              </div>
              {/* <TextField
                required
                id="outlined-username"
                label="Сотрудник(Не обязательное поле)"
                defaultValue=""
                margin="normal"
                variant="outlined"
                value={employeeField}
                onChange={handleEmployeeFieldChange}
                InputLabelProps={{
                  style: {
                    fontFamily: "Montserrat, sans-serif",
                    color: "#fff",
                    fontSize: "12px",
                  },
                }}
                InputProps={{
                  style: { color: "#fff", height: "48px", width: "474px" },
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
              /> */}
            </Box>
          </ThemeProvider>
        );

      case "FullName":
        return (
          <ThemeProvider theme={darkTheme}>
            <>
              {infoType === "WhoViewedThisUser" ? (
                <>
                  <div>
                    <label className="labelsSec">Данные объекта</label>
                  </div>
                  <Box display="flex" alignItems="center" gap="10px">
                    <select
                      className="additionalSelect"
                      value={
                        source === "Cascade"
                          ? "startingWith"
                          : searchTypeLastName
                      }
                      onChange={(e) => {
                        setSearchTypeLastName(e.target.value);
                      }}
                      disabled={source === "Cascade" || infoType === "Risks"}
                    >
                      <option value="startingWith">Начинается с</option>
                      <option value="exactly">В точности с</option>
                    </select>
                    {/* <Select
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
                        height: "48px",
                        width: "160px",
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
                    <div className="fioInputContainer">
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value.trim())}
                        placeholder="Фамилия"
                      />
                    </div>
                    {/* <TextField
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
                          height: "48px",
                          width: "308px",
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
                    /> */}
                  </Box>
                  <Box display="flex" alignItems="center" gap="10px">
                    <select
                      className="additionalSelect"
                      value={
                        source === "Cascade"
                          ? "startingWith"
                          : searchTypeFirstName
                      }
                      onChange={(e) => {
                        setSearchTypeFirstName(e.target.value);
                      }}
                      disabled={source === "Cascade" || infoType === "Risks"}
                    >
                      <option value="startingWith">Начинается с</option>
                      <option value="exactly">В точности с</option>
                    </select>
                    {/* <Select
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
                        height: "48px",
                        width: "160px",
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

                    <div className="fioInputContainer">
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value.trim())}
                        placeholder="Имя"
                      />
                    </div>
                    {/* <TextField
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
                          height: "48px",
                          width: "308px",
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
                    /> */}
                  </Box>
                  <Box display="flex" alignItems="center" gap="10px">
                    <select
                      className="additionalSelect"
                      value={
                        source === "Cascade"
                          ? "startingWith"
                          : searchTypeMiddleName
                      }
                      onChange={(e) => {
                        setSearchTypeMiddleName(e.target.value);
                      }}
                      disabled={source === "Cascade" || infoType === "Risks"}
                    >
                      <option value="startingWith">Начинается с</option>
                      <option value="exactly">В точности с</option>
                    </select>
                    {/* <Select
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
                        height: "48px",
                        width: "160px",
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
                    <div className="fioInputContainer">
                      <input
                        type="text"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value.trim())}
                        placeholder="Отчество"
                      />
                    </div>
                    {/* <TextField
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
                          height: "48px",
                          width: "308px",
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
                    /> */}
                  </Box>
                </>
              ) : (
                <>
                  <div>
                    <label className="labelsSec">Данные объекта</label>
                  </div>
                  <Box display="flex" alignItems="center" gap="10px">
                    <select
                      className="additionalSelect"
                      value={searchTypeFullName}
                      onChange={(e) => {
                        setSearchTypeFullName(e.target.value);
                      }}
                    >
                      <option value="startingWith">Начинается с</option>
                      <option value="exactly">В точности с</option>
                    </select>
                    {/* <Select
                      value={searchTypeFullName}
                      onChange={(e) => setSearchTypeFullName(e.target.value)}
                      sx={{
                        fontSize: "14px",
                        fontFamily: "Montserrat, sans-serif",
                        color: "#fff",
                        height: "48px",
                        width: "160px",
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

                    <div className="fioInputContainer">
                      <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="ФИО"
                      />
                    </div>
                    {/* <TextField
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
                        style: {
                          color: "#fff",
                          height: "48px",
                          width: "308px",
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
                    /> */}
                  </Box>
                </>
              )}
            </>
          </ThemeProvider>
        );
      default:
        return null;
    }
  };

  return (
    <div className="parentContainer">
      <div className="content">
        <div className="selector">
          <button
            className={`button ${
              activeButton === "WhoViewedThisUser" && "active"
            }`}
            onClick={() => {
              handleButtonClickActive("WhoViewedThisUser");
              setInfoType("WhoViewedThisUser");
              if (inputType === "EmployeeType" || inputType === "Username") {
                setInputType("IIN");
              }
            }}
          >
            ИНИЦИАТОР ЗАПРОСА
          </button>
          <button
            className={`button ${
              activeButton === "WhomThisUserViewed" && "active"
            }`}
            onClick={() => {
              handleButtonClickActive("WhomThisUserViewed");
              setInfoType("WhomThisUserViewed");
              if (inputType === "EmployeeType") {
                setInputType("IIN");
              }
            }}
          >
            ОБЪЕКТ ЗАПРОСА
          </button>
          <button
            className={`button ${activeButton === "Risks" && "active"}`}
            onClick={() => {
              handleButtonClickActive("Risks");
              setInfoType("Risks");
              setInputType("IIN");
            }}
          >
            РИСКИ
          </button>
        </div>
        <div className="containerInputs">
          <div className="Filters">
            <div className="Filter1">
              {infoType === "WhomThisUserViewed" && (
                <>
                  <label>Поиск ОЗ через</label>
                  <select
                    value={inputType}
                    onChange={(e) => {
                      setInputType(e.target.value);
                      handleButtonClick(e.target.value);
                    }}
                  >
                    <option value="IIN">ИИН/БИН</option>
                    <option value="Username">Учётная запись</option>
                    <option value="FullName">ФИО</option>
                  </select>
                </>
              )}
              {infoType === "WhoViewedThisUser" && (
                <>
                  <label>Поиск по ИЗ через</label>
                  <select
                    value={inputType}
                    onChange={(e) => {
                      setInputType(e.target.value);
                      handleButtonClick(e.target.value);
                    }}
                  >
                    <option value="IIN">ИИН/БИН</option>
                    <option value="FullName">ФИО</option>
                  </select>
                </>
              )}

              {infoType === "Risks" && (
                <>
                  <label>Поиск РИСКОВ через</label>
                  <select
                    value={inputType}
                    onChange={(e) => {
                      setInputType(e.target.value);
                      handleButtonClick(e.target.value);
                    }}
                  >
                    <option value="IIN">ИИН/БИН</option>
                    <option value="EmployeeType">Сотрудник</option>
                  </select>
                </>
              )}
            </div>
            <div className="Filter2">
              {renderInputFields()}
              {infoType !== "Risks" && (
                <Box mt={2}>
                  <button
                    className="additionalButton"
                    onClick={() => {
                      {
                        handleToggleFilters();
                      }
                    }}
                  >
                    Указать период
                  </button>
                </Box>
              )}
              {showFilters && infoType !== "Risks" && (
                <Box mt={2} sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                  <input
                    className="dataInput"
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min="2018-01-01"
                  />
                  {/* <TextField
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
                        height: "48px",
                        width: "230px",
                        borderColor: "white", // Add white border
                        borderWidth: "1px", // Border width
                        borderStyle: "solid", // Border style
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
                  /> */}
                  <input
                    className="dataInput"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min="2018-01-01"
                  />
                  {/* <TextField
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
                        height: "48px",
                        width: "230px",
                        borderColor: "white", // Add white border
                        borderWidth: "1px", // Border width
                        borderStyle: "solid", // Border style
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
                  /> */}
                </Box>
              )}
            </div>
            <div className="label3">
              <label> Информационные системы</label>
            </div>
            <div className="Filter3">
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  marginTop: "-10px",
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  {infoType === "WhomThisUserViewed" && (
                    <>
                      {inputType === "IIN" && (
                        <>
                          <select
                            className="infSystem"
                            value={source}
                            onChange={handleChange}
                          >
                            <option value="Досье">Досье "ИС СЭР"</option>
                          </select>
                          {/* <Select
                            labelId="demo-simple-select-outlined-label"
                            id="outlined-source"
                            value={source}
                            onChange={handleChange}
                            label=""
                            sx={{
                              fontSize: "14px",
                              fontFamily: "Montserrat, sans-serif",
                              color: "#fff",
                              height: "48px",
                              width: "474px",
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
                            <MenuItem value="Досье">Досье "ИС СЭР"</MenuItem>
                          </Select> */}
                          {isFilterChanged && (
                            <Typography
                              variant="caption"
                              sx={{
                                color: "red",
                                fontSize: "0.8rem",
                                marginTop: 1,
                              }}
                            >
                              Необходимо сделать новый запрос для обновления
                              данных.
                            </Typography>
                          )}
                        </>
                      )}

                      {inputType === "Username" && (
                        <>
                          <select
                            className="infSystem"
                            value={source}
                            onChange={handleChange}
                          >
                            <option value="Itap">Itap</option>
                            <option value="eias">ЕИАС</option>
                            <option value="Cascade">Каскад</option>
                          </select>
                          {/* <Select
                            labelId="demo-simple-select-outlined-label"
                            id="outlined-source"
                            value={source}
                            onChange={handleChange}
                            label=""
                            sx={{
                              fontSize: "14px",
                              fontFamily: "Montserrat, sans-serif",
                              color: "#fff",
                              height: "48px",
                              width: "474px",
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
                            <MenuItem value="Cascade">Каскад</MenuItem>
                            <MenuItem value="eias">ЕИАС</MenuItem>
                            {isFilterChanged && (
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "red",
                                  fontSize: "0.8rem",
                                  marginTop: 1,
                                }}
                              >
                                Необходимо сделать новый запрос для обновления
                                данных.
                              </Typography>
                            )}
                          </Select> */}
                        </>
                      )}

                      {inputType === "FullName" && (
                        <>
                          <select
                            className="infSystem"
                            value={source}
                            onChange={handleChange}
                          >
                            <option value="Itap">Itap</option>
                            <option value="Досье">Досье "ИС СЭР"</option>
                            <option value="Cascade">Каскад</option>
                          </select>
                          {/* <Select
                            labelId="demo-simple-select-outlined-label"
                            id="outlined-source"
                            value={source}
                            onChange={handleChange}
                            label=""
                            sx={{
                              fontSize: "14px",
                              fontFamily: "Montserrat, sans-serif",
                              color: "#fff",
                              height: "48px",
                              width: "474px",
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
                            <MenuItem value="Досье">Досье "ИС СЭР"</MenuItem>
                            <MenuItem value="Cascade">Каскад</MenuItem>

                            {isFilterChanged && (
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "red",
                                  fontSize: "0.8rem",
                                  marginTop: 1,
                                }}
                              >
                                Необходимо сделать новый запрос для обновления
                                данных.
                              </Typography>
                            )}
                          </Select> */}
                        </>
                      )}
                    </>
                  )}

                  {infoType === "WhoViewedThisUser" && (
                    <>
                      {inputType === "IIN" && (
                        <>
                          <select
                            className="infSystem"
                            value={source}
                            onChange={handleChange}
                          >
                            <option value="Itap">Itap</option>
                            <option value="Досье">Досье "ИС СЭР"</option>
                            <option value="Cascade">Каскад</option>
                          </select>
                          {/* <Select
                            labelId="demo-simple-select-outlined-label"
                            id="outlined-source"
                            value={source}
                            onChange={handleChange}
                            label=""
                            sx={{
                              fontSize: "14px",
                              fontFamily: "Montserrat, sans-serif",
                              color: "#fff",
                              height: "48px",
                              width: "474px",
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
                            <MenuItem value="Досье">Досье "ИС СЭР"</MenuItem>
                            <MenuItem value="Cascade">Каскад</MenuItem>
                          </Select> */}
                          {isFilterChanged && (
                            <Typography
                              variant="caption"
                              sx={{
                                color: "red",
                                fontSize: "0.8rem",
                                marginTop: 1,
                              }}
                            >
                              Необходимо сделать новый запрос для обновления
                              данных.
                            </Typography>
                          )}
                        </>
                      )}
                      {inputType === "FullName" && (
                        <>
                          <select
                            className="infSystem"
                            value={source}
                            onChange={handleChange}
                          >
                            <option value="Itap">Itap</option>
                            <option value="Досье">Досье "ИС СЭР"</option>
                          </select>
                          {/* <Select
                            labelId="demo-simple-select-outlined-label"
                            id="outlined-source"
                            value={source}
                            onChange={handleChange}
                            label=""
                            sx={{
                              fontSize: "14px",
                              fontFamily: "Montserrat, sans-serif",
                              color: "#fff",
                              height: "48px",
                              width: "474px",
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
                            <MenuItem value="Досье">Досье "ИС СЭР"</MenuItem>

                            {isFilterChanged && (
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "red",
                                  fontSize: "0.8rem",
                                  marginTop: 1,
                                }}
                              >
                                Необходимо сделать новый запрос для обновления
                                данных.
                              </Typography>
                            )}
                          </Select> */}
                        </>
                      )}
                    </>
                  )}
                  {infoType === "Risks" && (
                    <>
                      {inputType === "IIN" && (
                        <>
                          <select
                            className="infSystem"
                            value={source}
                            onChange={handleChange}
                          >
                            <option value="Itap">Itap</option>
                            <option value="Досье">Досье "ИС СЭР"</option>
                            <option value="Cascade">Каскад</option>
                          </select>
                          {/* <Select
                            labelId="demo-simple-select-outlined-label"
                            id="outlined-source"
                            value={source}
                            onChange={handleChange}
                            label=""
                            sx={{
                              fontSize: "14px",
                              fontFamily: "Montserrat, sans-serif",
                              color: "#fff",
                              height: "48px",
                              width: "474px",
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
                            <MenuItem value="Досье">Досье "ИС СЭР"</MenuItem>
                            <MenuItem value="Cascade">Каскад</MenuItem>
                          </Select> */}
                          {isFilterChanged && (
                            <Typography
                              variant="caption"
                              sx={{
                                color: "red",
                                fontSize: "0.8rem",
                                marginTop: 1,
                              }}
                            >
                              Необходимо сделать новый запрос для обновления
                              данных.
                            </Typography>
                          )}
                        </>
                      )}

                      {inputType === "EmployeeType" && (
                        <>
                          <select
                            className="infSystem"
                            value={source}
                            onChange={handleChange}
                          >
                            <option value="Itap">Itap</option>
                            <option value="Досье">Досье "ИС СЭР"</option>
                            <option value="Cascade">Каскад</option>
                          </select>
                          {/* <Select
                            labelId="demo-simple-select-outlined-label"
                            id="outlined-source"
                            value={source}
                            onChange={handleChange}
                            label=""
                            sx={{
                              fontSize: "14px",
                              fontFamily: "Montserrat, sans-serif",
                              color: "#fff",
                              height: "48px",
                              width: "474px",
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
                            <MenuItem value="Досье">Досье "ИС СЭР"</MenuItem>
                            <MenuItem value="Cascade">Каскад</MenuItem>

                            {isFilterChanged && (
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "red",
                                  fontSize: "0.8rem",
                                  marginTop: 1,
                                }}
                              >
                                Необходимо сделать новый запрос для обновления
                                данных.
                              </Typography>
                            )}
                          </Select> */}
                        </>
                      )}
                    </>
                  )}
                </ThemeProvider>
              </Box>
              <div className="search">
                {inputType !== "ListRisks" && (
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                      alignSelf: "flex-start",
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.75rem",
                      color: "white",
                      padding: loading ? "6px 30px 6px 12px" : "6px 12px",
                      backgroundColor: colors.secondary,
                      position: "relative",
                      overflow: "hidden",
                    }}
                    style={{ color: "white" }}
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
                        mt: 0,
                        alignSelf: "flex-start",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "0.75rem",
                        padding: downloadLoading
                          ? "6px 30px 6px 12px"
                          : "6px 12px",
                        backgroundColor: colors.secondary,
                        position: "relative",
                        overflow: "hidden",
                      }}
                      style={{ color: "white" }}
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
              </div>
            </div>
          </div>
          {/* <div className="checking">
            <div>awdwa</div>
            <div>awdwada</div>
            <div>awdwada</div> 
            <div>awdwada</div> 
            <div>awdwada</div>
            <div>awdwada</div>
            <div>awdwada</div>
            <div>awdwada</div>
            <div>awdwada</div>
            <div>awdwada</div>
            <div>awdwada</div>

          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Filters;
