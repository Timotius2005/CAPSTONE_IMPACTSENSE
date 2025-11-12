import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./EditContactPage.module.css";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function EditContactPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [emergencyContact, setEmergencyContact] = useState("");
  const [loading, setLoading] = useState(false);
  const deviceId = location.state?.deviceId || "";

  useEffect(() => {
    if (deviceId) {
      console.log("Edit kontak untuk device:", deviceId);
    }
  }, [deviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token tidak ditemukan. Silakan login kembali.");
        return;
      }
      const response = await axios.put(
        `${BACKEND_URL}/api/user/emergency`,
        {
          serial_number: deviceId,
          emergency_phone: emergencyContact,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Nomor kontak darurat berhasil diperbarui!");
      console.log("Response:", response.data);
      navigate("/devices"); 
    } catch (error) {
      console.error("Gagal memperbarui kontak darurat:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Terjadi kesalahan saat memperbarui data.");
      }
    } finally {
      setLoading(false);
    }
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

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditContactPage;
