// src/pages/PaymentCancel.jsx

import { Link } from "react-router-dom";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="text-6xl mb-6 text-error">✗</div>
          <h1 className="text-3xl font-bold text-error mb-4">Payment Cancelled</h1>
          <p className="text-lg mb-8">
            Your payment was cancelled. You can try again anytime.
          </p>
          <Link to="/hr/upgrade-package" className="btn btn-primary btn-lg">
            Try Again
          </Link>
          <Link to="/hr/asset-list" className="btn btn-ghost mt-4">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}