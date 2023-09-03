import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { Currency } from "@/lib/types/currency.type";
type AutocompleteProps = {
  label: string;
  name: string;
  items: Currency[];
  onUpdate: (args0: string) => string;
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  label,
  name,
  items,
  onUpdate,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const [options, setOptions] = useState<Currency[]>([]);

  useEffect(() => {
    setOptions(items);
  }, [items]);

  const handleChange = (val: string) => {
    setOpen(false);
    setVal(val);
    onUpdate(val);
  };
  const filterItems = useCallback(
    (e: any) => {
      const val = e.target?.value;
      setVal(val);
      if (val && !val.length) {
        setOptions(items);
      } else {
        const filteredItems: Currency[] =
          items.filter((item) => item.code.includes(val.toUpperCase())) || [];
        setOptions(filteredItems);
      }
      if (val && val.length === 3) {
        setOpen(false);
      }
    },
    [items]
  );
  return (
    <div
      // use classnames here to easily toggle dropdown open
      className="w-full relative "
      ref={ref}
    >
      <label htmlFor={name} className="block text-sm text-gray-400 mb-2">
        {label}
      </label>
      <input
        id={name}
        type="text"
        className="h-12 rounded-xl bg-primary-50 w-full px-3 z-10 shadow-3xl shadow-shadow-500 border border-gray-100 focus:border-0 focus:outline-none focus:border-primary-100"
        value={val}
        {...register(name)}
        autoComplete="off"
        onFocus={() => setOpen(true)}
        onInput={(e) => filterItems(e)}
        placeholder="Type something..."
      />
      <div className="top-20 bg-gray-100 left-0 max-h-48 overflow-y-auto overflow-x-hidden scroll-smooth flex-col rounded-xl absolute z-20 shadow-3xl shadow-shadow-500">
        <ul
          className={`${open ? "h-auto" : "h-0"}`}
          style={{ width: ref.current?.clientWidth }}
        >
          {open &&
            options.map((item) => {
              return (
                <li
                  onClick={() => handleChange(item.code)}
                  key={item.code}
                  className="w-full h-9 z-30 p-2 cursor-pointer bg-gray-100 hover:bg-gray-200"
                >
                  <button className="flex items-center">
                    <Image
                      width={12}
                      height={12}
                      className="inline-block h-3 w-3 me-2 rounded-full z-40"
                      src={item.flag}
                      alt={item.code}
                    />
                    {item.code}
                  </button>
                </li>
              );
            })}
        </ul>
        {errors[name] && (
          <span className="text-red-500 text-xs pt-1 block">
            {errors[name]?.message as string}
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(Autocomplete);
