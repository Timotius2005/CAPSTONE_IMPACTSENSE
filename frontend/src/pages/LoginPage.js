import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
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

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login",
        {
          username: formData.username,
          password: formData.password,
        },
        { withCredentials: true }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      alert("Login successful!");
      navigate("/devices");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div
      className={styles.loginPage}
      style={{ backgroundImage: "url('/images/image-2.png')" }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>ImpactSense Helmet</h1>

        {/* Tab Login/Daftar */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tab} ${styles.active}`}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button className={styles.tab} onClick={() => navigate("/register")}>
            Register
          </button>
        </div>

        {/* Form Login */}
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

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className={styles.submitBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;