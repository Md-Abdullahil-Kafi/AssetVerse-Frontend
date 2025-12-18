import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

export const useEmployeeList = () => {
  return useQuery({
    queryKey: ["employeeList"],
    queryFn: async () => {
      const { data } = await api.get("/employee/list");
      return data.employees || [];
    },
  });
};