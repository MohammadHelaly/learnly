import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
	baseURL: "http://localhost:5000/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (
			error.response.status === 401 &&
			error.response.config &&
			!error.response.config.__isRetryRequest
		) {
			localStorage.removeItem("user");
			window.location.href = "/log-in";
		}
		return Promise.reject(error);
	}
);

export default api;
