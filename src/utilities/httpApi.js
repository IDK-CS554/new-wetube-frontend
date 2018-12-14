import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_backend_url
});

export const fetchUsers = async roomId => {
	const result = await api.get(`/getUsers/${roomId}`);
	return result.data;
};
