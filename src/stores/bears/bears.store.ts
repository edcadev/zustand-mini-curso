import { create } from "zustand";

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  bears: Bear[];

  blackBears: number;
  pandaBears: number;
  polarBears: number;

  computed: {
    totalBears: number;
  };

  increaseBlackBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  increasePolarBears: (by: number) => void;

  addBear: () => void;
  clearBears: () => void;
  doNothing: () => void;
}

export const useBearStore = create<BearState>()((set, get) => ({
  bears: [{ id: 1, name: "Oso #1" }],

  blackBears: 10,
  pandaBears: 1,
  polarBears: 5,

  computed: {
    get totalBears() {
      return (
        get().blackBears +
        get().pandaBears +
        get().polarBears +
        get().bears.length
      );
    },
  },

  increaseBlackBears: (by: number) =>
    set((state) => ({ blackBears: state.blackBears + by })),
  increasePandaBears: (by: number) =>
    set((state) => ({ pandaBears: state.pandaBears + by })),
  increasePolarBears: (by: number) =>
    set((state) => ({ polarBears: state.polarBears + by })),

  addBear: () =>
    set((state) => ({
      bears: [
        ...state.bears,
        { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` },
      ],
    })),
  clearBears: () => set({ bears: [] }),
  doNothing: () => set((state) => ({ bears: [...state.bears] })),
}));
