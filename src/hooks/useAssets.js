// src/hooks/useAssets.js

import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

export const useAssets = (page = 1) => {
  return useQuery({
    queryKey: ["assets", page],
    queryFn: async () => {
      const { data } = await api.get(`/assets?page=${page}&limit=10`);
      return data;
    },
  });
};