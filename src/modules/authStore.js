import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: {
    name: "",
    id: "",
    email: "",
  },
  setUser: (userData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData)); // Store user data in local storage
    }
    set({ user: userData }); // Update user data in Zustand
  },
}));

// Ambil user data dari local storage during initialization on browser environment. Jadi kalau ada page di browser yang kebuka store variable user dengan data yang dikirim oleh backend, harus diparse karena local storage hanya terima data yang diparse
if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem("user"); //getItem() adalah method untuk mendapatkan value di local storage.
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    useAuthStore.setState({ user: parsedUser }); // set variable "user", dengan data user yang telah diparsed
  }
}

export default useAuthStore;
