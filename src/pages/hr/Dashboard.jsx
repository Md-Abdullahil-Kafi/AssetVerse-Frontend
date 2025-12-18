// src/pages/hr/Dashboard.jsx

import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function HRDashboard() {
  const { user } = useAuth();

  const menuItems = [
    { path: "/hr/asset-list", label: "Asset List", icon: "📋" },
    { path: "/hr/add-asset", label: "Add Asset", icon: "➕" },
    { path: "/hr/all-requests", label: "All Requests", icon: "📩" },
    { path: "/hr/employee-list", label: "Employee List", icon: "👥" },
    { path: "/hr/upgrade-package", label: "Upgrade Package", icon: "💳" },
    { path: "/hr/approved-requests", label: "Return Requests", icon: "✅" },
    { path: "/profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-focus py-12 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Welcome back, {user?.name || "HR Manager"}!
          </h1>
          <p className="text-2xl opacity-90">
            Managing {user?.companyName || "Your Company"}
          </p>
          <p className="text-lg mt-4">
            Current Package: <span className="font-bold">{user?.subscription || "Basic"}</span> 
            (Limit: {user?.packageLimit || 5} employees)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="card bg-white text-primary shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              <div className="card-body items-center text-center">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h2 className="card-title text-2xl">{item.label}</h2>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg opacity-80">
            You have <span className="font-bold">{user?.currentEmployees || 0}</span> active employees
          </p>
        </div>
      </div>
    </div>
  );
}