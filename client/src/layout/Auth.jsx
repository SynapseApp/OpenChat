import AuthDarkImg from "../assets/AuthDark.svg";
import AuthLightImg from "../assets/AuthLight.svg";

export default function Auth(props) {
	return (
		<>
			<div className="bg-white dark:bg-[#020617]">
				{/* Large screens layout */}
				<div className="large-screens hidden sm:block h-[100vh]">
					<div className="w-auto flex flex-row h-full">
						{/* Left side content */}
						<div className="flex flex-col pl-10 w-[60vw] h-full relative z-10 bg-slate-950/50 ">
							<div className="py-10 flex flex-col h-full justify-center items-center">
								<h1 className="text-amber-500 text-center sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
									OpenChat
								</h1>
								<h3 className="text-black dark:text-white text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl p-3">
									{props.title}
								</h3>
								{props.children}
							</div>
						</div>
						{/* Right side image */}
						<div className="">
							<img
								className="h-lvh w-[40vw] absolute right-0"
								src={
									window.matchMedia(
										"(prefers-color-scheme: dark)"
									)
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
							<h1 className="text-amber-500 text-center text-7xl">
								OpenChat
							</h1>
							<h3 className="text-black dark:text-white text-center text-4xl m-3">
								{props.title}
							</h3>
							{props.children}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
