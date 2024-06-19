import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
	baseURL:
		process.env.NODE_ENV === "development"
			? (process.env.REACT_APP_API_URL_LOCAL as string)
			: (process.env.REACT_APP_API_URL as string),
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
			!error.response.config.__isRetryRequest &&
			error.response.config.url !== "/users/login" // TODO: Check if this is the correct way to handle this + Look into adding more routes to this condition
		) {
			localStorage.removeItem("user");
			window.location.href = "/log-in";
		}
		return Promise.reject(error);
	}
);

export default api;
