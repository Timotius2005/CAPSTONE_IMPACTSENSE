import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEdit2, FiUser, FiLogOut } from "react-icons/fi";
import styles from "./DeviceListPage.module.css";

function DeviceListPage() {
  const [devices, setDevices] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleEdit = (id) => {
    navigate("/helmet-info", { state: { deviceId: id } });
  };

  // ✅ Revisi bagian ini
  const handleLogout = () => {
    alert("Logout berhasil!");
    navigate("/login", { replace: true }); // arahkan ke halaman login
  };

  return (
    <div
      className={styles.devicePage}
      style={{ backgroundImage: "url('/images/image-2.png')" }}
    >
      <div className={styles.topRightBox}>
        <FiUser className={styles.userIcon} />
        <span className={styles.username}>Username</span>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <FiLogOut size={18} />
        </button>
      </div>

      <div className={styles.overlay}>
        <h1 className={styles.title}>ImpactSense Helmet</h1>

        <div className={styles.tabContainer}>
          <button className={`${styles.tab} ${styles.active}`}>
            List Helm
          </button>
        </div>

        {devices.length === 0 ? (
          <p className={styles.noDevice}>Belum ada device terdaftar</p>
        ) : (
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>No</span>
              <span>ID Helm</span>
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
                <button
                  className={
                    device.status === "Connected"
                      ? styles.connectedBtn
                      : styles.disconnectedBtn
                  }
                >
                  {device.status}
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
