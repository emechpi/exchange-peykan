import { Currency } from "@/lib/types/currency.type";
import Image from "next/image";
import useStore from "@/store";
type Props = {
  currency: Currency;
};

const PairCard = ({ currency }: Props) => {
  const { rates }: any = useStore((state) => state);
  return (
    <>
      <div className="bg-white w-25 md:w-28 lg:w-36 p-2 rounded-2xl shadow-3xl shadow-shadow-500 select-none snap-center shrink-1	relative">
        <div className="flex justify-between items-center">
          <div className="flex -space-x-1 overflow-hidden w-12">
            <Image
              width={20}
              height={20}
              className="inline-block h-5 w-5 rounded-full ring-2 ring-sky"
              src="/currency-flags/USD.svg"
              alt="US"
            />
            <Image
              height={20}
              width={20}
              className="inline-block h-5 w-5 rounded-full ring-2 ring-sky"
              src={currency.flag}
              alt={currency.code}
            />
          </div>
          <span className="font-semibold text-xs text-gray-800 whitespace-nowrap ms-2">
            USD / {currency.code}
          </span>
        </div>
        <div className="flex flex-row-reverse mt-2 justify-start items-center">
          {rates && (
            <span className="font-semibold text-sm text-gray-800">
              {rates[currency.code]?.value.toFixed(currency.decimal_digits) ||
                0}
            </span>
          )}
          <span className="me-2 text-sm text-gray-400 font-light">
            {currency.symbol_native}
          </span>
        </div>
      </div>
    </>
  );
};

export default PairCard;
