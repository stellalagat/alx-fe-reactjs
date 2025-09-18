import { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchUserData(input.trim());
      setUser(data);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      {/* Search Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Search
        </button>
      </form>

      {/* Conditional Rendering */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && (
        <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "5px" }}>
          <img src={user.avatar_url} alt={user.login} width="100" />
          <h2>{user.name || user.login}</h2>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default Search;
