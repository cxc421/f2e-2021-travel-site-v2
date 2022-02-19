import { IntegratedDataFilter, IntegratedData } from "../types";
import { axiosInstance } from "../axios-config";

export const getIntegratedData = async (
  filter: IntegratedDataFilter
): Promise<{
  startIdx: number;
  endIdx: number;
  total: number;
  data: IntegratedData[];
}> => {
  const response = await axiosInstance.get("/api/tourism_v2", {
    params: {
      ...filter,
      _: Date.now(),
    },
  });
  return response.data;
};
