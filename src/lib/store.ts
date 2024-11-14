import { create } from "zustand";

interface FilterState {
  search: string;
  minPrice: number;
  maxPrice: number;
  rent: [number, number];
  setSearch: (value: string) => void;
  setPriceRange: (min: number, max: number) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  search: "",
  minPrice: 0,
  maxPrice: 100000,
  rent: [0, 100000],
  setSearch: (value: string) => set({ search: value }),
  setPriceRange: (min: number, max: number) => set({ rent: [min, max] }),
}));
