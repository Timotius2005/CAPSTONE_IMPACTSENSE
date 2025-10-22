import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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


  return (
    <div
      className={styles.devicePage}
      style={{ backgroundImage: "url('/images/image-2.png')" }}
    >
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
                <span className={styles.index}>{index + 1}</span>
                <span>{device.id}</span>
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
