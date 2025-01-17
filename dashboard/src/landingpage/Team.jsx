import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_BASE_URL = "http://localhost:8082";

const TeamMemberSkeleton = () => (
	<div className="animate-pulse bg-white rounded-2xl shadow-lg p-4">
		<div className="h-48 w-48 mx-auto bg-gray-200 rounded-full mb-4" />
		<div className="space-y-3">
			<div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
			<div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
		</div>
	</div>
);

const TeamMember = ({ member }) => (
	<div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
		<div className="relative mb-6">
			{member.profPic ? (
				<img
					src={`data:image/jpeg;base64,${member.profPic}`}
					alt={member.firstName}
					className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-indigo-100"
				/>
			) : (
				<div className="w-48 h-48 rounded-full mx-auto bg-indigo-100 flex items-center justify-center">
					<span className="text-4xl font-semibold text-indigo-600">
						{member.firstName.charAt(0)}
					</span>
				</div>
			)}
		</div>
		<h3 className="text-xl font-semibold text-gray-900 mb-2">
			{member.firstName}
		</h3>
		<p className="text-indigo-600 font-medium">{member.role}</p>
	</div>
);

const Team = () => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTeam = async () => {
			const token = localStorage.getItem("jwtToken");
			try {
				const response = await fetch(`${API_BASE_URL}/api/users`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) throw new Error("Failed to fetch team members");

				const data = await response.json();
				setUsers(data);
				setError(null);
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchTeam();
	}, []);

	return (
		<section id="team" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Meet the Team
					</h2>
					<div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full mb-8" />
					<p className="text-gray-600 max-w-2xl mx-auto">
						Our team of dedicated professionals working to deliver excellence in
						IT services
					</p>
				</div>

				{error && (
					<div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
						<p className="text-red-800 text-center">{error}</p>
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{isLoading ? (
						[...Array(4)].map((_, index) => (
							<TeamMemberSkeleton key={`skeleton-${index}`} />
						))
					) : users.length > 0 ? (
						users.map((member, index) => (
							<TeamMember
								key={`${member.firstName}-${index}`}
								member={member}
							/>
						))
					) : (
						<div className="col-span-full text-center py-12">
							<p className="text-gray-500">No team members available</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Team;
