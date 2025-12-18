// src/components/Navbar.jsx

import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleLogoClick = () => {
    if (!user) {
      navigate("/");
      return;
    }

    if (role === "hr") {
      navigate("/hr");
    } else {
      navigate("/employee");
    }
  };

  useEffect(() => {
    if (user && location.pathname === "/") {
      if (role === "hr") {
        navigate("/hr", { replace: true });
      } else {
        navigate("/employee", { replace: true });
      }
    }
  }, [user, role, location.pathname, navigate]);

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="flex-1">
        <button
          onClick={handleLogoClick}
          className="btn btn-ghost text-2xl font-bold text-primary hover:bg-transparent"
        >
          AssetVerse
        </button>
      </div>

      <div className="flex-none">
        {!user ? (
          <div className="flex items-center space-x-4">
            <Link to="/" className="btn btn-ghost">Home</Link>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-primary">
                Join as
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/register-employee">Employee</Link></li>
                <li><Link to="/register-hr">HR Manager</Link></li>
              </ul>
            </div>
            <Link to="/login" className="btn btn-outline">Login</Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost avatar cursor-pointer">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img 
                  src={user.profileImage || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} 
                  alt="profile" 
                />
              </div>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60">
              {role === "employee" && (
                <>
                  <li><Link to="/employee/my-assets">My Assets</Link></li>
                  <li><Link to="/employee/request-asset">Request Asset</Link></li>
                  <li><Link to="/employee/my-team">My Team</Link></li>
                </>
              )}
              {role === "hr" && (
                <>
                  <li><Link to="/hr/asset-list">Asset List</Link></li>
                  <li><Link to="/hr/add-asset">Add Asset</Link></li>
                  <li><Link to="/hr/all-requests">All Requests</Link></li>
                  <li><Link to="/hr/employee-list">Employee List</Link></li>
                  <li><Link to="/hr/upgrade-package">Upgrade Package</Link></li>
                  <li><Link to="/hr/approved-requests">Approved Requests</Link></li>
                </>
              )}
              <li><Link to="/profile">Profile</Link></li>
              <li className="border-t border-base-300 mt-2 pt-2">
                <button onClick={handleLogout} className="text-error w-full text-left">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}