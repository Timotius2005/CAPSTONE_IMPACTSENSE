import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEdit2, FiUser, FiLogOut } from "react-icons/fi";
import styles from "./DeviceListPage.module.css";
import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function DeviceListPage() {
  const [devices, setDevices] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loadingId, setLoadingId] = useState(null);
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

        setUsername(response.data.user.username);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };

    fetchUser();
  }, []);
  const fetchHelmets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BACKEND_URL}/api/user/helm-devices`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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

  useEffect(() => {
    
    fetchHelmets();
  }, []);
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
    navigate("/edit-contact", { state: { deviceId: id } });
  };
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BACKEND_URL}/api/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
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
const handlePairing = async (deviceId) => {
  setLoadingId(deviceId);

  const STM_IP = process.env.REACT_APP_STM_IP;

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tidak ditemukan. Silakan login ulang.");
      return;
    }
    const stmUrl = `${STM_IP}/pair?device=${encodeURIComponent(deviceId)}`;
    console.log("🔗 Mengirim pairing ke STM:", stmUrl);
    const stmResponse = await axios.get(stmUrl, { timeout: 25000 });
    if (stmResponse.status === 200) {
      console.log("✅ Respon STM:", stmResponse.data);
      const backendUrl = `${BACKEND_URL}/api/pairing/${deviceId}`;
      const backendRes = await axios.get(backendUrl, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });

      if (backendRes.status === 200) {
        alert(
          `Pairing berhasil untuk helm ${deviceId}\nNomor darurat: ${backendRes.data.emergency_phone}`
        );
      } else {
        alert("Pairing ke server pusat gagal. Coba lagi.");
      }
    } else {
      alert("STM tidak merespons pairing. Cek koneksi WiFi dan IP-nya.");
    }
  } catch (error) {
    console.error("❌ Error pairing:", error);

    if (error.code === "ECONNABORTED") {
      alert("Koneksi ke STM timeout. Pastikan STM dan laptop di jaringan yang sama.");
    } else if (error.response) {
      alert(
        `STM error: ${error.response.status} - ${error.response.statusText}`
      );
    } else {
      alert(
        "Tidak bisa terhubung ke STM. Pastikan IP benar dan server berjalan."
      );
    }
  } finally {
    setLoadingId(null);
    await fetchHelmets(); 
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
                    device.status === "connected"
                      ? styles.connectedBtn
                      : styles.disconnectedBtn
                  }
                  onClick={() => {
                    if (device.status === "disconnected" && !loadingId) {
                      handlePairing(device.id);
                    }
                  }}
                  disabled={loadingId === device.id}
                >
                  {loadingId === device.id
                    ? "⏳ Pairing..."
                    : device.status === "connected"
                    ? "✅ Paired"
                    : "🔄 Pair"}
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
