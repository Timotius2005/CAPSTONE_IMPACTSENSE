import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Register success:", response.data);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);
      if (err.response) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Network error, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.registerPage}
      style={{ backgroundImage: "url('/images/image-2.png')" }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>ImpactSense Helmet</h1>

        {/* Tab Login / Register */}
        <div className={styles.tabContainer}>
          <button className={styles.tab} onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className={`${styles.tab} ${styles.active}`}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>

        {/* Form Register */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
