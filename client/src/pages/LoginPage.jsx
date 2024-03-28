import HelpIcon from "@mui/icons-material/Help";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import AuthInput from "../components/AuthInput";
import Auth from "../layout/Auth";
import { Link } from "react-router-dom";
function LoginPage() {
	return (
		<Auth title="Login">
			{/* Input fields */}
			<AuthInput placeholder="Email" />
			<AuthInput placeholder="Password" />
			<button className="bg-amber-500 text-black dark:text-white rounded-2xl px-5 py-3 self-end mt-8 md:px-3 md:py-2 md:mt-2 lg:px-4 lg:py-3 lg:mt-4">
				Login
			</button>
			<Link className="text-amber-500 ">
				<HelpIcon /> Forgot password?
			</Link>
			<Link className="text-amber-500" to="/register">
				<AccountCircleIcon /> Create an account?
			</Link>
		</Auth>
	);
}

export default LoginPage;
