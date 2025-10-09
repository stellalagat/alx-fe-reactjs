// src/components/Profile.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Profile() {
  return (
    <div>
      <h2>My Profile</h2>
      <nav>
        <Link to="details">Details</Link> |{" "}
        <Link to="settings">Settings</Link>
      </nav>
      <hr />
      <Outlet /> {/* Nested route content appears here */}
    </div>
  );
}
