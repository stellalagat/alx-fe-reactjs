import axios from "axios";

// ✅ Fetch a single user by username
export const getUser = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Advanced search with extra filters
export const searchUsers = async ({ username, location, minRepos }) => {
  try {
    // build query string
    let query = username ? `${username}` : "";

    if (location) {
      query += `+location:${location}`;
    }

    if (minRepos) {
      query += `+repos:>=${minRepos}`;
    }

    // GitHub Search API endpoint
    const response = await axios.get(
      `https://api.github.com/search/users?q=${query}`
    );

    return response.data.items; // returns list of matching users
  } catch (error) {
    throw error;
  }
};
