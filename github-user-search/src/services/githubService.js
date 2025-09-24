import axios from "axios";

const BASE_URL = "https://api.github.com/users";

// Fetch a single user by username
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search users by query (advanced search endpoint)
export const searchUsers = async (query) => {
  try {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${query}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
