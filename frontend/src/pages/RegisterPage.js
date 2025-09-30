import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div
      className={styles.registerPage}
      style={{ backgroundImage: "url('/images/image-2.png')" }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>ImpactSense Helmet</h1>

        {/* Tab Login/Daftar */}
        <div className={styles.tabContainer}>
          <button
            className={styles.tab}
            onClick={() => navigate("/login")}
          >
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
        <form className={styles.form}>
          <label>Username</label>
          <input type="text" placeholder="Enter Username" />

          <label>Password</label>
          <input type="password" placeholder="Enter Password" />

          <button type="submit" className={styles.submitBtn}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
