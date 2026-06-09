import { create } from "zustand";

type User = {
  user;
  setUser: (user: boolean) => void;
};

const useUser = create<User>((set) => ({
  user: {},
  setUser: (userInput) => set(() => ({ user: userInput })),
}));

export default useUser;
