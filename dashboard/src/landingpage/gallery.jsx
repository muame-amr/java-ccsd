import React, { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8082";

const GallerySkeleton = () => (
	<div className="animate-pulse bg-white rounded-2xl shadow-lg p-4">
		<div className="h-48 bg-gray-200 rounded-xl mb-4" />
		<div className="space-y-3">
			<div className="h-5 bg-gray-200 rounded w-2/3" />
			<div className="h-4 bg-gray-200 rounded w-1/2" />
			<div className="h-4 bg-gray-200 rounded w-1/3" />
			<div className="h-4 bg-gray-200 rounded w-1/4" />
		</div>
	</div>
);

const GalleryItem = ({ item }) => (
	<div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105">
		<div className="aspect-[4/3] overflow-hidden">
			{item.image ? (
				<img
					src={`data:image/jpg;base64,${item.image}`}
					alt={item.title}
					className="w-full h-full object-cover"
				/>
			) : (
				<div className="w-full h-full bg-gray-100 flex items-center justify-center">
					<svg
						className="w-12 h-12 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				</div>
			)}
		</div>

		<div className="p-4">
			<h3 className="text-lg font-medium text-gray-900 truncate">
				{item.title}
			</h3>
			<p className="text-sm text-gray-600 mt-2 line-clamp-2">
				{item.postShortDescription}
			</p>
			<p className="text-xs text-gray-500 mt-4 text-right">
				{new Date(item.date).toLocaleDateString()}
			</p>
		</div>
	</div>
);

export const Gallery = () => {
	const token = localStorage.getItem("jwtToken");
	const [gallery, setGallery] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedTag, setSelectedTag] = useState("all");

	useEffect(() => {
		const fetchGallery = async () => {
			try {
				const response = await fetch(`${API_BASE_URL}/api/gallery`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) throw new Error("Failed to fetch gallery");

				const data = await response.json();
				setGallery(data);
				setError(null);
			} catch (err) {
				setError(err.message || "Failed to fetch gallery");
				console.error("Error fetching gallery:", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchGallery();
	}, [token]);

	// Get unique tags
	const tags = ["all", ...new Set(gallery.map((item) => item.tag))];

	// Filter gallery items based on selected tag
	const filteredGallery =
		selectedTag === "all"
			? gallery
			: gallery.filter((item) => item.tag === selectedTag);

	return (
		<section id="portfolio" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Gallery
					</h2>
					<div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full mb-8" />
					<p className="text-gray-600 max-w-2xl mx-auto">
						Browse our gallery to see our IT services in action
					</p>
				</div>

				{/* Tags Filter */}
				{/* {!isLoading && !error && (
					<div className="flex flex-wrap gap-2 justify-center mb-12">
						{tags.map((tag) => (
							<button
								key={tag}
								onClick={() => setSelectedTag(tag)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300
                  ${
										selectedTag === tag
											? "bg-indigo-600 text-white"
											: "bg-white text-gray-700 hover:bg-indigo-50"
									} border border-gray-200`}
							>
								{tag.charAt(0).toUpperCase() + tag.slice(1)}
							</button>
						))}
					</div>
				)} */}

				{/* Error Display */}
				{error && (
					<div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
						<p className="text-red-800 text-center">{error}</p>
					</div>
				)}

				{/* Gallery Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{isLoading ? (
						// Loading State
						[...Array(6)].map((_, index) => (
							<GallerySkeleton key={`skeleton-${index}`} />
						))
					) : filteredGallery.length > 0 ? (
						// Gallery Display
						filteredGallery.map((item, index) => (
							<GalleryItem key={`${item.title}-${index}`} item={item} />
						))
					) : (
						// Empty State
						<div className="col-span-full text-center py-12">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
								<svg
									className="w-8 h-8 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M20 12H4"
									/>
								</svg>
							</div>
							<p className="text-gray-500 text-lg">
								No gallery items available
							</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Gallery;
