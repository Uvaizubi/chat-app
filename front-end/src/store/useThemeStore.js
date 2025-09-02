import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "dark",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    console.log(`localStorage ==> `, localStorage.getItem("chat-theme"))
    set({ theme });
  },
}));