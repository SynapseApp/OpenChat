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
						<div className="flex flex-col justify-center basis-3/5 h-full">
							<div className="flex flex-col mx-auto h-full justify-center">
								<h1 className="text-amber-500 text-center sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
									OpenChat
								</h1>
								<h3 className="text-black dark:text-white text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl p-3">
									{props.title}
								</h3>
								{props.children}
							</div>
						</div>
						{/* Right side image */}
						<div className="basis-2/5">
							<img
								className="h-lvh absolute right-0"
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
