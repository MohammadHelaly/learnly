import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
	baseURL: "http://localhost:5000/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
