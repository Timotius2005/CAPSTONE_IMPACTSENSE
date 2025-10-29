import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEdit2, FiUser, FiLogOut } from "react-icons/fi";
import styles from "./DeviceListPage.module.css";
import axios from "axios";

function DeviceListPage() {
  const [devices, setDevices] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsername(response.data.user.username); // sesuaikan field-nya kalau bukan 'name'
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

  fetchUser();
}, []);

  useEffect(() => {
  const fetchHelmets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/user/helm-devices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.data) {
        const formatted = response.data.data.map((helm) => ({
          id: helm.serial_number,
          status: helm.pairing_status || "Disconnected",
          contact: helm.emergency_phone || "-",
        }));
        setDevices(formatted);
      }
    } catch (error) {
      console.error("Gagal mengambil data helm:", error);
    }
  };

  fetchHelmets();
}, []);


  // 🔹 Tambah helm baru dari state (jika baru ditambahkan)
  useEffect(() => {
    if (location.state?.newDevice) {
      setDevices((prev) => {
        const exists = prev.some((d) => d.id === location.state.newDevice.id);
        if (exists) return prev;
        return [...prev, location.state.newDevice];
      });
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  // 🔹 Edit helm (ke halaman helmet-info)
  const handleEdit = (id) => {
    navigate("/edit-contact", { state: { deviceId: id } });
  };

  // 🔹 Logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      alert("Logout berhasil!");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Gagal logout:", error);
      alert("Gagal logout. Silakan coba lagi.");
    }
  };

  return (
    <div
      className={styles.devicePage}
      style={{ backgroundImage: "url('/images/image-2.png')" }}
    >
      <div className={styles.topRightBox}>
        <FiUser className={styles.userIcon} />
        <span className={styles.username}>{username || "User"}</span>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <FiLogOut size={18} />
        </button>
      </div>

      <div className={styles.overlay}>
        <h1 className={styles.title}>ImpactSense Helmet</h1>

        <div className={styles.tabContainer}>
          <button className={`${styles.tab} ${styles.active}`}>List Helm</button>
        </div>

        {devices.length === 0 ? (
          <p className={styles.noDevice}>Belum ada device terdaftar</p>
        ) : (
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>No</span>
              <span>ID Helm</span>
              <span>Kontak Darurat</span>
              <span>Status</span>
            </div>

            {devices.map((device, index) => (
              <div key={index} className={styles.tableRow}>
                <span className={styles.indexCircle}>{index + 1}</span>
                <span className={styles.deviceId}>
                  {device.id}
                  <FiEdit2
                    className={styles.editIcon}
                    onClick={() => handleEdit(device.id)}
                  />
                </span>
                <span className={styles.contact}>{device.contact}</span>
                <button
                  className={
                    device.status === "Connected"
                      ? styles.connectedBtn
                      : styles.disconnectedBtn
                  }
                >
                  {device.status || "Disconnected"}
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          className={styles.addBtn}
          onClick={() => navigate("/helmet-info")}
        >
          + Add New Device
        </button>
      </div>
    </div>
  );
}

export default DeviceListPage;