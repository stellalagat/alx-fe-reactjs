import axios from "axios";

const API_URL = import.meta.env.VITE_APP_GITHUB_API_URL;
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

export const getUser = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users/${username}`, {
      headers: API_KEY ? { Authorization: `token ${API_KEY}` } : {}
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
