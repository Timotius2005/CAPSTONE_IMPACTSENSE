import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./EditContactPage.module.css";

function EditContactPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [emergencyContact, setEmergencyContact] = useState("");

  // Ambil deviceId jika dikirim dari halaman sebelumnya
  const deviceId = location.state?.deviceId || "";

  useEffect(() => {
    if (deviceId) {
      console.log("Edit kontak untuk device:", deviceId);
    }
  }, [deviceId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulasi update data kontak (nanti bisa dihubungkan ke API)
    alert(`Nomor kontak darurat untuk helm ${deviceId} berhasil diperbarui!`);
    navigate("/devices"); // kembali ke halaman daftar helm
  };

  return (
    <div
      className={styles.editPage}
      style={{ backgroundImage: "url('/images/image-2.png')" }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>ImpactSense Helmet</h1>

        <button className={styles.editTitle}>Edit Nomor Kontak Darurat</button>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Nomor Kontak Darurat</label>
          <input
            type="text"
            placeholder="Masukkan Nomor Kontak Darurat"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
            className={styles.input}
            required
          />

          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditContactPage;