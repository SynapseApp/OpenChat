import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AuthInput from "../components/AuthInput";
import Auth from "../layout/Auth";
import { Link, Router, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import makeRequest from "../utils/makeRequest";
import config from "../utils/config";
import validateInput from "../utils/validateInput";

function RegisterPage({ isAuthenticated, setIsAuthenticated, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [valid, setValid] = useState(true);
  const [feedback, setFeedback] = useState("");

  const validate = () => {
    const emailValidity = validateInput(email, "email");
    const usernameValidity = validateInput(username, "username");
    const passwordValidity = validateInput(password, "password");

    setValid(
      emailValidity.isValid &&
        usernameValidity.isValid &&
        passwordValidity.isValid &&
        password === password2
    );

    if (!emailValidity.isValid) {
      setFeedback(emailValidity.feedback);
    } else if (!usernameValidity.isValid) {
      setFeedback(usernameValidity.feedback);
    } else if (!passwordValidity.isValid) {
      setFeedback(passwordValidity.feedback);
    } else if (password !== password2) {
      setFeedback("Passwords do not match.");
    } else {
      setFeedback("");
    }

    return (
      emailValidity.isValid &&
      usernameValidity.isValid &&
      passwordValidity.isValid &&
      password === password2
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);
    const valid = validate();
    if (valid) {
      const response = await makeRequest(
        `${config.SERVER_URL}/user/register`,
        "POST",
        { username, email, password }
      );
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.data);
        // window.location.reload();
      } else {
        setValid(false);
        setFeedback("Email or Username already used");
      }
    }
    setDisabled(false);
  };
  return (
    <Auth title="Register">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full justify-center "
      >
        <div className="text-red-600">{!valid && feedback}</div>
        {/* Input fields */}
        <AuthInput
          placeholder="Username"
          useValue={[username, setUsername]}
          disabled={disabled}
        />
        <AuthInput
          placeholder="Email"
          useValue={[email, setEmail]}
          disabled={disabled}
          type="email"
        />
        <AuthInput
          placeholder="Password"
          useValue={[password, setPassword]}
          disabled={disabled}
          type="password"
        />
        <AuthInput
          placeholder="Re-type password"
          useValue={[password2, setPassword2]}
          disabled={disabled}
          type="password"
        />
        <button
          type="submit"
          className="bg-amber-500 text-black dark:text-white rounded-2xl px-5 py-3 self-end mt-8 md:px-3 md:py-2 md:mt-2 lg:px-4 lg:py-3 lg:mt-4"
        >
          Register
        </button>
      </form>
      <Link className="text-amber-500" to="/login">
        <AccountCircleIcon /> Already have an account?
      </Link>
    </Auth>
  );
}

export default RegisterPage;
