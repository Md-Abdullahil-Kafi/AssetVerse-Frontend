// src/hooks/useMyAssets.js

import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

export const useMyAssets = () => {
  return useQuery({
    queryKey: ["my-assets"],
    queryFn: async () => {
      const { data } = await api.get("/employee/my-assets");
      return data;
    },
  });
};

// src/hooks/useAvailableAssets.js (for Request page)

export const useAvailableAssets = () => {
  return useQuery({
    queryKey: ["available-assets"],
    queryFn: async () => {
      const { data } = await api.get("/employee/available-assets");
      return data;
    },
  });
};

// src/hooks/useMyTeam.js

export const useMyTeam = (companyName) => {
  return useQuery({
    queryKey: ["my-team", companyName],
    queryFn: async () => {
      const { data } = await api.get(`/employee/my-team?company=${companyName}`);
      return data;
    },
    enabled: !!companyName,
  });
};