// src/pages/PaymentSuccess.jsx

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function PaymentSuccess() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    // user data refetch
    queryClient.invalidateQueries(["user"]);

    Swal.fire({
      title: "Payment Successful!",
      text: "Your package has been upgraded.",
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
    }).then(() => {
      navigate("/hr/upgrade-package");
    });
  }, [queryClient, navigate]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-xl mt-4">Processing your payment...</p>
      </div>
    </div>
  );
}