import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  userId: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
}

interface AuthActions {
  setAccessToken: (accessToken: string) => void;
  setUserId: (userId: string) => void;
  setEmail: (email: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthState & AuthActions>(
    (set) => ({
      accessToken: null,
      userId: null,
      email: null,
      firstName: null,
      lastName: null,
      setAccessToken: (token) => set({ accessToken: token }),
      setUserId: (id) => set({ userId: id }),
      setEmail: (email) => set({ email: email }),
      setFirstName: (firstName) => set({ firstName: firstName }),
      setLastName: (lastName) => set({ lastName: lastName }),
      logout: () =>
        set({
          accessToken: null,
          userId: null,
          email: null,
          firstName: null,
          lastName: null,
        }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage, // localStorage or sessionStorage
    }
  )
);

export default useAuthStore;
