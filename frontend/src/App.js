import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DeviceListPage from "./pages/DeviceListPage";
import HelmetInfoPage from "./pages/HelmetInfoPage";
import EditContactPage from "./pages/EditContactPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/devices" element={<DeviceListPage />} />
        <Route path="/helmet-info" element={<HelmetInfoPage />} />
        <Route path="/edit-contact" element={<EditContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
