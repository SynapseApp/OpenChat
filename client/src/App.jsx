import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import makeRequest from "./utils/makeRequest";
import config from "./utils/config";

function App() {
  // const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const globalData = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
  };
  useEffect(() => {
    async function checkAuth() {
      const response = await makeRequest(
        `${config.SERVER_URL}/user/is-authenticated`
      );
      if (response.success) {
        console.log(response);
        setIsAuthenticated(true);
        setUser(response.data);
        // navigate("/home");
      } else {
        setIsAuthenticated(false);
        setUser(null);
        // navigate("/register");
      }
    }
    checkAuth();
  }, []);

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  return (
    <>
      {user === undefined ? (
        "Loading"
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<About {...globalData} />} />
            <Route
              path="/register"
              element={<RegisterPage {...globalData} />}
            />
            <Route path="/login" element={<LoginPage {...globalData} />} />
            <Route path="/home" element={<HomePage {...globalData} />} />
            <Route path="/about" element={<About {...globalData} />} />
            <Route path="*" element={<NotFound {...globalData} />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
