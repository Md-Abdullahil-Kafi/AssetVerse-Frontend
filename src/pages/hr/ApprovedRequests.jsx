// src/pages/hr/ApprovedRequests.jsx

import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";
import Swal from "sweetalert2";

export default function ApprovedRequests() {
const { data: requests = [], isLoading, refetch } = useQuery({
  queryKey: ["returnRequests"],
  queryFn: async () => {
    const { data } = await api.get("/assets/return-requests");
    return data.requests || [];
  },
});

  const handleApproveReturn = async (requestId) => {
    const result = await Swal.fire({
      title: "Approve Return?",
      text: "This asset will be returned to inventory.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10b981",
    });

    if (result.isConfirmed) {
      try {
        await api.post("/assets/approve-return", { requestId });
        Swal.fire("Approved!", "Asset returned to inventory", "success");
        refetch();
      } catch (err) {
        Swal.fire("Failed!", "Failed to approve return", "error");
      }
    }
  };

  const handleRejectReturn = async (requestId) => {
    const result = await Swal.fire({
      title: "Reject Return?",
      text: "The employee will keep the asset.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        await api.post("/assets/reject-return", { requestId });
        Swal.fire("Rejected!", "Return request rejected", "info");
        refetch();
      } catch (err) {
        Swal.fire("Failed!", "Failed to reject return", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Return Requests
          </h1>
          <p className="text-xl opacity-80">
            Manage employee return requests for returnable assets
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-500 bg-base-100 py-12 px-16 rounded-xl shadow-lg">
              No pending return requests
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full bg-base-100 shadow-xl">
              <thead>
                <tr className="bg-primary text-white text-lg">
                  <th>Employee</th>
                  <th>Asset Name</th>
                  <th>Type</th>
                  <th>Request Date</th>
                  <th>Return Request Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-base-200 transition-colors">
                    <td className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img src={req.employeeImage || "https://i.pravatar.cc/150"} alt={req.employeeName} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{req.employeeName}</div>
                          <div className="text-sm opacity-70">{req.employeeEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">{req.assetName}</td>
                    <td>
                      <span className="badge badge-warning badge-outline">
                        {req.assetType}
                      </span>
                    </td>
                    <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                    <td>{new Date(req.returnRequestDate).toLocaleDateString()}</td>
                    <td>
                      <span className="badge badge-warning badge-lg">Return Requested</span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveReturn(req._id)}
                          className="btn btn-success btn-sm hover:scale-105 transition-transform"
                        >
                          Approve Return
                        </button>
                        <button
                          onClick={() => handleRejectReturn(req._id)}
                          className="btn btn-error btn-sm hover:scale-105 transition-transform"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}