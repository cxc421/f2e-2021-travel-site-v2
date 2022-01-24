import { IntegratedDataFilter, IntegratedData } from "../types";
import { axiosInstance } from "./axios-config";

export const getIntegratedData = async (
  filter: IntegratedDataFilter
): Promise<IntegratedData[]> => {
  const response = await axiosInstance.get("/api/tourism", {
    params: {
      ...filter,
      _: Date.now(),
    },
  });
  return response.data;
};
