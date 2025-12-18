// src/hooks/useRequests.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

export const useRequests = () => {
  return useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const { data } = await api.get("/assets/requests");
      return data;
    },
  });
};

export const useApproveRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.post(`/assets/requests/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries(["requests"]);
      queryClient.invalidateQueries(["assets"]);
    },
  });
};

export const useRejectRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.post(`/assets/requests/${id}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries(["requests"]);
    },
  });
};