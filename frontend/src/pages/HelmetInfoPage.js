import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HelmetInfoPage.module.css";

function HelmetInfoPage() {
  const [helmetId, setHelmetId] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate("/devices", {
      state: {
        newDevice: {
          id: helmetId,
          status: "Disconnected",
          contact: emergencyContact,
        },
      },
    });
  };

  return (
    <div
      className={styles.helmetPage}
      style={{ backgroundImage: "url('/images/image-2.png')" }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>ImpactSense Helmet</h1>

        <div className={styles.tabContainer}>
          <button className={`${styles.tab} ${styles.active}`}>
            Informasi Helm
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>ID Helm</label>
          <input
            type="text"
            placeholder="Masukkan ID Helm"
            value={helmetId}
            onChange={(e) => setHelmetId(e.target.value)}
            className={styles.input}
            required
          />

          <label className={styles.label}>Nomor Kontak Darurat</label>
          <div className={styles.phoneGroup}>
            <span className={styles.phonePrefix}>+62</span>
            <input
              type="text"
              placeholder="8123456789"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              className={styles.phoneInput}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default HelmetInfoPage;
