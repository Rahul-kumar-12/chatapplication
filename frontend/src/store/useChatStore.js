import create from "zustand";

const useChatStore = create((set) => ({
  id: "",
  setId: (id) => set({ id }),

  user: localStorage.getItem("name") || "",
  setUser: (user) => {
    localStorage.setItem("name", user);
    set({ user });
  },

  comon: JSON.parse(localStorage.getItem("comon")) || [],
  addMessage: (message) => set((state) => {
    const updatedComon = [...state.comon, message];
    localStorage.setItem("comon", JSON.stringify(updatedComon));
    return { comon: updatedComon };
  }),
}));

export default useChatStore;
