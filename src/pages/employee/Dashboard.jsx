// src/pages/employee/Dashboard.jsx

import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function EmployeeDashboard() {
  const { user } = useAuth();

  const menuItems = [
    { path: "/employee/my-assets", label: "My Assets", icon: "📦" },
    { path: "/employee/request-asset", label: "Request Asset", icon: "➕" },
    { path: "/employee/my-team", label: "My Team", icon: "👥" },
    { path: "/profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Welcome back, {user?.name || "Employee"}!
          </h1>
          <p className="text-xl opacity-80">
            Manage your assets and requests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h2 className="card-title text-xl">{item.label}</h2>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg opacity-70">
            You are currently affiliated with{" "}
            <span className="font-bold text-primary">
              {user?.affiliations?.length || 0} compan{user?.affiliations?.length === 1 ? "y" : "ies"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}