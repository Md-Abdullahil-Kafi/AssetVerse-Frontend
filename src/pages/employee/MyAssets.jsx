// src/pages/employee/MyAssets.jsx

import { useMyAssets } from "../../hooks/useMyAssets";
import Swal from "sweetalert2";
import api from "../../lib/axios";

export default function MyAssets() {
  const { data: assets = [], isLoading, refetch } = useMyAssets();

  const handlePrint = () => {
    window.print();
  };

  const handleReturn = async (assetId, assetName) => {
    const result = await Swal.fire({
      title: "Return Asset?",
      text: `Do you want to return "${assetName}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, return it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f59e0b",
    });

    if (result.isConfirmed) {
      try {
        await api.post("/assets/return", { assetId });
        Swal.fire({
          title: "Success!",
          text: "Return request sent successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        refetch();
      } catch (err) {
        Swal.fire({
          title: "Failed!",
          text: "Failed to send return request",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8 print:hidden">
          <h1 className="text-3xl font-bold text-primary">My Assets</h1>
          <button onClick={handlePrint} className="btn btn-primary">
            Print Assets
          </button>
        </div>

        <div className="bg-base-100 rounded-lg shadow-xl overflow-hidden">
          <div className="hidden print:block p-8 bg-white border-b text-center">
            <h2 className="text-2xl font-bold">My Assigned Assets Report</h2>
            <p className="text-gray-600 mt-2">
              Generated on {new Date().toLocaleDateString()}
            </p>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : assets.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-xl text-gray-500">No assets assigned yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th>Image</th>
                    <th>Asset Name</th>
                    <th>Type</th>
                    <th>Company</th>
                    <th>Request Date</th>
                    <th>Approval Date</th>
                    <th>Status</th>
                    <th className="print:hidden">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset._id} className="hover">
                      <td>
                        <div className="avatar">
                          <div className="w-12 rounded">
                            <img
                              src={
                                asset.assetImage || "https://i.pravatar.cc/150"
                              }
                              alt={asset.assetName}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">{asset.assetName}</td>
                      <td>{asset.assetType}</td>
                      <td>{asset.companyName}</td>
                      <td>
                        {new Date(asset.requestDate).toLocaleDateString()}
                      </td>
                      <td>
                        {asset.approvalDate
                          ? new Date(asset.approvalDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td>
                        <span className="badge badge-success badge-outline">
                          Approved
                        </span>
                      </td>
                      <td className="print:hidden">
                        {asset.assetType === "Returnable" &&
                          asset.status === "assigned" && (
                            <button
                              onClick={() =>
                                handleReturn(asset._id, asset.assetName)
                              }
                              className="btn btn-warning btn-sm"
                            >
                              Return
                            </button>
                          )}
                        {asset.status === "return_requested" && (
                          <span className="badge badge-warning">
                            Return Requested
                          </span>
                        )}
                        {asset.status === "returned" && (
                          <span className="badge badge-success">Returned</span>
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
    </>
  );
}
