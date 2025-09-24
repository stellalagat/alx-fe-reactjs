import axios from "axios";

const BASE_URL = "https://api.github.com";

// Fetch a single user by username
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Advanced user search with filters
export const searchUsers = async ({ username, location, minRepos }) => {
  try {
    // Build query string dynamically
    let query = username ? `${username}` : "";

    if (location) {
      query += `+location:${location}`;
    }

    if (minRepos) {
      query += `+repos:>${minRepos}`;
    }

    const response = await axios.get(`${BASE_URL}/search/users?q=${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
