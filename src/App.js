import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "./components/layout/AuthLayout";
import StudentLayout from "./components/layout/StudentLayout";
import AdminLayout from "./components/layout/AdminLayout";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardHome from "./pages/DashboardHome";
import MyTicketPage from "./pages/MyTicketPage";
import SubmitTicketPage from "./pages/SubmitTicketPage";
import TicketDetailsPage from "./pages/TicketDetailsPage";

import AdminLoginPage from "./pages/AdminLoginPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTicketDetailsPage from "./pages/AdminTicketDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/register" element={<AdminRegisterPage />} />
      </Route>

      <Route element={<StudentLayout />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/my-tickets" element={<MyTicketPage />} />
        <Route path="/submit-ticket" element={<SubmitTicketPage />} />
        <Route path="/tickets/:id" element={<TicketDetailsPage />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tickets/:id" element={<AdminTicketDetailsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
