// src/App.jsx (ফাইনাল)

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HRDashboardLayout from "./layouts/HRDashboardLayout";
import EmployeeDashboardLayout from "./layouts/EmployeeDashboardLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterEmployee from "./pages/RegisterEmployee";
import RegisterHR from "./pages/RegisterHR";
import AssetList from "./pages/hr/AssetList";
import AddAsset from "./pages/hr/AddAsset";
import AllRequests from "./pages/hr/AllRequests";
import EmployeeList from "./pages/hr/EmployeeList";
import UpgradePackage from "./pages/hr/UpgradePackage";
import MyAssets from "./pages/employee/MyAssets";
import RequestAsset from "./pages/employee/RequestAsset";
import MyTeam from "./pages/employee/MyTeam";
import Profile from "./pages/Profile";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import NotFound from "./pages/NotFound";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthGuard from "./components/AuthGuard";
import ApprovedRequests from "./pages/hr/ApprovedRequests";
import HRDashboard from "./pages/hr/Dashboard";
import EmployeeDashboard from "./pages/employee/Dashboard";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <AuthGuard>
                <HomePage />
              </AuthGuard>
            }
          />
          <Route
            path="/login"
            element={
              <AuthGuard>
                <LoginPage />
              </AuthGuard>
            }
          />
          <Route
            path="/register-employee"
            element={
              <AuthGuard>
                <RegisterEmployee />
              </AuthGuard>
            }
          />
          <Route
            path="/register-hr"
            element={
              <AuthGuard>
                <RegisterHR />
              </AuthGuard>
            }
          />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        // HR Routes
        <Route path="/hr" element={<HRDashboardLayout />}>
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <HRDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="asset-list"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <AssetList />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-asset"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <AddAsset />
              </ProtectedRoute>
            }
          />
          <Route
            path="all-requests"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <AllRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="employee-list"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="upgrade-package"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <UpgradePackage />
              </ProtectedRoute>
            }
          />
          <Route path="approved-requests" element={<ApprovedRequests />} />
        </Route>
        // Employee Routes
        <Route path="/employee" element={<EmployeeDashboardLayout />}>
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeeDashboard />
                
              </ProtectedRoute>
            }
          />
          <Route
            path="my-assets"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <MyAssets />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-assets"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <MyAssets />
              </ProtectedRoute>
            }
          />
          <Route
            path="request-asset"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <RequestAsset />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-team"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <MyTeam />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
