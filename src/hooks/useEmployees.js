// src/hooks/useEmployees.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const { data } = await api.get("/employee"); 
      return data;
    },
  });
};

export const useRemoveEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (employeeEmail) => api.post("/employee/remove", { employeeEmail }),
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      queryClient.invalidateQueries(["assets"]);
    },
  });
};