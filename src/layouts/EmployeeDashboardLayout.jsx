// src/layouts/EmployeeDashboardLayout.jsx

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function EmployeeDashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto p-6">
        <Outlet /> {/* Child pages (MyAssets, RequestAsset, MyTeam, Profile) */}
      </div>
      <Footer />
    </div>
  );
}