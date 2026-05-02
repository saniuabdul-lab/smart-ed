import { create } from "zustand";
import type { Profile, UsageState } from "@/types";

interface AppStore {
  user: Profile | null;
  usage: UsageState;
  setUser: (user: Profile | null) => void;
  decrementUsage: (tool: keyof UsageState) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  usage: {
    curriculum:  { used: 0, max: 3,  period: "weekly" },
    scheme:      { used: 0, max: 5,  period: "monthly" },
    lesson:      { used: 0, max: 8,  period: "monthly" },
    assessment:  { used: 0, max: 6,  period: "monthly" },
    resources:   { used: 0, max: 10, period: "monthly" },
  },
  setUser: (user) => set({ user }),
  decrementUsage: (tool) =>
    set((state) => ({
      usage: {
        ...state.usage,
        [tool]: {
          ...state.usage[tool],
          used: state.usage[tool].used + 1,
        },
      },
    })),
}));