import { useState } from "react";
import { searchUsers } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const data = await searchUsers({ username, location, minRepos });
      setResults(data.items || []); // GitHub returns results in `items`
    } catch (err) {
      setError("Failed to fetch users. Try again.");
      setResults([]);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="number"
          placeholder="Min Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.map((user) => (
          <li key={user.id} style={{ marginBottom: "0.5rem" }}>
            <img
              src={user.avatar_url}
              alt={user.login}
              width={40}
              style={{ marginRight: "0.5rem" }}
            />
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
