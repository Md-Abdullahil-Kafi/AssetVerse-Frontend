// src/hooks/usePackages.js (ফাইনাল – কাজ করবে)

import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../lib/axios";

export const usePackages = () => {
  return useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await api.get("/payment/packages");
      return data;
    },
  });
};

export const useCreateCheckout = () => {
  return useMutation({
    mutationFn: (packageId) => api.post("/payment/create-checkout-session", { packageId }),
    onSuccess: (response) => {
      console.log("Stripe response:", response); // ডিবাগের জন্য
      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert("Stripe URL not received – check console");
      }
    },
    onError: (err) => {
      console.error("Checkout error:", err);
      alert("Error: " + (err.response?.data?.message || err.message));
    },
  });
};