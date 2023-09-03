import { effect, z } from "zod";

export const CurrencyConvertorSchema = z.object({
  amount: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z
      .number({
        required_error: "Enter an amount !",
      })
      .min(1, "Amount must be at least 1")
      .max(999999, "Amount must be less than 999,999")
  ),

  base: z
    .string({
      required_error: "Select a currency !",
    })
    .min(3, "Currency code must be exact 3 characters")
    .max(3, "Currency code must be exact 3 characters"),
  target: z
    .string({
      required_error: "Select a currency !",
    })
    .min(3, "Currency code must be exact 3 characters")
    .max(3, "Currency code must be exact 3 characters"),
});

export type CurrencyConvertorInput = z.infer<typeof CurrencyConvertorSchema>;
