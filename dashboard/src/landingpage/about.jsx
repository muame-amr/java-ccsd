import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8082";

const SkeletonLoader = () => (
	<div className="animate-pulse">
		<div className="h-64 bg-gray-200 rounded-lg mb-4" />
		<div className="space-y-3">
			<div className="h-6 bg-gray-200 rounded w-3/4" />
			<div className="h-4 bg-gray-200 rounded w-full" />
			<div className="h-4 bg-gray-200 rounded w-5/6" />
		</div>
	</div>
);

const About = () => {
	const token = localStorage.getItem("jwtToken");
	const [websiteTexts, setWebsiteTexts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchWebsiteTexts = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/api/website-texts`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				setWebsiteTexts(response.data);
				setError(null);
			} catch (err) {
				setError(err.response?.data?.message || "Failed to fetch content");
				console.error("Error fetching website texts:", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchWebsiteTexts();
	}, [token]);

	if (error) {
		return (
			<div className="bg-red-50 p-4 rounded-lg max-w-md mx-auto mt-8">
				<p className="text-red-800 text-center">{error}</p>
			</div>
		);
	}

	return (
		<section id="about" className="py-20 bg-white">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{isLoading ? (
					<SkeletonLoader />
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Image Section */}
						<div className="relative">
							<div className="w-20vw h-20vw">
								<img
									src="https://files.oaiusercontent.com/file-94xEMdodBc1Uy6S55jRGxA?se=2025-01-16T13%3A41%3A02Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D7ac3ffee-d316-4927-9f1a-5b95a52fe4f7.webp&sig=09husZXeRghZHucTHH8aY4QY0ekRz41yBtGi4nZ%2Bn2Y%3D"
									alt="About Us"
									className="w-full h-full object-cover rounded-2xl"
								/>
							</div>
						</div>

						{/* Content Section */}
						<div className="space-y-8">
							<div>
								<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
									About Us
									{/* <div className="h-1 w-20 bg-indigo-600 mt-4 rounded-full" /> */}
								</h2>
								{websiteTexts.map((text, index) => (
									<p
										key={`description-${index}`}
										className="text-gray-600 leading-relaxed mb-6"
									>
										{text.postShortDescription}
									</p>
								))}
							</div>

							<div>
								<h3 className="text-2xl font-bold text-gray-900 mb-6">
									Why Choose Us?
								</h3>
								<div className="grid gap-2">
									{websiteTexts.map((text, index) => (
										<div key={`choose-${index}`} className="">
											<p className="text-gray-600">{text.title}</p>
											<p className="text-gray-600">{text.tag}</p>
										</div>
									))}
								</div>
							</div>

							{/* Stats Section */}
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t">
								{[
									{ label: "Clients", value: "200+" },
									{ label: "Projects", value: "500+" },
									{ label: "Team Members", value: "50+" },
									{ label: "Awards", value: "15+" },
								].map((stat, index) => (
									<div
										key={`stat-${index}`}
										className="text-center bg-gray-50 p-6 rounded-lg transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
									>
										<p className="text-2xl font-bold text-indigo-600">
											{stat.value}
										</p>
										<p className="text-gray-600">{stat.label}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default About;
