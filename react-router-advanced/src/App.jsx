// src/App.jsx
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./components/Home";
import Profile from "./components/Profile";
import ProfileDetails from "./components/ProfileDetails";
import ProfileSettings from "./components/ProfileSettings";
import BlogPost from "./components/BlogPost";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <button onClick={() => setIsAuthenticated(!isAuthenticated)}>
          {isAuthenticated ? "Logout" : "Login"}
        </button>

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Protected Profile route with nested routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>

          {/* Dynamic route example */}
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
