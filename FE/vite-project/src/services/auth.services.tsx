import axiosInstance from "./axios";

export const createUser = async (data) => {
  return axiosInstance.post("/v1/api/register", data);
};

export const loginUser = async (data) => {
  return axiosInstance.post("/v1/api/login", data);
};

export const updateUser = async (id, data) => {
  return axiosInstance.put(`/v1/api/users/${id}`, data);
};

export const deleteUser = async (id) => {
  return axiosInstance.delete(`/v1/api/users/${id}`);
};

export const updateAvatar = async (id, imageBase64) => {
  return axiosInstance.patch(`/v1/api/avatar/${id}`, imageBase64);
};
