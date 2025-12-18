import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

export const usePaymentHistory = () => {
  return useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const { data } = await api.get("/payment/history");
      return data.payments;
    },
  });
};