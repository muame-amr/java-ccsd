import React from "react";

const Header = ({ data }) => {
	return (
		<header className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Background with overlay */}
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90 z-10" />
        <div className="absolute inset-0 bg-[url('https://files.oaiusercontent.com/file-8wbRwJ3HwTv8WT9XLvGXTB?se=2025-01-16T13%3A19%3A40Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc2d89253-8843-441c-b1c9-e791c2376c2a.webp&sig=Ta81QkklBbfe1IQanOa4Km3Bq%2BK/kxX47ZC/yJJiMwQ%3D')] bg-cover bg-center bg-no-repeat" />
			</div>

			{/* Content */}
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
				<div className="text-center max-w-3xl mx-auto">
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
						{data?.title || "We Build Digital Solutions"}
						<span className="block text-indigo-400 mt-2"> 
							For Tomorrow's World
						</span>
					</h1>

					<p className="text-lg sm:text-xl text-gray-200 mb-8 animate-fade-in-delay">
						{data?.paragraph ||
							"Transforming businesses through innovative technology solutions, expert consultation, and strategic digital transformation."}
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
						<a
							href="#features"
							className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold 
                       hover:bg-indigo-500 transform hover:-translate-y-1 
                       transition-all duration-300 shadow-lg hover:shadow-xl
                       w-full sm:w-auto"
						>
							Explore Our Features
						</a>
						<a
							href="#contact"
							className="px-8 py-3 bg-transparent border-2 border-white text-white 
                       rounded-lg font-semibold hover:bg-white hover:text-indigo-900 
                       transform hover:-translate-y-1 transition-all duration-300
                       w-full sm:w-auto"
						>
							Contact Us
						</a>
					</div>

					{/* Scroll Indicator */}
					{/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
						<svg
							className="w-6 h-6 text-white"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
						</svg>
					</div> */}
				</div>
			</div>
		</header>
	);
};

export default Header;
