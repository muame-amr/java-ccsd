import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8082";

const ProductSkeleton = () => (
	<div className="animate-pulse bg-white rounded-2xl shadow-lg p-4">
		<div className="h-64 bg-gray-200 rounded-xl mb-4" />
		<div className="space-y-3">
			<div className="h-6 bg-gray-200 rounded w-3/4" />
			<div className="h-8 bg-gray-200 rounded w-1/3" />
			<div className="h-4 bg-gray-200 rounded w-full" />
			<div className="h-10 bg-gray-200 rounded w-1/2" />
		</div>
	</div>
);

const ProductCard = ({ product }) => (
	<div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-105">
		{/* Image Container */}
		<div className="aspect-[4/3] overflow-hidden">
			{product.imageStore ? (
				<img
					src={`data:image/jpeg;base64,${product.imageStore}`}
					alt={product.title}
					className="w-full h-full object-cover"
				/>
			) : (
				<div className="w-full h-full bg-gray-100 flex items-center justify-center">
					<span className="text-black">No image available</span>
				</div>
			)}
		</div>

		{/* Content Container */}
		<div className="p-6">
			<div className="mb-4">
				<span className="text-4xl font-semibold text-gray-900">
					{product.title}
				</span>
			</div>
			<div className="flex items-center mb-4">
				<span className="text-2xl font-bold text-indigo-600">
					RM {product.tag}
				</span>
			</div>
			<span className=" text-gray-600 mb-6 line-clamp-3">
				{product.postShortDescription}
			</span>
			<a
				href={`payment/${product.postSlug}`}
				className="block w-full text-center bg-indigo-100 text-indigo-900 border-solid border-indigo-600 border-2 py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 hover:text-white transition-colors duration-300"
			>
				Buy Now
			</a>
		</div>
	</div>
);

const Services = () => {
	const token = localStorage.getItem("jwtToken");
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/api/products`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				setProducts(response.data);
				setError(null);
			} catch (err) {
				setError(err.response?.data?.message || "Failed to fetch products");
				console.error("Error fetching products:", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, [token]);

	return (
		<section id="services" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Our Services
					</h2>
					<div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full" />
				</div>

				{/* Error Display */}
				{error && (
					<div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
						<p className="text-red-800 text-center">{error}</p>
					</div>
				)}

				{/* Products Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{isLoading ? (
						// Loading State
						[...Array(6)].map((_, index) => (
							<ProductSkeleton key={`skeleton-${index}`} />
						))
					) : products.length > 0 ? (
						// Products Display
						products.map((product, index) => (
							<ProductCard key={`${product.name}-${index}`} product={product} />
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
							<p className="text-gray-500 text-lg">No products available</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Services;
