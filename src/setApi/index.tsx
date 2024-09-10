import { create } from "zustand";

interface ISetApi {
  api: boolean;
  setApi: (api: boolean) => void;
}

export const useSetApi = create<ISetApi>((set) => ({
  api: false,
  setApi: (api: boolean) => set({ api }),
}));
