import { create } from "zustand";

import type { IModalStore } from "../types/types";

export const useModalStore = create<IModalStore>((set) => ({
  errorModalText: "",
  successModalText: "",
  setErrorModalText: (text: string) => set({ errorModalText: text }),
  setSuccessModalText: (text: string) => set({ successModalText: text }),
}));
