import axiosInstance from "./axios";

export const getAllArea = (page, limit) => {
  return axiosInstance.get(`/v1/api/area?page=${page}&limit=${limit}`);
};

export const createArea = (data) => {
  return axiosInstance.post("/v1/api/area", data);
};

export const deleteArea = (id: number | string) => {
  return axiosInstance.delete(`/v1/api/area/${id}`);
};

export const updateArea = (id, data) => {
  return axiosInstance.put(`/v1/api/area/${id}`, data);
};
