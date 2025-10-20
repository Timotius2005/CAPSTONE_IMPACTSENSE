import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const navigate = useNavigate();

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
          <button
            className={styles.tab}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>

        {/* Form Login */}
        <form className={styles.form}>
          <label>Username</label>
          <input type="text" placeholder="Enter Username" />

          <label>Password</label>
          <input type="password" placeholder="Enter Password" />

          <button type="submit" className={styles.submitBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
