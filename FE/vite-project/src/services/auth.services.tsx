import axiosInstance from "./axios";

export const createUser = async (data) => {
  return axiosInstance.post("/v1/api/register", data);
};

export const loginUser = async (data) => {
  return axiosInstance.post("/v1/api/login", data);
};
