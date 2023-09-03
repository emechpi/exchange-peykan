"use client";

import { FilteredUser } from "@/lib/types/auth.type";

export type AuthStore = {
  authUser: FilteredUser | null;
  requestLoading: boolean;
  setAuthUser: (user: FilteredUser | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  reset: () => void;
};

export const createAuthSlice = (set: any): AuthStore => ({
  authUser: null,
  requestLoading: false,
  setAuthUser: (user) => set((state: object) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) =>
    set((state: object) => ({ ...state, requestLoading: isLoading })),
  reset: () => set({ authUser: null, requestLoading: false }),
});
