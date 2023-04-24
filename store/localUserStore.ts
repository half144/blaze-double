import { create } from "zustand";

type LocalUserStore = {
  balance: number;
  increaseToBalance: (ammount: number) => void;
};

export const useLocalUserStore = create<LocalUserStore>((set) => ({
  balance: 5,
  increaseToBalance: (ammount) =>
    set((state) => ({
      balance: state.balance + ammount,
    })),
}));
