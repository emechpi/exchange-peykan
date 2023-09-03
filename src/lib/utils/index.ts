export const currencyFormater = (
  val: number,
  locale: string,
  currency: string
) => {
  return val.toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
};
