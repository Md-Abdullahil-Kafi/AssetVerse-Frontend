// src/pages/employee/RequestAsset.jsx

// import { useAvailableAssets } from "../../hooks/useAvailableAssets";
import { useState } from "react";
import api from "../../lib/axios";
import { useAvailableAssets } from "../../hooks/useMyAssets";
import Swal from "sweetalert2";

export default function RequestAsset() {
  const { data: assets = [], isLoading, refetch } = useAvailableAssets();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");

const handleRequest = async () => {
  if (!selectedAsset) return;

  const result = await Swal.fire({
    title: "Send Request?",
    text: `Do you want to request "${selectedAsset.assetName}"?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, send it!",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#10b981",
  });

  if (!result.isConfirmed) return;

  Swal.fire({
    title: "Sending...",
    text: "Please wait",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    await api.post("/assets/requests", { assetId: selectedAsset._id, note });

    Swal.fire({
      title: "Success!",
      text: "Asset request sent successfully!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

    setSelectedAsset(null);
    setNote("");
    refetch();
  } catch (err) {
    Swal.fire({
      title: "Failed!",
      text: "Error sending request. Please try again.",
      icon: "error",
    });
  }
  };
  

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">Request an Asset</h1>

      {isLoading ? (
        <p>Loading available assets...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <div key={asset._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={asset.productImage} alt={asset.productName} className="h-48 object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{asset.productName}</h2>
                <p>Type: {asset.productType}</p>
                <p>Available: {asset.availableQuantity}</p>
                <div className="card-actions justify-end">
                  <label
                    htmlFor="request-modal"
                    className="btn btn-primary"
                    onClick={() => setSelectedAsset(asset)}
                  >
                    Request
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedAsset && (
        <input type="checkbox" id="request-modal" className="modal-toggle" checked />
      )}
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Request {selectedAsset?.productName}</h3>
          <textarea
            className="textarea textarea-bordered w-full mt-4"
            placeholder="Add a note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="modal-action">
            <label htmlFor="request-modal" className="btn">Cancel</label>
            <button onClick={handleRequest} className="btn btn-primary">Send Request</button>
          </div>
        </div>
      </div>
    </div>
  );
}