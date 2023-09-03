"use client";
import { useEffect, useState } from "react";
import {
  CurrencyConvertorInput,
  CurrencyConvertorSchema,
} from "@/lib/validations/convertor.schema";
import {
  useForm,
  Controller,
  FormProvider,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/store";
import { currencies } from "@/lib/constatnts/currency";
import AutoComplete from "@/components/base/AutoComplete";
import FormInput from "@/components/base/FormInput";
import LoadingButton from "@/components/base/LoadingButton";
import { currencyFormater } from "@/lib/utils";
import type { Currency } from "@/lib/types/currency.type";
const CurrencyConvertor = () => {
  const { rates }: any = useStore((state) => state);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [targetCurrency, setTargetCurrency] = useState<Currency | null>(null);
  const methods = useForm<CurrencyConvertorInput>({
    resolver: zodResolver(CurrencyConvertorSchema),
  });

  const { control, handleSubmit, setValue } = methods;

  const onSubmit: SubmitHandler<CurrencyConvertorInput> = (data) => {
    const targetCurrency = currencies.find((item) => item.code === data.target);
    if (targetCurrency) {
      setTargetCurrency(targetCurrency);
    }
    if (rates) {
      const baseRate = rates[data.base].value;
      const targetRate = rates[data.target].value;
      const amountInUSD = +data.amount / baseRate;
      const amountInTargetCurrency = amountInUSD * targetRate;
      setConvertedAmount(amountInTargetCurrency);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full shadow-xl shadow-shadow-500 bg-white rounded-xl p-4 flex flex-col gap-3">
            <h3 className="text-xl font-bold text-primary-400 mb-5">
              Currency Convertor
            </h3>
            <div className="grid grid-cols-1 place-items-end md:grid-cols-4 gap-4">
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <FormInput
                    label="Amount"
                    type="number"
                    {...field}
                    transform={{
                      input: (value: number) =>
                        isNaN(value) || value === 0 ? "" : value.toString(),
                      output: (e: any) => {
                        const output = parseInt(e.target.value, 10);
                        return isNaN(output) ? 0 : output;
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="base"
                control={control}
                render={({ field }) => (
                  <AutoComplete
                    label="Base"
                    items={currencies}
                    onUpdate={(selected): any => setValue("base", selected)}
                    {...field}
                  />
                )}
              />

              <Controller
                name="target"
                control={control}
                render={({ field }) => (
                  <AutoComplete
                    label="Target"
                    items={currencies}
                    onUpdate={(selected): any => setValue("target", selected)}
                    {...field}
                  />
                )}
              />

              <LoadingButton
                loading={false}
                textColor="text-white"
                disabled={!rates}
              >
                Convert
              </LoadingButton>
            </div>
          </div>
        </form>
      </FormProvider>
      {convertedAmount !== 0 && targetCurrency && (
        <p className="text-2xl font-bold text-gray-500 mt-10 mx-auto max-w-2xl flex justify-center">
          {currencyFormater(
            +convertedAmount,
            targetCurrency.locale,
            targetCurrency.code
          )}
        </p>
      )}
    </>
  );
};

export default CurrencyConvertor;
