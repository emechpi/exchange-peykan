export type CurrencyStore = {
  rates: null;
  setRates: (rates: []) => void;
};

export const createCurrencySlice = (set: any): CurrencyStore => ({
  rates: null,
  setRates: (values) => set(() => ({ rates: values })),
});
