// src/pages/hr/UpgradePackage.jsx

import { usePackages } from "../../hooks/usePackages";
import { useCreateCheckout } from "../../hooks/usePackages";
import { useAuth } from "../../hooks/useAuth";
import { usePaymentHistory } from "../../hooks/usePaymentHistory";

export default function UpgradePackage() {
  const { user } = useAuth();
  const { data: packages, isLoading: loadingPackages } = usePackages();
  const { data: payments = [], isLoading: loadingPayments } = usePaymentHistory();
  const createCheckout = useCreateCheckout();

  const currentLimit = user?.packageLimit || 5;
  const currentEmployees = user?.currentEmployees || 0;
  const currentSubscription = user?.subscription || "basic";

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Upgrade Your Package
          </h1>
          <p className="text-xl opacity-80">
            Scale your team with higher employee limits
          </p>
        </div>

        {/* Current Plan & Payment History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Current Plan */}
          <div className="card bg-base-100 shadow-2xl p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Current Plan</h2>
            <div className="text-center space-y-4">
              <p className="text-4xl font-bold text-primary capitalize">
                {currentSubscription} Plan
              </p>
              <div className="space-y-3 mt-8">
                <p className="text-2xl">
                  Employee Limit: <span className="font-bold">{currentLimit}</span>
                </p>
                <p className="text-2xl">
                  Current Employees: <span className="font-bold">{currentEmployees}</span>
                </p>
              </div>
              {currentEmployees >= currentLimit && (
                <div className="alert alert-warning mt-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Limit reached! Please upgrade your package.</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment History */}
          <div className="card bg-base-100 shadow-2xl p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Payment History</h2>
            {loadingPayments ? (
              <div className="text-center py-12">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : payments.length === 0 ? (
              <p className="text-center text-gray-500 py-12 text-xl">
                No payment history yet
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="text-lg">
                      <th>Date</th>
                      <th>Package</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment._id} className="hover">
                        <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                        <td className="font-medium">{payment.packageName}</td>
                        <td className="font-bold">${payment.amount}</td>
                        <td>
                          <span className="badge badge-success badge-lg">
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Available Packages */}
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">
          Choose Your New Package
        </h2>

        {loadingPackages ? (
          <div className="text-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {packages?.map((pkg) => {
              const isCurrent = currentLimit === pkg.employeeLimit;

              return (
                <div
                  key={pkg._id}
                  className={`card bg-base-100 shadow-2xl hover:shadow-3xl transition-all duration-300 ${
                    isCurrent ? "ring-4 ring-primary ring-offset-4" : ""
                  }`}
                >
                  <div className="card-body items-center text-center p-10">
                    <h3 className="text-3xl font-bold text-primary mb-6">
                      {pkg.name}
                    </h3>
                    <p className="text-6xl font-bold text-base-content mb-2">
                      ${pkg.price}
                      <span className="text-2xl font-normal">/month</span>
                    </p>
                    <p className="text-2xl font-semibold mb-8">
                      Up to {pkg.employeeLimit} employees
                    </p>

                    <ul className="space-y-4 text-left mb-10">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-lg">
                          <span className="text-green-500 text-3xl mr-4">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => createCheckout.mutate(pkg._id)}
                      disabled={createCheckout.isPending || isCurrent}
                      className={`btn btn-wide btn-lg ${
                        isCurrent
                          ? "btn-disabled opacity-70 cursor-not-allowed"
                          : "btn-primary hover:scale-105 transition-transform"
                      }`}
                    >
                      {createCheckout.isPending ? (
                        <>
                          <span className="loading loading-spinner"></span>
                          Processing...
                        </>
                      ) : isCurrent ? (
                        "Current Plan"
                      ) : (
                        `Upgrade to ${pkg.name}`
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}