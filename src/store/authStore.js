import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(persist(set => ({
  isAuthenticated: false,
  user: null,
  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null })
}), {
  name: 'auth', // name of the item in the storage (must be unique)
  storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
}));

{/*}
export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: {
    email: "",
    authToken: "",
    tipo_usuario: 3,
    id_usuario: 0,
    name: "",
  },
  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({
    isAuthenticated: false, user: {
      email: "",
      authToken: "",
      tipo_usuario: 3,
      id_usuario: 0,
      name: "",
    }
  }),
}));*/}
