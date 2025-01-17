import axios from "axios";

const API_BASE_URL = "http://localhost:8082";

const AuthService = {
	async login(email, password) {
		try {
			// const response = await axios.post(`${API_BASE_URL}/api/users`, {
			//     email,
			//     password,

			// },
			password = btoa(password);
			const response = await axios({
				method: "post",
				url: `${API_BASE_URL}/api/users/signin`, // Updated port to 8082
				data: {
					email: email,
					password: password,
				},
				headers: {
					"Content-Type": "application/json",
				},
			});

			// If successful, response.data will contain the redirectUrl
			if (response.data && response.data.redirectUrl) {
				// Redirect to the dashboard
				window.location.href = response.data.redirectUrl;
			}

			return response.data;
		} catch (error) {
			if (error.response) {
				// The server responded with a status code outside the 2xx range
				if (error.response.status === 401) {
					throw new Error("Invalid email or password");
				}
				throw new Error(error.response.data);
			} else if (error.request) {
				// The request was made but no response was received
				throw new Error("No response received from server");
			} else {
				// Something happened in setting up the request
				throw new Error("Error setting up the request");
			}
		}
	},

	async addTeamSave(
		email,
		password,
		firstName,
		lastName,
		phone,
		address,
		role,
		userName
	) {
		const username = await localStorage.getItem("userName");

		password = btoa(password);
		try {
			// {
			// 	params: {
			// 		username: userName,
			// 		email: email,
			// 		password: password,
			// 		firstName: firstName,
			// 		lastName: lastName,
			// 		phoneNumber: phone,
			// 		address: address,
			// 		role: role,
			// 	},
			// },
			const response = await axios.post(
				`${API_BASE_URL}/api/users?username=${username}
				&email=${email}
				&password=${password}
				&firstName=${firstName}
				&lastName=${lastName}
				&phoneNumber=${phone}
				&address=${address}
				&role=${role}`,
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "*/*",
					},
				}
			);

			if (response.status === 200) {
				return response.data;
			}
		} catch (error) {
			if (error.response) {
				console.error("Server responded with an error:", error.response.data);
			} else if (error.request) {
				console.error("No response received:", error.request);
			} else {
				console.error("Error setting up the request:", error.message);
			}
			throw error;
		}
	},
};

export default AuthService;
