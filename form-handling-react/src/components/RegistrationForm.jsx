// src/components/RegistrationForm.jsx
import React, { useState } from "react";

const RegistrationForm = () => {
  // Controlled component states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error state (object form)
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors first
    const newErrors = {};

    // ✅ Explicit validation checks
    if (!username) {
      newErrors.username = "Username is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    // Update error state
    setErrors(newErrors);

    // Stop submission if there are errors
    if (Object.keys(newErrors).length > 0) return;

    // Otherwise, form is valid
    console.log("Form submitted:", { username, email, password });
    alert(`Registration successful for ${username}`);

    // Reset fields
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User Registration</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          placeholder="Enter your username"
        />
        {errors.username && <p style={styles.error}>{errors.username}</p>}

        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          placeholder="Enter your email"
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}

        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          placeholder="Enter your password"
        />
        {errors.password && <p style={styles.error}>{errors.password}</p>}

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

// Basic inline styling
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
    fontSize: "0.9em",
    marginTop: "5px",
  },
};

export default RegistrationForm;
