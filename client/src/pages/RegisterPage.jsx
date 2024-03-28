import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AuthInput from "../components/AuthInput";
import Auth from "../layout/Auth";
import { Link } from "react-router-dom";

function RegisterPage() {
	return (
		<Auth title="Register">
			{/* Input fields */}
			<AuthInput placeholder="Email" />
			<AuthInput placeholder="Password" />
			<AuthInput placeholder="Re-type password" />
			<button className="bg-amber-500 text-black dark:text-white rounded-2xl px-5 py-3 self-end mt-8 md:px-3 md:py-2 md:mt-2 lg:px-4 lg:py-3 lg:mt-4">
				Register
			</button>
			<Link className="text-amber-500" to="/login">
				<AccountCircleIcon /> Already have an account?
			</Link>
		</Auth>
	);
}

export default RegisterPage;
