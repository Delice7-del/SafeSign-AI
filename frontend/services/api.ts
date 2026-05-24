import axios, { AxiosError } from "axios";
import { AnalysisRequest, AnalysisResponse, AnalysisRecord } from "@/types";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 120000, // 2 min — AI can be slow
  headers: { "Content-Type": "application/json" },
});

// Response interceptor for unified error handling
apiClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const message =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

export const analyzeContract = async (
  payload: AnalysisRequest
): Promise<AnalysisResponse> => {
  const { data } = await apiClient.post<AnalysisResponse>(
    "/analyze-contract",
    payload
  );
  return data;
};

export const getHistory = async (): Promise<AnalysisRecord[]> => {
  const { data } = await apiClient.get<AnalysisRecord[]>("/history");
  return data;
};
