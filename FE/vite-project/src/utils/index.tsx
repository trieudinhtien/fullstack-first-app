import { enqueueSnackbar } from "notistack";

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const clearAllLocalStorage = () => {
  localStorage.clear();
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const messageSuccess = (message: string) => {
  enqueueSnackbar(`${message}`, {
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    variant: "success",
  });
};

export const messageError = (message: string) => {
  enqueueSnackbar(`${message}`, {
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    variant: "error",
  });
};
