import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
	(config) => {
	  const token = localStorage.getItem("user");
	  if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	  }
	  
	  return config;
	},
	(error) => {
	  return Promise.reject(error);
	}
  );

export default api;
