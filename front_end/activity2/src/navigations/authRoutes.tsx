import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Redirect any unknown routes (e.g. /home when logged out) to the login page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
