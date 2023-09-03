"use client";

import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import { createCurrencySlice } from "./currencySlice";
import type { AuthStore } from "./authSlice";
import type { CurrencyStore } from "./currencySlice";

export interface IStore extends AuthStore, CurrencyStore {}

const useStore = create((...a) => {
  return {
    ...createAuthSlice(a[0]),
    ...createCurrencySlice(a[0]),
  };
});

export default useStore;
