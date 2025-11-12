import React from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./LandingPage.module.css";

function LandingPage() {
  const navigate = useNavigate(); 
  return (
    <div className={styles.landing}
    style={{ backgroundImage: "url('/images/image-2.png')" }}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>ImpactSense Helmet</h1>
        <p className={styles.subtitle}>
          Real-Time Crash Detection
        </p>
        <button 
          className={styles.button}
          onClick={() => navigate("/login")} 
        >
          + Add New Device
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
