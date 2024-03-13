import AuthDarkImg from "../assets/AuthDark.svg";
import AuthLightImg from "../assets/AuthLight.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AuthInput from "../Components/AuthInput";

function RegisterPage() {
  return (
    <div className="bg-white dark:bg-[#020617]">
      {/* Large screens layout */}
      <div className="large-screens hidden sm:block">
        <div className="w-auto flex flex-row">
          {/* Left side content */}
          <div className="flex flex-col justify-center basis-3/5">
            <div className="flex flex-col mx-auto h-full justify-center">
              <h1 className="text-amber-500 text-center sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                OpenChat
              </h1>
              <h3 className="text-black dark:text-white text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl p-3">
                Register
              </h3>
              {/* Input fields */}
              <AuthInput placeholder="Email" />
              <AuthInput placeholder="Password" />
              <AuthInput placeholder="Re-type password" />
              <button className="bg-amber-500 text-black dark:text-white rounded-2xl px-5 py-3 self-end mt-8 md:px-3 md:py-2 md:mt-2 lg:px-4 lg:py-3 lg:mt-4">
                Register
              </button>
              <a className="text-amber-500" href="/login">
                <AccountCircleIcon /> Already have an account?
              </a>
            </div>
          </div>
          {/* Right side image */}
          <div className="basis-2/5">
            <img
              className="h-lvh"
              src={
                window.matchMedia("(prefers-color-scheme: dark)")
                  ? AuthDarkImg
                  : AuthLightImg
              }
            />
          </div>
        </div>
      </div>
      {/* Mobile screens layout */}
      <div className="mobile-screens sm:hidden">
        <div className="flex flex-col h-lvh ">
          <div className="flex flex-col mx-auto h-full justify-center">
            <h1 className="text-amber-500 text-center text-7xl">OpenChat</h1>
            <h3 className="text-black dark:text-white text-center text-4xl m-3">
              Register
            </h3>
            <AuthInput placeholder="Email" />
            <AuthInput placeholder="Password" />
            <AuthInput placeholder="Re-type password" />
            <button className="bg-amber-500 text-white rounded-2xl px-5 py-3 self-end">
              Register
            </button>
            <a className="text-amber-500" href="/login">
              <AccountCircleIcon /> Already have an account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
