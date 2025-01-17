import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_BASE_URL = "http://localhost:8082";

const TeamMemberSkeleton = () => (
	<div className="animate-pulse bg-white rounded-xl shadow-md p-6">
		<div className="h-40 w-40 mx-auto bg-gray-200 rounded-full mb-6" />
		<div className="space-y-3">
			<div className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
			<div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
		</div>
	</div>
);

const TeamMember = ({ member }) => (
	<div className="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
		<div className="relative mb-6">
			{member.profPic ? (
				<img
					src={`data:image/jpeg;base64,${member.profPic}`}
					alt={member.firstName}
					className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-indigo-50"
				/>
			) : (
				<div className="w-40 h-40 rounded-full mx-auto bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
					<span className="text-4xl font-semibold text-indigo-600">
						{member.firstName.charAt(0)}
					</span>
				</div>
			)}
		</div>
		<h3 className="text-2xl font-bold text-gray-900 mb-2">
			{member.firstName} {member.lastName}
		</h3>
		<p className="text-indigo-600 font-medium">{member.role}</p>
	</div>
);

export const Team = () => {
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
		<section id="team" className="py-20 bg-gradient-to-b from-gray-50 to-white">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Meet Our Team
					</h2>
					<div className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-8" />
					<p className="text-gray-600 max-w-2xl mx-auto text-lg">
						Our team of dedicated professionals is here to deliver excellence in
						IT services and innovation.
					</p>
				</div>

				{error && (
					<div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
						<p className="text-red-800 text-center">{error}</p>
					</div>
				)}

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
