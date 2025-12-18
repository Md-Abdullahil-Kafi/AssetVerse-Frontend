// src/pages/hr/AllRequests.jsx

import Swal from "sweetalert2";
import { useRequests, useApproveRequest, useRejectRequest } from "../../hooks/useRequests";

export default function AllRequests() {
  const { data: requests = [], isLoading, refetch } = useRequests();
  const approveMutation = useApproveRequest();
  const rejectMutation = useRejectRequest();

const handleApprove = async (id) => {
  const result = await Swal.fire({
    title: "Approve Request?",
    text: "This asset will be assigned to the employee.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, approve it!",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#10b981",
    cancelButtonColor: "#ef4444",
  });

  if (result.isConfirmed) {
    Swal.fire({
      title: "Approving...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await approveMutation.mutateAsync(id);
      Swal.fire({
        title: "Approved!",
        text: "Asset assigned successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        title: "Failed!",
        text: "Failed to approve request",
        icon: "error",
      });
    }
  }
};

const handleReject = async (id) => {
  const result = await Swal.fire({
    title: "Reject Request?",
    text: "This request will be rejected.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, reject it!",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
  });

  if (result.isConfirmed) {
    Swal.fire({
      title: "Rejecting...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await rejectMutation.mutateAsync(id);
      Swal.fire({
        title: "Rejected!",
        text: "Request rejected successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      refetch();
    } catch (err) {
      Swal.fire({
        title: "Failed!",
        text: "Failed to reject request",
        icon: "error",
      });
    }
  }
};



  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">All Requests</h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {isLoading ? (
            <p>Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="text-center py-8">No pending requests</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Asset</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src="https://i.ibb.co/wZqvW2ns/image.png" alt="employee" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{req.requesterName}</div>
                            <div className="text-sm opacity-70">{req.requesterEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="font-bold">{req.assetName}</div>
                          <div className="text-sm opacity-70">{req.assetType}</div>
                        </div>
                      </td>
                      <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${
                          req.requestStatus === "pending" ? "badge-warning" :
                          req.requestStatus === "approved" ? "badge-success" :
                          "badge-error"
                        }`}>
                          {req.requestStatus}
                        </span>
                      </td>
                      <td>
                        {req.requestStatus === "pending" && (
                          <div className="space-x-2">
                            <button
                              onClick={() => handleApprove(req._id)}
                              className="btn btn-success btn-sm"
                              disabled={approveMutation.isPending}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(req._id)}
                              className="btn btn-error btn-sm"
                              disabled={rejectMutation.isPending}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}