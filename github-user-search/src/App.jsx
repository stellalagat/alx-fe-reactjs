import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { getUser } from "./services/githubApi";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import Search from "./components/Search";

function App() {
  const [count, setCount] = useState(0)

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (username) => {
    try {
      setError("");
      const data = await getUser(username);
      setUser(data);
    } catch {
      setError("User not found");
      setUser(null);
    }
  };

  return (
    <>
     <div style={{ padding: "2rem" }}>
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && <UserCard user={user} />}
    </div>
     <div style={{ padding: "2rem" }}>
      <h1>GitHub User Search</h1>
      <Search />
    </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
       {/* 👇 Tailwind test block added here */}
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-blue-600">
        🚀 Tailwind is working without npx!
      </h1>
    </div>
    </>
  )
}

export default App
