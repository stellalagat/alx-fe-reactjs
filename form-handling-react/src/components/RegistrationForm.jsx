// src/components/RegistrationForm.jsx
import React, { useState } from "react";

const RegistrationForm = () => {
  // Step 1: Define states for each field
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Step 2: Handle input changes (controlled components)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Step 3: Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    setError("");
    console.log("Form submitted:", formData);
    alert(`Registration successful for ${formData.username}`);

    // Optional: Clear form after submission
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User Registration</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}

        <label style={styles.label}>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter your username"
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter your email"
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter your password"
        />

        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

// Simple inline styles for quick setup
const styles = {
  container: {
    width: "350px",
    margin: "60px auto",
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    backgroundColor: "#fafafa",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginTop: "10px",
    color: "#444",
    fontWeight: "bold",
  },
  input: {
    padding: "8px",
    marginTop: "4px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    marginTop: "20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },
};

export default RegistrationForm;
