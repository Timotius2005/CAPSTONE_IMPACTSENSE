import React from "react";
import { useNavigate } from "react-router-dom"; // 👈 tambahkan ini
import styles from "./LandingPage.module.css";

function LandingPage() {
  const navigate = useNavigate(); // 👈 hook untuk pindah halaman

  return (
    <div className={styles.landing}
    style={{ backgroundImage: "url('/images/image-2.png')" }}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>ImpactSense Helmet</h1>
        <p className={styles.subtitle}>
          Real-Time Crash Detection, Real-Life
        </p>
        <button 
          className={styles.button}
          onClick={() => navigate("/login")} // 👈 arahkan ke LoginPage
        >
          + Add New Device
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
