// src/hooks/useHRAnalytics.js

import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

export const useHRAnalytics = () => {
  return useQuery({
    queryKey: ["hr-analytics"],
    queryFn: async () => {
      const { data } = await api.get("/analytics/hr-dashboard");
      return data;
    },
  });
};