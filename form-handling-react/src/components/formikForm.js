// src/components/formikForm.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ✅ Validation Schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const FormikForm = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User Registration (Formik)</h2>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Form Submitted:", values);
          alert(`Registration successful for ${values.username}`);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form style={styles.form}>
            <label style={styles.label}>Username</label>
            <Field
              type="text"
              name="username"
              placeholder="Enter your username"
              style={styles.input}
            />
            <ErrorMessage
              name="username"
              component="div"
              style={styles.error}
            />

            <label style={styles.label}>Email</label>
            <Field
              type="email"
              name="email"
              placeholder="Enter your email"
              style={styles.input}
            />
            <ErrorMessage
              name="email"
              component="div"
              style={styles.error}
            />

            <label style={styles.label}>Password</label>
            <Field
              type="password"
              name="password"
              placeholder="Enter your password"
              style={styles.input}
            />
            <ErrorMessage
              name="password"
              component="div"
              style={styles.error}
            />

            <button
              type="submit"
              style={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// Inline styles for consistency
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

export default FormikForm;
