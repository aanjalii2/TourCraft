import axios from "axios";

const ApiService = (token = null) =>
	axios.create({
		baseURL: "http://localhost:8000",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	});

export default ApiService;
