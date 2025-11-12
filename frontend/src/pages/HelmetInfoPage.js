import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./HelmetInfoPage.module.css";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function HelmetInfoPage() {
  const [helmetId, setHelmetId] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedPhone = emergencyContact.startsWith("0")
      ? emergencyContact
      : "0" + emergencyContact;

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/helm`,
        {
          serial_number: helmetId, 
          emergency_phone: formattedPhone, 
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Helm berhasil ditambahkan:", response.data);
      navigate("/devices", {
        state: {
          newDevice: {
            id: response.data.helm.helm_id,
            serialNumber: helmetId,
            contact: formattedPhone,
            status: "Disconnected",
          },
        },
      });
    } catch (error) {
      console.error("Gagal mengirim data:", error);
      alert("Terjadi kesalahan saat menyimpan data ke server.");
    }
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
