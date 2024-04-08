import HelpIcon from "@mui/icons-material/Help";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import AuthInput from "../components/AuthInput";
import Auth from "../layout/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import makeRequest from "../utils/makeRequest";
import config from "../utils/config";
function LoginPage({ globalData }) {
	const { isAuthenticated, setIsAuthenticated, setUser } = globalData;

	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/home");
		}
	}, [isAuthenticated]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [disabled, setDisabled] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setDisabled(true);
		if (email && password) {
			const response = await makeRequest(
				`${config.SERVER_URL}/user/login`,
				"POST",
				{ username: email, password }
			);
			console.log(response);
			if (response.success) {
				setIsAuthenticated(true);
				setUser(response.data);
				// window.location.reload();
			}
		}
		setDisabled(false);
	};
	return (
		<Auth title="Login">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col w-full justify-center "
			>
				{/* Input fields */}

				<AuthInput
					placeholder="Email"
					useValue={[email, setEmail]}
					disabled={disabled}
				/>
				<AuthInput
					placeholder="Password"
					useValue={[password, setPassword]}
					disabled={disabled}
				/>

				<button
					type="submit"
					className="bg-amber-500 text-black dark:text-white rounded-2xl px-5 py-3 self-end mt-8 md:px-3 md:py-2 md:mt-2 lg:px-4 lg:py-3 lg:mt-4"
				>
					Login
				</button>
			</form>
			<Link className="text-amber-500" to="/register">
				<AccountCircleIcon /> Create an account
			</Link>
		</Auth>
	);
}

export default LoginPage;
