"use client";
import Header from "@/components/Header";
import { AuthPageInvisible } from "@/lib/protect-page";
import useHttp from "@/lib/hooks/useHttp";
import ListOfPairs from "@/components/currnecy/ListOfPairs";
import CurrencyConvertor from "@/components/currnecy/CurrencyConvertor";
import { useEffect } from "react";
import useStore from "@/store";

export default function DashboardPage() {
  let currencyInterval: any;
  const { currency } = useHttp();
  const { setRates } = useStore<{ setRates: (args0: object) => void }>(
    (state): any => state
  );

  function updateCurrencyRates() {
    currency.getLatestCurrencyRates().then((res: any) => {
      setRates(res.data);
    });
  }
  function curerncyIntervalHandler() {
    updateCurrencyRates();
    currencyInterval =
      !currencyInterval &&
      setInterval(() => {
        updateCurrencyRates();
      }, 60 * 1000);
  }

  useEffect(() => {
    curerncyIntervalHandler();
    return () => clearInterval(currencyInterval);
  }, []);

  return (
    <>
      <Header />
      <div className="bg-sky min-h-full py-20 flex flex-col items-center justify-start">
        <ListOfPairs />
        <div className="container grid grid-cols-4 gap-4">
          <div className="col-span-4">
            <CurrencyConvertor />
          </div>
        </div>
      </div>
      <AuthPageInvisible />
    </>
  );
}
