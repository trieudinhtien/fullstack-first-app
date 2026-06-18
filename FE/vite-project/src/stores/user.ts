import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  user;
  setUser: (user) => void;
};

const useUser = create<User>()(
  persist(
    // lưu local storage
    (set) => ({
      user: null,
      setUser: (userInput) => set(() => ({ user: userInput })),
    }),
    { name: "user-storage" }
  )
);

export default useUser;
