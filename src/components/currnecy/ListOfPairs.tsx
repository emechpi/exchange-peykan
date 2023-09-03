import { currencies } from "@/lib/constatnts/currency";
import PairCard from "./PairCard";
currencies;
const ListOfPairs = () => {
  return (
    <div className="inline-flex flex-row-reverse h-36 items-center gap-2 p-5 lg:p-10 w-full 2xl:w-auto max-w-8xl mx-auto overflow-x-auto no-scrollbar snap-x snap-mandatory ">
      {currencies
        .filter((curr) => curr.code !== "USD")
        .map((item) => {
          return <PairCard currency={item} key={item.code} />;
        })}
    </div>
  );
};

export default ListOfPairs;
