import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8082";

const SkeletonCard = () => (
	<div className="bg-gray-100 rounded-xl p-4 space-y-4 animate-pulse">
		<div className="w-full h-64 bg-gray-200 rounded-lg" />
		<div className="h-6 bg-gray-200 rounded w-2/3 mx-auto" />
		<div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
	</div>
);

const FeatureCard = ({ image, title, tag, postShortDescription }) => (
	<div className="group p-4 transition-all duration-300 hover:transform hover:scale-105">
		<div className="bg-white rounded-xl shadow-lg overflow-hidden">
			<div className="relative aspect-video overflow-hidden">
				<img
					src={`data:image/jpeg;base64,${image}`}
					alt={title}
					className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			</div>
			<div className="px-6 py-4">
				<div className="font-bold text-2xl mb-2 text-gray-900">{title}</div>
				<p className="text-gray-600 text-base">{postShortDescription}</p>
			</div>
			<div className="px-6 pt-4 pb-2">
				<span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full font-semibold mr-2 mb-2">
					{tag}
				</span>
			</div>
		</div>
	</div>
);

const Features = () => {
	const token = localStorage.getItem("jwtToken");
	const [websiteImages, setWebsiteImages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchWebsiteImages = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/api/WebsiteImage`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				setWebsiteImages(response.data);
				setError(null);
			} catch (error) {
				console.error("Error fetching website images:", error);
				setError(error.response?.data?.message || "Failed to fetch images");
			} finally {
				setIsLoading(false);
			}
		};

		fetchWebsiteImages();
	}, [token]);

	return (
		<section id="features" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						Our Features
					</h2>
					<div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full" />
				</div>

				{/* Error State */}
				{error && (
					<div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
						<p className="text-red-800 text-center">{error}</p>
					</div>
				)}

				{/* Content Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{isLoading ? (
						// Loading State
						[...Array(6)].map((_, index) => (
							<SkeletonCard key={`skeleton-${index}`} />
						))
					) : websiteImages.length > 0 ? (
						// Images Grid
						websiteImages.map((item, index) => (
							<FeatureCard
								key={`image-${index}`}
								image={item.image}
								title={item.title}
								tag={item.tag}
								postShortDescription={item.postShortDescription}
							/>
						))
					) : (
						// Empty State
						<div className="col-span-full text-center py-12">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
								<svg
									className="w-8 h-8 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<p className="text-gray-500 text-lg">No images available</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Features;
