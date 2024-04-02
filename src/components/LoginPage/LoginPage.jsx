import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../LoginPage/LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Snackbar, Alert } from "@mui/material";
import Loading from "../../assets/loading.gif";

// import backVideoLogin from "../../assets/backVideoLogin.mp4";
function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isAuthenticated, setIsAuthenticated, logout } = useAuth();
  const isAuthenticatedRef = useRef(isAuthenticated);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const checkTokenValidity = (token) => {
    if (!token) return false;
    const expirationTime = localStorage.getItem("token_expiration");
    return Date.now() < Number(expirationTime);
  };


  useEffect(() => {
    isAuthenticatedRef.current = isAuthenticated;
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/data-input');
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const cleanAll = () => {
    setLogin("");
    setPassword("");
    setShowPassword(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.30.24:5220/login",
        {
          username: login,
          password: password,
        },
        {
          maxRedirects: 0,
        }
      );
  
      if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("username", login);
  
        // Set token expiration time (e.g., 8 hours from now)
        const expirationTime = new Date().getTime() + 8 * 60 * 60 * 1000;
        localStorage.setItem("token_expiration", expirationTime);
  
        // Update authentication context
        setIsAuthenticated(true);
  
        // Redirect only if the token is valid
        if (checkTokenValidity(response.data.access_token)) {
          navigate("/data-input");
        } else {
          // Token expired, clear stored token and logout
          localStorage.removeItem("access_token");
          localStorage.removeItem("username");
          localStorage.removeItem("token_expiration");
          setIsAuthenticated(false);
          navigate("/");
        }
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      setLoading(false);
      setErrorDisplay(true);
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Неправильное имя пользователя или пароль");
        } else {
          setErrorMessage("Неизвестная ошибка сервера");
        }
      } else if (error.message === "Network Error") {
        setErrorMessage("Ошибка сети: Не удалось подключиться к серверу");
      } else {
        setErrorMessage("Неизвестная ошибка");
      }
      setSnackbarOpen(true);
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Adjust as needed
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      {/* <video autoPlay muted loop className="video-background">
        <source src={backVideoLogin} type="video/mp4" />

      </video> */}
      <div className="login-page">
        <div className="login-form-block">
          <div className="header">
            <h1 className="login">O c u l u s</h1>
          </div>
          <div className="body">
            <div className="input-line">
              <label htmlFor="">Логин</label>
              <div className="login-container">
                <div className="icon">
                  <svg
                    fill="#808080"
                    viewBox="-2.4 -2.4 28.80 28.80"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#808080"
                      strokeWidth="0.096"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"></path>
                    </g>
                  </svg>
                </div>
                <input
                  className="inputText"
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="Введите логин"
                  name=""
                  id=""
                />
              </div>
            </div>
            <div className="input-line">
              <label htmlFor="">Пароль</label>
              <div className="password-container">
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                        stroke="#808080"
                        strokeWidth="1.5"
                      ></path>{" "}
                      <path
                        d="M11 12C11 13.3807 9.88071 14.5 8.5 14.5C7.11929 14.5 6 13.3807 6 12C6 10.6193 7.11929 9.5 8.5 9.5C9.88071 9.5 11 10.6193 11 12Z"
                        stroke="#808080"
                        strokeWidth="1.5"
                      ></path>{" "}
                      <path
                        d="M11 12H15.5M15.5 12H17C17.5523 12 18 12.4477 18 13V14M15.5 12V13.5"
                        stroke="#808080"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="password-input"
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="toggle-password"
                  aria-label={
                    showPassword ? "Скрыть пароль" : "Показать пароль"
                  }
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFF"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        stroke="#808080"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" />
                        <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" />
                      </g>
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFF"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                          stroke="#808080"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="footer">
            <button className="clear" onClick={() => cleanAll()}>
              Очистить
            </button>
            <button className="submit" onClick={handleLogin}>
              {/* Conditionally render loading GIF */}
              {loading ? (
                <img
                  src={Loading}
                  alt="Loading"
                  style={{ width: "20px", height: "20px" }}
                />
              ) : (
                "Войти"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
