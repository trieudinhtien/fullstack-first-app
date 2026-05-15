import { create } from "zustand";

type ThemeMode = {
  mode: boolean;
  changeMode: (status: boolean) => void;
};

const useMode = create<ThemeMode>((set) => ({
  mode: false,
  changeMode: (status: boolean) => set(() => ({ mode: status })),
}));

export default useMode;
